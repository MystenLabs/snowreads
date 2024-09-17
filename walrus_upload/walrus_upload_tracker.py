import os
import subprocess
import json
import time
import tempfile

# Setting paths and configurations
PATH_TO_PDFS = "pdfs/0001"
FULL_NODE_URL = "https://fullnode.testnet.sui.io:443"
PATH_TO_WALRUS = "/usr/local/bin/walrus"
PATH_TO_WALRUS_CONFIG = os.path.expanduser("~/.config/walrus/client_config.yaml")

def upload_pdf_to_walrus(pdf_file_path):
    try:
        # Start timing the upload
        start_time = time.time()

        # Get file size
        pdf_size = os.path.getsize(pdf_file_path)

        # MacOS Operating System
        # Part 1. Upload the file to the Walrus service 
        store_json_command = f"""{{ "config" : "{PATH_TO_WALRUS_CONFIG}",
            "command" : {{ "store" :
            {{ "file" : "{pdf_file_path}", "epochs" : 2  }}}}
        }}"""
        result = subprocess.run(
            [PATH_TO_WALRUS, "json"],
            text=True,
            capture_output=True,
            input=store_json_command,
        )
        # # Windows Operating System
        # store_json_command = {
        #     "config": PATH_TO_WALRUS_CONFIG,
        #     "command": {
        #         "store": {
        #             "file": pdf_file_path,
        #             "epochs": 2
        #         }
        #     }
        # }

        # json_payload = json.dumps(store_json_command)

        # print(json_payload);

        # result = subprocess.run(
        #     [PATH_TO_WALRUS, "json"],
        #     text=True,
        #     capture_output=True,
        #     input=json_payload,
        # )

        assert result.returncode == 0

        # Parse the response and extract information
        json_result_dict = json.loads(result.stdout.strip())
        if "newlyCreated" in json_result_dict:
            blob_id = json_result_dict["newlyCreated"]["blobObject"]["blobId"]
            sui_object_id = json_result_dict["newlyCreated"]["blobObject"]["id"]
        elif "alreadyCertified" in json_result_dict:
            blob_id = json_result_dict["alreadyCertified"]["blobObject"]["blobId"]
            sui_object_id = json_result_dict["alreadyCertified"]["blobObject"]["id"]
        else:
            raise ValueError("Unexpected response from Walrus")

        # End timing the upload
        end_time = time.time()
        execution_time = end_time - start_time

        # Create log entry
        log_entry = (
            f"PDF: {pdf_file_path}\n"
            f"Size: {pdf_size} bytes\n"
            f"Upload Blob ID: {blob_id}\n"
            f"Sui Object ID: {sui_object_id}\n"
            f"Time taken for upload: {execution_time:.2f} seconds\n"
        )

        print(log_entry)
        return log_entry

    except Exception as e:
        print(f"Error uploading {pdf_file_path}: {str(e)}")
        return f"Error uploading {pdf_file_path}: {str(e)}\n"

def process_pdfs(start_index=0, end_index=10, output_file="upload_log.txt"):
    # Get all the PDF files in the folder
    pdf_files = [f for f in os.listdir(PATH_TO_PDFS) if f.endswith('.pdf')]

    # Ensure valid range
    if start_index < 0 or end_index > len(pdf_files) or start_index >= end_index:
        print("Invalid range of files to upload")
        return

    logs = []
    # Process PDFs within the specified range
    for i, pdf_file in enumerate(pdf_files[start_index:end_index]):
        pdf_path = os.path.join(PATH_TO_PDFS, pdf_file)
        log_entry = upload_pdf_to_walrus(pdf_path)
        logs.append(log_entry)

    # Export the logs to a file
    with open(output_file, "w") as log_file:
        log_file.writelines(logs)

    print(f"Upload logs exported to {output_file}")

if __name__ == "__main__":
    # Specify the range of files to upload
    start_index = 41  # Starting from the 12th file (indexing starts at 0)
    end_index = 42    # Ending at the 20th file
    process_pdfs(start_index=start_index, end_index=end_index)
