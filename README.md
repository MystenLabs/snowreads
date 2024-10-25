# Snowreads

**Snowreads** is a decentralized repository of open-license scientific papers, maintained as a [Walrus site](https://docs.walrus.site/walrus-sites/intro.html).
This project does not support a backend, meaning that the application only includes a frontend, utilizing pre-formatted and computed data from JSON files.

## Requirements

For details on setting up and using Walrus, including configuration and examples, visit [Walrus Setup Documentation](https://docs.walrus.site/usage/setup.html).

## Deployment Instructions

Follow these steps to deploy **Walpapers**:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/MystenLabs/wal-papers.git
    ```

2. **Navigate to the `app` directory**:
    ```bash
    cd wal-papers/app
    ```

3. **Run pnpm install**
    ```bash
    pnpm install
    ```

4. **Publish to walrus**
    ```bash
    site-builder --config $WALRUS_SITES_CONFIG publish ./dist/ --epochs $N_EPOCHS
    ```

## Functional Details

All the app's logic is contained in Walrus and Walrus-sites.

Each paper consists of two files stored in Walrus.
1. Its metadata.json which includes information about authors, published-date, abstract etc. Also stores the blob-id of the corresponding pdf file.
2. Its pdf. The actual paper.

Both these two files are stored in Walrus and the metadata.json blob-ids are also included in `index.json` which is a file under `app/public` directory.
This way the app can fetch metadata for every paper.

Metadata from arXiv are parsed to group papers into categories. This grouping is stored in `app/public/papers.json`.

There is also `app/public/collections.json`, which stores a manual grouping of some papers to display on the landing page.

## Directories

### app

The React application that builds into the Snowreads site.

### data

- abs

    Includes paper metadata in json. These files are also uploaded to walrus and fetched from Snowreads to facilitate paper navigation.

- arXiv_\<xxx\>_manifest.xml

    [Arxiv manifest files](https://info.arxiv.org/help/bulk_data_s3.html)

- oai-metadata.json

    A subset of the [Kaggle arXiv Dataset](https://www.kaggle.com/datasets/Cornell-University/arxiv/data)

### scripts

Various scripts that run during the process of moving papers and paper-metadata from arXiv Dataset and various APIs to Walrus.

These scripts were developed during different stages of publishing Snowreads and during different designs. Many of them might be out-dated.

- <span>append-abs-json.sh</span>: Appends blob-id and pdf-size to a metadata.json file
- calc-size.js: Calculates the size of paper categories and edits papers.json to include this information
- check-license.ts: Checks that the license of a paper is among some creative-commons one.
- collection-size.ts: Similar to calc-size.js but for collections.
- combine-datacite-arxiv.ts: Merges files created with [metadata-mashup](#metadata-mashup) into a single json.
- combine-oai.ts: Merges output of the above script with `oai-metadata.json`.
- parse-category.ts: "Renames" arXiv encoded category to a human readable name. eg. corr -> Computing Research Repository
- <span>pre-publish.</span>sh: Unpacks arXiv pdfs downloaded from [S3](https://info.arxiv.org/help/bulk_data_s3.html) and uploads papers with a creative-commons license. Outdated.
- remove-duplicate-papers.ts: Removes duplicate entries from `app/public/papers.json` in case of miss-handling.
- <span>store.sh</span>: Stores papers to Walrus
- trim-metadata.js: Removes metadata from papers not having a pdf in `PDF_DIR`.
- <span>untar-check.sh</span>: Unpacks papers downloaded from [arXiv S3 buckets](https://info.arxiv.org/help/bulk_data_s3.html) and keeps papers with a creative-commons license.

### add-paper

CLI app to add a new paper to a Snowreads collection. Edits app/public/papers.json, app/public/collections.json and creates the paper-metadata json file.

Does not include uploading the paper and its metadata to Walrus.

### abs-indexer

Calculates the blob-id of the paper metadata jsons and produces index.json linking paper arxiv-id to its metadata blob-id.

### metadata-mashup

Calls [arXiv metadata API](https://info.arxiv.org/help/api/index.html) and [DataCite API](https://support.datacite.org/docs/api) to collect paper metadata.

### healthcheck

Manual tests for checking paper and paper-metadata availability and correctness.

### prebuilt

Converts `app/public/index.json` to a walrus-site `ws-resources.json`: `prebuilt` property in order to facilitate fetching arxiv-metadata by url. 🚧 WIP 🚧
    
## Note

Ensure that you have reviewed the Walrus documentation for details on usage, setup, and configuration: [Walrus Setup Guide](https://docs.walrus.site/usage/setup.html).
