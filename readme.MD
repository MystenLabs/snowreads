# Walpapers

**Walpapers** is a decentralized repository of open-license scientific papers, maintained as a [Walrus site](https://docs.walrus.site/walrus-sites/intro.html). This project does not support a backend, meaning that the application only includes a frontend, utilizing pre-formatted and computed data from JSON files created through scripts located in the `metadata_fetcher`, `metadata_mashup`, and `publish` folders.

## Requirements

For details on setting up and using Walrus, including configuration and examples, visit [Walrus Setup Documentation](https://docs.walrus.site/usage/setup.html).

## Deployment Instructions

Follow these steps to deploy **Walpapers**:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MystenLabs/wal-papers.git
   ```

2. **Navigate to the `publish` folder**:

   ```bash
   cd wal-papers/publish
   ```

3. **Run the untar script** to extract the PDFs and check their licenses. This will copy all pdf files that have a license that permits redistribution to app/public/pdf/ directory.

   ```bash
   ./untar-check.sh {path_to_your_tar_with_arxiv_papers}
   ```

   This script extracts the PDF files and verifies that only appropriately licensed papers are uploaded.

4. **Trim metadata** to remove any app/public/abs/<arxiv_id>.json files not having a corresponding pdf.

   ```bash
   node trim-metadata.js
   ```

5. **Run calc-size and colection-size** to update categories and collection size:
   ```bash
   node calc-size.js
   ts-node collection-size.ts
   ```
    
6. **Build the application**:
   Navigate to the `app` folder and run the following command:

   ```bash
   cd ../app
   npm run build
   ```

7. **Run the site builder** to generate and upload the site:

   ```bash
   {path_to_site_builder}/site-builder --config {path_to_config_file} builder-example.yaml publish {path_to_dist_folder}/dist
   ```

   - `{path_to_site_builder}`: Path to your Walrus site builder.
   - `{path_to_config_file}`: Path to the configuration file (e.g., `builder-example.yaml`).
   - `{path_to_dist_folder}`: Path to the `dist` folder generated after the build.

8. **Wait for the upload**: The process will generate Blob IDs for each resource and store them on Walrus. Once complete, the Walrus site URL and the new site object ID will appear.

## Note

Ensure that you have reviewed the Walrus documentation for details on usage, setup, and configuration: [Walrus Setup Guide](https://docs.walrus.site/usage/setup.html).
