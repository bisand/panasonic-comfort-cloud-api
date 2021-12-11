# panasonic-comfort-cloud-api

Client for Panasonic Comfort Cloud API to control air conditioners.

## Features

-   Get groups of devices.
-   Get information on specific device.
-   Control specific devices depending on its capabilities.

## Install

Using npm:

```bash
$ npm install panasonic-comfort-cloud-api
```

## Examples

### Login

```Typescript
import { ComfortCloud } from 'panasonic-comfort-cloud-api';

const client = new ComfortCloud('username', 'password');

const token = await client.login();
console.log(token);
```
