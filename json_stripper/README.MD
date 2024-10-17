# JSON Papers Processor

A TypeScript application that reads a JSON file containing academic papers, filters them based on a specified cutoff date, and outputs a simplified version of the papers to a new JSON file.

## Features

- Reads a JSON file containing paper information.
- Filters out papers published before a specified cutoff date.
- Outputs a simplified version of the papers in a new JSON file.

## Requirements

- Node.js (version 18 or higher)
- npm (Node package manager)

## Installation

Install the necessary dependencies:

`npm install`

## Run the script

`npm run readjson -- <input-file.json> "<cutoff-date>"`

### Parameters

- `<input-file.json>:` The path to the input JSON file containing the papers.
- `<cutoff-date>:` The cutoff date in ISO format (e.g., `"2024-06-30"`).

### Example

`npm run readjson -- test.json "1990-06-30"`