#!/bin/bash

# Check if input file is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <input_json_file> [output_json_file]"
    echo "Example: $0 input.json output.json"
    exit 1
fi

input_file="$1"
output_file="${2:-first_100_entries.json}"

# Check if input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: Input file '$input_file' does not exist."
    exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed. Please install jq first."
    echo "On Ubuntu/Debian: sudo apt-get install jq"
    echo "On macOS: brew install jq"
    exit 1
fi

echo "Extracting first 100 entries from '$input_file' to '$output_file'..."

# Extract first 100 entries using jq
jq 'to_entries | .[0:100] | from_entries' "$input_file" > "$output_file"

# Check if the operation was successful
if [ $? -eq 0 ]; then
    echo "Successfully extracted first 100 entries to '$output_file'"
    
    # Show count of entries in original and new file
    original_count=$(jq 'keys | length' "$input_file")
    new_count=$(jq 'keys | length' "$output_file")
    echo "Original file had $original_count entries, new file has $new_count entries"
else
    echo "Error: Failed to extract entries. Please check if the input file is valid JSON."
    exit 1
fi