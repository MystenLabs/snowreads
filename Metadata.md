
## Fetchin Metadata about arXiv papers

### 1. Get papers from s3 buckets

Arxiv has a publicly available s3 bucket we can fetch data as long as the requester pays for the data transfer.
```bash
aws s3 cp s3://arxiv/pdf/arXiv_pdf_2011_039.tar ./data/ --request-payer
```

### 2. Find paper doi using arxiv-id
The paper will be named something like _astro-ph0001003.pdf_, or _2011.08614.pdf_.
The corresponding arxiv-id will be `astro-ph/0001003`.

First try arxiv-api:
```
https://export.arxiv.org/api/query?id_list=<arxiv-id>
```
eg:
```
https://export.arxiv.org/api/query?id_list=2011.08688
```
There is a chance that a doi field is present there.

If not then try: DataCite. The below command search by identifier and identifierType == arXiv:
```
https://api.datacite.org/dois?query=identifiers.identifier:<arxiv-id>%20AND%20identifiers.identifierType:arXiv
```
eg:
```
https://api.datacite.org/dois?query=identifiers.identifier:2011.08688%20AND%20identifiers.identifierType:arXiv
```

### 3. Get the license of the paper using the arxiv oai api

```
http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:<arxiv-id>&metadataPrefix=arXiv
```
eg:
```
http://export.arxiv.org/oai2?verb=GetRecord&identifier=oai:arXiv.org:2011.08688&metadataPrefix=arXiv
```

