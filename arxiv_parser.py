import os
import re
import requests
import xml.etree.ElementTree as ET

# Set path to folder
folder_path = os.path.expanduser('~/Downloads/0001') # Change this to the folder containing PDF files

# Function to extract paper id from file name (assumed pattern: hep-ex0001059)
def extract_paper_id(file_name):
    pattern = r'([a-z-]+)(\d+)'
    match = re.match(pattern, file_name)
    if match:
        return f"{match.group(1)}/{match.group(2)}"
    return None

# Function to query arXiv API and fetch metadata
def query_arxiv(paper_id):
    arxiv_url = f"https://export.arxiv.org/api/query?id_list={paper_id}"
    response = requests.get(arxiv_url)
    if response.status_code == 200:
        return response.content
    else:
        print(f"Error fetching data from arXiv for {paper_id}", arxiv_url)
        return None

# Function to query OAI-PMH API for metadata and print license if it exists
def query_oai_pmh(arxiv_id):
    oai_url = f"http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:{arxiv_id}&metadataPrefix=arXiv"
    response = requests.get(oai_url)
    
    if response.status_code == 200:
        # Parse the XML response
        root = ET.fromstring(response.content)
        
        # Define namespaces for parsing
        ns = {'oai': 'http://www.openarchives.org/OAI/2.0/', 'arxiv': 'http://arxiv.org/OAI/arXiv/'}
        
        # Find the license element in the XML
        license_tag = root.find('.//arxiv:license', ns)
        
        if license_tag is not None:
            license_url = license_tag.text
            print(f"License found for {arxiv_id}: {license_url}")
        else:
            print(f"No license found for {arxiv_id}")
        
        return response.content
    else:
        print(f"Error fetching data from OAI-PMH for {arxiv_id}")
        return None


# Function to parse XML and extract DOI if available
def extract_doi_from_arxiv(xml_data):
    root = ET.fromstring(xml_data)
    ns = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom'}
    doi = root.find('.//arxiv:doi', ns)
    return doi.text if doi is not None else None

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

# Function to process a paper
def process_paper(file_name):
    paper_id = extract_paper_id(os.path.splitext(file_name)[0])
    # paper_id = 2011.08688 example doi with active license
    
    if paper_id:
        print(f"Processing paper ID: {paper_id}")
        
        # Query OAI-PMH API
        oai_data = query_oai_pmh(paper_id)
        if oai_data:
            print(f"OAI-PMH metadata retrieved for {paper_id}")

        # Query arXiv API
        arxiv_data = query_arxiv(paper_id)
        if arxiv_data:
            doi = extract_doi_from_arxiv(arxiv_data)
            if doi:
                print(f"DOI found in arXiv: {doi}")
            else:
                # If DOI not found in arXiv, query DataCite
                doi = query_datacite(paper_id)
                if doi:
                    print(f"DOI fetched from DataCite: {doi}")
                else:
                    print("DOI not found in DataCite either.")

# Function to process multiple files
def process_files(file_count, folder_path):
    file_list = [f for f in os.listdir(folder_path) if f.endswith('.pdf')]
    if file_list:
        for i, file_name in enumerate(file_list[:file_count]):
            file_path = os.path.join(folder_path, file_name)
            file_size = os.path.getsize(file_path)
            print(f"\nProcessing file {i+1} of {file_count}: {file_name}")
            print(f"File size: {file_size / (1024 * 1024):.2f} MB")  # Size in MB
            process_paper(file_name)
    else:
        print("No PDF files found in the folder.")


# Ask user for number of files to process
num_files = int(input("Enter the number of files to process: "))
process_files(num_files,folder_path)
