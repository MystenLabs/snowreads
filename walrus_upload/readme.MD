# PDF Upload to Walrus Script

This script uploads a specified range of PDF files to the Walrus service using its JSON API. It tracks the upload time for each file and logs important details such as the file size, blob ID, and object ID.

## Requirements

- **Python 3.6+**
- **Walrus Client**: Ensure that the `walrus` binary is installed and accessible in `/usr/local/bin/walrus` or adjust the path in the script.
- **Configuration File**: You need a valid configuration file for Walrus.

## Configuration

Before using the script, you need to configure Walrus by following these steps:

1. **Create Configuration Directory**:

   ```bash
   mkdir -p ~/.config/walrus
   ```

2. **Download the Client Configuration**:

   ```bash
   curl https://storage.googleapis.com/mysten-walrus-binaries/walrus-configs/client_config.yaml \
        -o ~/.config/walrus/client_config.yaml
   ```

3. **Set the Path to the Walrus Configuration**:
   The script uses the configuration file located at `~/.config/walrus/client_config.yaml` by default. Ensure the path is correct or modify the `PATH_TO_WALRUS_CONFIG` variable in the script if necessary.

## Usage

The script processes a specified range of PDF files and uploads them to the Walrus service.

### Running the Script

1. **Set the Start and End Index**:

   - Use the `start_index` and `end_index` parameters to specify the range of files you want to upload.
   - The reason you need to change these indexes between tests is that **Walrus creates blobs based on the content of the file**. If a PDF has already been uploaded previously, Walrus will not upload it again, and the timers for those files will not be accurate.
   - To ensure correct timing data for each test, **increment the start and end indexes for each run**. For example:
     - Since the first 20 files have previously been uploaded during testing, the next test should start from index `21`:
       ```python
       start_index = 21
       end_index = 30
       ```

2. **Execute the Script**:
   ```bash
   python upload_pdfs_to_walrus.py
   ```

### Example:

To upload another range of files (for the next tester):

```python
start_index = 21
end_index = 30
```

### Output Log

After each run, the script will create a log file containing the following details for each uploaded file:

- File path
- File size
- Blob ID
- Object ID
- Upload time

The log file will be saved in the current directory as `upload_log.txt` by default.
