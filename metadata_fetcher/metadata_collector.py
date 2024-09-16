# Script to fetch metadata for papers in the no-problem dataset and save it to Excel files for later use
import os
import re
import requests
import xml.etree.ElementTree as ET
import pandas as pd

# Set the base path to the folder and the output folder for Excel files and error logs
base_folder_path = os.path.expanduser('./../data/no-problem')
output_folder_path = './excel_metadata_results'

# Ensure the output folder exists
if not os.path.exists(output_folder_path):
    os.makedirs(output_folder_path)

# Function to extract paper ID from file name (same as before)
def extract_paper_id(file_name):
    [file_name, extension] = os.path.splitext(file_name)
    if extension != '.pdf' and extension != '.html':
        return None

    pattern0 = r'([a-z-]+)(\d+)'
    match = re.match(pattern0, file_name)
    if match:
        return f"{match.group(1)}/{match.group(2)}"

    pattern1 = r'\d+\.\d+'
    match = re.match(pattern1, file_name)
    if match:
        return file_name

    return None

# Function to query arXiv API and fetch metadata
def query_arxiv(paper_id):
    arxiv_url = f"https://export.arxiv.org/api/query?id_list={paper_id}"
    response = requests.get(arxiv_url)
    if response.status_code == 200:
        return response.content
    else:
        return None

# Function to query OAI-PMH API for license information
def query_oai_pmh(arxiv_id):
    oai_url = f"http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:{arxiv_id}&metadataPrefix=arXiv"
    response = requests.get(oai_url)
    license_url = None

    if response.status_code == 200:
        # Parse the XML response
        root = ET.fromstring(response.content)

        # Define namespaces for parsing
        ns = {'oai': 'http://www.openarchives.org/OAI/2.0/', 'arxiv': 'http://arxiv.org/OAI/arXiv/'}

        # Find the license element in the XML
        license_tag = root.find('.//arxiv:license', ns)

        if license_tag is not None:
            license_url = license_tag.text
            return license_url
        else:
            return "No License"
    else:
        return "Error fetching license data"

# Function to query DataCite API if DOI is missing
def query_datacite(paper_id):
    datacite_url = f"https://api.datacite.org/dois?query=identifiers.identifier:{paper_id}%20AND%20identifiers.identifierType:arXiv"
    response = requests.get(datacite_url)

    if response.status_code == 200:
        data = response.json()
        if data.get('data'):
            return data['data'][0]['attributes'].get('doi')
        else:
            print(f"No DOI found for {paper_id} in DataCite.")
    else:
        print(f"Error fetching data from DataCite for {paper_id}: {response.status_code}")

    return None

# Function to parse arXiv metadata, falling back to DataCite if necessary
def parse_arxiv_metadata_with_doi_fallback_and_license(xml_data, paper_id):
    root = ET.fromstring(xml_data)
    ns = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom'}

    entry = root.find('atom:entry', ns)
    if entry is None:
        return None

    metadata = {}

    # Extract DOI, and if missing, use DataCite
    doi = entry.findtext('arxiv:doi', default=None, namespaces=ns)
    if doi is None:
        doi = query_datacite(paper_id)

    metadata['doi'] = doi
    metadata['title'] = entry.findtext('atom:title', default=None, namespaces=ns)
    metadata['summary'] = entry.findtext('atom:summary', default=None, namespaces=ns)
    metadata['published'] = entry.findtext('atom:published', default=None, namespaces=ns)
    metadata['updated'] = entry.findtext('atom:updated', default=None, namespaces=ns)
    metadata['journal_ref'] = entry.findtext('arxiv:journal_ref', default=None, namespaces=ns)

    # Extract authors
    authors = entry.findall('atom:author', ns)
    metadata['authors'] = ', '.join([author.findtext('atom:name', default=None, namespaces=ns) for author in authors])

    # Extract categories
    primary_category = entry.find('arxiv:primary_category', ns)
    metadata['primary_category'] = primary_category.attrib['term'] if primary_category is not None else None

    categories = entry.findall('atom:category', ns)
    metadata['categories'] = ', '.join([cat.attrib['term'] for cat in categories])

    # Extract links
    pdf_link = entry.find("atom:link[@rel='related'][@type='application/pdf']", ns)
    metadata['pdf_link'] = pdf_link.attrib['href'] if pdf_link is not None else None

    paper_link = entry.find("atom:link[@rel='alternate']", ns)
    metadata['paper_link'] = paper_link.attrib['href'] if paper_link is not None else None

    # Query for license
    license_info = query_oai_pmh(paper_id)
    metadata['license'] = license_info

    return metadata

# Function to process all files in a folder
def process_all_files_in_folder(folder_path, folder_name):
    file_list = [f for f in os.listdir(folder_path) if f.endswith('.pdf') or f.endswith('.html')]
    metadata_list = []

    for file_name in file_list:
        paper_id = extract_paper_id(file_name)

        if paper_id:
            try:
                print(f"Processing paper ID: {paper_id}")
                arxiv_data = query_arxiv(paper_id)

                if arxiv_data:
                    metadata = parse_arxiv_metadata_with_doi_fallback_and_license(arxiv_data, paper_id)

                    if metadata:
                        metadata_list.append(metadata)

            except Exception as e:
                # Log errors to a text file specific to this folder
                error_file = os.path.join(output_folder_path, f"{folder_name}_errors.txt")
                with open(error_file, 'a') as error_log:
                    error_log.write(f"Error processing {file_name}: {str(e)}\n")

    return metadata_list

# Function to save metadata to Excel
def save_metadata_to_excel(metadata_list, folder_name):
    output_file = os.path.join(output_folder_path, f"{folder_name}_metadata.xlsx")
    df = pd.DataFrame(metadata_list)
    df.to_excel(output_file, index=False)
    print(f"Metadata saved to {output_file}")

# Main function to process all folders and files
def process_all_folders(base_folder_path):
    for folder_name in os.listdir(base_folder_path):
        folder_path = os.path.join(base_folder_path, folder_name)

        # Ensure it's a directory
        if os.path.isdir(folder_path):
            print(f"\nProcessing folder: {folder_name}")

            try:
                # Process all files in the folder
                metadata_list = process_all_files_in_folder(folder_path, folder_name)

                # Save the metadata to an Excel file
                if metadata_list:
                    save_metadata_to_excel(metadata_list, folder_name)

            except Exception as e:
                # If a critical error occurs during folder processing, log it
                error_file = os.path.join(output_folder_path, f"{folder_name}_critical_errors.txt")
                with open(error_file, 'a') as error_log:
                    error_log.write(f"Critical error processing folder {folder_name}: {str(e)}\n")

# Execute the script to process all folders and files
process_all_folders(base_folder_path)
