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

5. **Fetch the pdfs to upload**

    One can download the pdfs via aws from the requester payer arXiv buckets. Example command:
    ```bash
    aws s3 cp s3://arxiv/pdf/arXiv_pdf_2407_001.tar ./ --request-payer
    ```

    Run `untar-check.sh` to untar the downloaded files and after checking the redistrubitability the license allow,
    moves the filtered pdfs inside data/pdf directory
    ```bash
    ./untar-check.sh arXiv_pdf_2407_001.tar arXiv_pdf_2407_002.tar ...
    ```

    > Note that the collection papers include papers from non 2407 buckets.

6. **Upload the metadata and pdfs**

    Because the pdf and metadata files are too many, we upload them separately to walrus.
    The files inside app/public directory point to the constant blob-ids these data have.

    Edit `scripts/chunkify.ts`: `PDF_DIR` variable, to point to the place where the pdfs to upload is stored.
    (If you used `untar-check.sh`

    Then, from the `scripts` directory:
    ```bash
    ts-node chunkify > chunks.sh
    ```
    This will create the chunks.sh file which includes the commands to upload all the metadata and pdf files to Walrus.

    ```bash
    chmod +x ./chunks.sh
    ./chunks.sh
    ```

    This will upload all json and pdf files to walrus.

    Upload the notebookml recordings:
    ```bash
    walrus store data/mp3s/is_ai_fun.mp3 --epochs max
    ```

    Now all data necessary for the function of Snowreads, as well as Snowreads itself (step 4) is available on Walrus.

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

- mp3s

    NotebookML recordings for papers inside collections.

- oai-metadata.json

    A subset of the [Kaggle arXiv Dataset](https://www.kaggle.com/datasets/Cornell-University/arxiv/data)

### scripts

Various scripts that run during the process of moving papers and paper-metadata from arXiv Dataset and various APIs to Walrus.

These scripts were developed during different stages of publishing Snowreads and during different designs. Many of them might be out-dated.

- calc-size.js: Calculates the size of paper categories and edits papers.json to include this information
- check-license.ts: Checks that the license of a paper is among some creative-commons one.
- collection-size.ts: Similar to calc-size.js but for collections.
- parse-category.ts: "Renames" arXiv encoded category to a human readable name. eg. corr -> Computing Research Repository
- <span>untar-check.sh</span>: Unpacks papers downloaded from [arXiv S3 buckets](https://info.arxiv.org/help/bulk_data_s3.html) and keeps papers with a creative-commons license.

### healthcheck

Manual tests for checking paper and paper-metadata availability and correctness.

## Note

Ensure that you have reviewed the Walrus documentation for details on usage, setup, and configuration: [Walrus Setup Guide](https://docs.walrus.site/usage/setup.html).
