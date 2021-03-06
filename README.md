# DV-Batch-Node

Command-line Node.js scripts that can be used by prospect merchants to submit documents in batch.

## Getting Started

### Install Node.js

Downloading the package [here](https://nodejs.org) and install.

### Install Frameworks

After node is installed, use the terminal client such as Terminal (Mac) or PowerShell (Windows) to browse to this directory. Use npm to install the necessary framework.

```
$ npm install
```

## Configure the datacenter

The program defaults to US datacenter. Please change the URL to point to the designated datacenter.

```
HTTP request method: POST
REST URL (US): https://acquisition.netverify.com/api/netverify/v2/acquisitions
REST URL (EU): https://acquisition.lon.netverify.com/api/netverify/v2/acquisitions
REST URL (SGP): https://acquisition.core-sgp.jumio.com/api/netverify/v2/acquisitions
```

## Running the program

### Set API token/secret in environment variables

Netverify requires authentication through API token and secret. They can be stored in environment variables for easy access.

#### Bash
```
$ export API_TOKEN=********
$ export API_SECRET=********
```

#### PowerShell
```
$ $Env:API_TOKEN = "********"
$ $Env:API_SECRET = "********"
```

### Execution

Use below command and generate the links. The first argument denotes how many links to generate.

```
$ node dv_batch_upload.js <dir>
```
