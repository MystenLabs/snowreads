#!/bin/bash

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm could not be found"
    exit 1
fi
# Check if ts-node is installed
if ! command -v ts-node &> /dev/null; then
    echo "ts-node could not be found"
    exit 1
fi
# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq could not be found"
    exit 1
fi
# Check if walrus is installed
if ! command -v walrus &> /dev/null; then
    echo "walrus could not be found"
    exit 1
fi

# Make sure the script is run with exactly arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <start_id> <end_id>"
    exit 1
fi

N_EPOCHS=$N_EPOCHS
if [ -z "$N_EPOCHS" ]; then
    N_EPOCHS=200
fi

script_dir=$(dirname "$0")
APP_PUBLIC_PDF_FOLDER="${script_dir}/../app/public/pdf"
APP_PUBLIC_ABS_FOLDER="${script_dir}/../app/public/abs"

# List all the pdf files and order them alphabetically
pdf_files=$(ls -1 "$APP_PUBLIC_PDF_FOLDER" | sort)

# Find start_id and end_id
start_id=$1
end_id=$2

# Find the index of the start_id and end_id
start_index=$(echo "$pdf_files" | grep -n "$start_id".pdf | cut -d: -f1)
if [ -z "$start_index" ]; then
    echo "Start id not found"
    exit 1
fi
end_index=$(echo "$pdf_files" | grep -n "$end_id".pdf | cut -d: -f1)
if [ -z "$end_index" ]; then
    echo "End id not found"
    exit 
fi
length=$(( $end_index - $start_index + 1 ))

pdf_files=$(echo "$pdf_files" | tail -n +"$start_index" | head -n "$length")

# Store all pdf files
for pdf_file in $pdf_files; do

    walrus_resp=$(walrus json "{\"command\":{\"store\":{\"file\":\"$APP_PUBLIC_PDF_FOLDER/$pdf_file\",\"epochs\":$N_EPOCHS}}}")
    if [ -z "$walrus_resp" ]; then
        echo "Failed to store $pdf_file"
        exit 1
    fi

    blob_id=$(echo "$walrus_resp" | jq -r '.newlyCreated.blobObject.blobId')
    if [ -z "$blob_id" ]; then
        echo "Failed to parse resp for $pdf_file"
        echo $walrus_resp
        exit 1
    fi

    abs_file=$(echo "$pdf_file" | sed 's/pdf/json/')
    abs_file="$APP_PUBLIC_ABS_FOLDER/$abs_file"
    abs_blob_id=$(cat "$abs_file" | jq -r '.blobId')
    if [ -z "$abs_blob_id" ]; then
        echo "Failed to parse abs file for $pdf_file"
        exit 1
    fi
    # If abs blob_id is different from the current blob_id, then something is terribly wrong
    if [ "$abs_blob_id" != "$blob_id" ]; then
        echo "Blob id mismatch for $pdf_file"
        exit 1
    fi
    
    object_id=$(echo "$walrus_resp" | jq -r '.newlyCreated.blobObject.id')
    registered_epoch=$(echo "$walrus_resp" | jq -r '.newlyCreated.blobObject.registeredEpoch')
    certified_epoch=$(echo "$walrus_resp" | jq -r '.newlyCreated.blobObject.certifiedEpoch')
    start_epoch=$(echo "$walrus_resp" | jq -r '.newlyCreated.blobObject.storage.startEpoch')
    end_epoch=$(echo "$walrus_resp" | jq -r '.newlyCreated.blobObject.storage.endEpoch')
    if [ -z "$object_id" ] || [ -z "$registered_epoch" ] || [ -z "$certified_epoch" ] || [ -z "$start_epoch" ] || [ -z "$end_epoch" ]; then
        echo "Failed to parse resp for $pdf_file"
        exit 1
    fi

    # Append abs file with the new information
    jq -c --arg object_id "$object_id" --arg registered_epoch "$registered_epoch" --arg certified_epoch "$certified_epoch" --arg start_epoch "$start_epoch" --arg end_epoch "$end_epoch" '. += {objectId: $object_id, registeredEpoch: $registered_epoch, certifiedEpoch: $certified_epoch, startEpoch: $start_epoch, endEpoch: $end_epoch}' "$abs_file" > "$abs_file.tmp" && mv "$abs_file.tmp" "$abs_file"
done

echo "Store complete."




