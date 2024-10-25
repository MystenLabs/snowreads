#!/bin/bash

script_dir=$(dirname "$0")
# Change this according to where you placed the tar files
FOLDER_2407_PATH="${script_dir}/../data/2407"
FOLDER_2408_PATH="${script_dir}/../data/2408"

# Ensure tar, jq, sui, and walrus are installed
if ! command -v tar &> /dev/null; then
    echo "tar could not be found"
    exit 1
fi
if ! command -v jq &> /dev/null; then
    echo "jq could not be found"
    exit 1
fi
if ! command -v sui &> /dev/null; then
    echo "sui could not be found"
    exit 1
fi
if ! command -v walrus &> /dev/null; then
    echo "walrus could not be found"
    exit 1
fi

# Function doing all the work:
# Main logic:
# 1. untar
# 2. Check license
# 3. Check pdf size
# 4. Upload or delete (depending on 2)
# 5. Parse blob id from the response
# 6. Append to detailed jsons the info at 5 and 3 (../data/abs/<arxiv_id>.json)
process_tar_files() {
    # Function arguments
    local upper_bound=$1
    local folder_path=$2
    local yymm=$3

    for i in $(seq -f "%03g" 1 "$upper_bound"); do

        local formatted_num=$(printf "%03d" $i)
        local tar_file_name="arxiv_pdf_${yymm}_${formatted_num}.tar"
        echo "Processing ${tar_file_name}"
        # Untar
        tar -xf "${folder_path}/${tar_file_name}" -C "${folder_path}"
        mv "${folder_path}/${yymm}" "${folder_path}/${yymm}_${formatted_num}"
        # For every file in the folder check license
        for pdf in "${folder_path}/${yymm}_${formatted_num}"/*.pdf; do
            local arxiv_id=$(basename "${pdf}" .pdf)
            echo "Checking license for ${arxiv_id}"
            local allowed=$(ts-node "${script_dir}/check-license.ts" "${arxiv_id}")
            echo "${pdf}: ${allowed}"
            if [ "$allowed" != "Allowed" ]; then
                echo "Paper ${arxiv_id} is not allowed to be uploaded."
                echo "Licence Check Output: ${allowed}"
                echo "Deleting ${pdf}"
                rm "${pdf}"
                echo "Deleting metadata"
                rm "${script_dir}/../data/abs/${arxiv_id}.json"
                continue
            fi

            local pdf_size=$(stat -f "%z" ${pdf})

            # Moving pdf to public folder
            mv "${pdf}" "${script_dir}/../data/pdf/${arxiv_id}.pdf"
            local store_resp=$(walrus json "{\"command\":{\"store\":{\"file\":\"${script_dir}/../data/pdf/${arxiv_id}.pdf\"}}}")

            local blob_id=$(echo "$store_resp" | jq -r '.newlyCreated.blobObject.blobId // .alreadyCertified.blobId')
            if [[ -z "$blob_id" ]]; then
                echo "Failed to upload ${pdf}"
                exit 1
            fi

            # Append size and blob_id to abs jsons
            local detailed_json="${script_dir}/../data/abs/${arxiv_id}.json"
            jq -c --arg blob_id "$blob_id" --arg pdf_size "$pdf_size" '. += {blobId: $blob_id, pdfSize: $pdf_size}' "${detailed_json}" > "${detailed_json}.tmp" && mv "${detailed_json}.tmp" "${detailed_json}"
        done
        # Delete the tar file and the folder:
        rmdir "${folder_path}/${yymm}_${formatted_num}" # Directory should be empty by now.
        # Also remove the tar file to not go out of space
        rm "${folder_path}/${tar_file_name}"
    done
}

# Loop through the expected range of files for 2407 folder (001 to 152)
for i in {001..152}; do
    # Format the number with leading zeros (e.g., 001, 002, ..., 152)
    formatted_num=$(printf "%03d" $i)
    # Construct the expected file name
    file_name="arxiv_pdf_2407_${formatted_num}.tar"
    # Check if the file exists in the folder
    if [[ ! -f "${FOLDER_2407_PATH}/${file_name}" ]]; then
        echo "File missing: ${file_name}"
        exit 1
    fi
done

# Loop through the expected range of files for 2408 folder (001 to 120)
for i in {001..120}; do
    # Format the number with leading zeros (e.g., 001, 002, ..., 120)
    formatted_num=$(printf "%03d" $i)
    # Construct the expected file name
    file_name="arxiv_pdf_2408_${formatted_num}.tar"
    # Check if the file exists in the folder
    if [[ ! -f "${FOLDER_2408_PATH}/${file_name}" ]]; then
        echo "File missing: ${file_name}"
        exit 1
    fi
done

echo "Check tars exist complete."

echo "Switching sui client to testnet."
echo "Make sure you have enough testnet SUI."
sui client switch --env testnet

# If ../data/pdf folder does not exist create it.
if [ ! -d "${script_dir}/../data/pdf" ]; then
    mkdir "${script_dir}/../data/pdf"
fi

process_tar_files 152 "${FOLDER_2407_PATH}" "2407"
process_tar_files 120 "${FOLDER_2408_PATH}" "2408"
