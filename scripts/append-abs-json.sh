
# Make sure walrus is installed
if ! command -v walrus &> /dev/null; then
    echo "walrus could not be found"
    exit 1
fi
# Make sure jq is installed
if ! command -v jq &> /dev/null; then
    echo "jq could not be found"
    exit 1
fi

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <pdf> <pdf> ..."
    exit 1
fi

script_dir=$(dirname "$0")
OS=$(uname)

for pdf_file in "$@"; do
    # Get the size of the pdf
    if [ "$OS" = "Darwin" ]; then
        pdf_size=$(stat -f "%z" "$pdf_file")
    else
        pdf_size=$(stat --format "%s" "$pdf_file")
    fi

    # Get the blob id
    json_resp=$(walrus json "{\"command\":{\"blobStatus\":{\"file\":\"$pdf_file\"}}}")
    
    blob_id=$(echo "$json_resp" | jq -r '.blobId')
    
    # Use jq to parse the required fields and append pdf_size
    parsed_json=$(echo "$json_resp" | jq 'if .status.existent then {
        txDigest: .status.existent.statusEvent.txDigest,
        endEpoch: .status.existent.endEpoch,
        status: .status.existent.status,
    } else empty end')

    # Check if jq returned any result
    if [ -z "$parsed_json" ]; then
        echo "No valid data found to append for file ${pdf_file}."
        echo "Appending only pdfSize and blobId."
        id=$(basename "$pdf_file" .pdf)
        abs_json="${script_dir}/../data/abs/${id}.json"
        jq -c --arg blob_id "$blob_id" --arg pdf_size "$pdf_size" '. += {blobId: $blob_id, pdfSize: $pdf_size}' "${abs_json}" > "${abs_json}.tmp" && mv "${abs_json}.tmp" "${abs_json}"
        continue;
    fi

    tx_digest=$(echo "$parsed_json" | jq -r '.txDigest')
    end_epoch=$(echo "$parsed_json" | jq -r '.endEpoch')
    status=$(echo "$parsed_json" | jq -r '.status')

    id=$(basename "$pdf_file" .pdf)
    abs_json="${script_dir}/../data/abs/${id}.json"
    jq -c --arg blob_id "$blob_id" --arg pdf_size "$pdf_size" --arg tx_digest "$tx_digest" --arg end_epoch "$end_epoch" --arg status "$status" '. += {blobId: $blob_id, pdfSize: $pdf_size, txDigest: $tx_digest, endEpoch: $end_epoch, status: $status}' "${abs_json}" > "${abs_json}.tmp" && mv "${abs_json}.tmp" "${abs_json}"
done


