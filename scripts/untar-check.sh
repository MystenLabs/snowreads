#!/bin/bash

# Check if tar is installed
if ! command -v tar &> /dev/null; then
    echo "tar could not be found"
    exit 1
fi
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

# Make sure the script is run with more than 1 argument
if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <tar_file> <tar_file> ..."
    exit 1
fi


script_dir=$(dirname "$0")
# Constants
TMP_FOLDER="${script_dir}/tmp"
PDF_FOLDER="${script_dir}/../data/pdf"

# Ensure the extract folder exists
mkdir -p "$TMP_FOLDER"
mkdir -p "$PDF_FOLDER"

# Run pnpm install in the script directory
echo "Running pnpm install in ${script_dir}"
(cd "$script_dir" && pnpm install)

# Process all tar files provided as arguments
for tar_file in "$@"; do
    if [ -f "$tar_file" ]; then
        tar -xf "$tar_file" -C "$TMP_FOLDER"
        # Check the folder "untared"
        folder_name=$(ls -1 "$TMP_FOLDER" | head -n 1)
        # For every .pdf inside that folder check the license
        for pdf in "$TMP_FOLDER/$folder_name"/*.pdf; do
            arxiv_id=$(basename "$pdf" .pdf)
            echo "Checking license for $arxiv_id"
            allowed=$(ts-node "$script_dir/check-license.ts" "$arxiv_id")
            if [ "$allowed" != "Allowed" ]; then
                echo "Paper $arxiv_id is not allowed to be uploaded."
                echo "Deleting $pdf"
                rm "$pdf"
                continue
            fi
            # Move the pdf to the public folder
            mv "$pdf" "$PDF_FOLDER/$arxiv_id.pdf"
        done
    else
        echo "Warning: $tar_file is not a valid file. Skipping."
    fi
    # Remove the extracted folder
    rmdir "$TMP_FOLDER/$folder_name"
done

echo "Extraction complete. All allowed pdfs have been extracted to $PDF_FOLDER"
