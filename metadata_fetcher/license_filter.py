# Script to collect unique licenses from a set of license files
import os

def collect_unique_licenses(input_folder, output_file):
    unique_licenses = set()  # Using a set to store only unique licenses

    # Get a list of all .txt files in the input folder
    input_files = [f for f in os.listdir(input_folder) if f.endswith('.txt')]

    for file in input_files:
        file_path = os.path.join(input_folder, file)
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                licenses = f.readlines()
                # Add each license entry to the set
                for license in licenses:
                    unique_licenses.add(license.strip())  # Strip to remove extra spaces or newlines
        else:
            print(f"File {file} not found.")

    # Write the unique licenses to the final output file
    with open(output_file, 'w') as f_out:
        for license in sorted(unique_licenses):  # Optional: sort entries if needed
            f_out.write(license + '\n')

    print(f"Unique licenses have been written to {output_file}")


# Example usage
input_folder = 'licenses'  # Folder where all the license files are stored
output_file = 'final_licenses_list.txt'

collect_unique_licenses(input_folder, output_file)
