# panasonic-comfort-cloud-api

[![DeepScan grade](https://deepscan.io/api/teams/16513/projects/19836/branches/520486/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16513&pid=19836&bid=520486)
![GitHub last commit](https://img.shields.io/github/last-commit/bisand/panasonic-comfort-cloud-api)
![Travis (.com)](https://img.shields.io/travis/com/bisand/panasonic-comfort-cloud-api)
![npm](https://img.shields.io/npm/v/panasonic-comfort-cloud-api)
![npm](https://img.shields.io/npm/dw/panasonic-comfort-cloud-api)
![NPM](https://img.shields.io/npm/l/panasonic-comfort-cloud-api)

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

### Get Groups

```Typescript
const groups = await client.getGroups();
console.log(groups);
const deviceId = groups[0].deviceList[0].deviceGuid;
```

### Get Device

```Typescript
const device = await client.getDevice(deviceId);
console.log(device);
```

### Set Device parameters

```Typescript
// Set single parameters based on device ID without knowing the device parameters.
const par: DeviceParameters = { temperatureSet: 21.5 };
const parRes = await client.setParameters(deviceId, par);
console.log(parRes);

// Set parameters from device. First get device, then manipulate the values.
device.parameters.temperatureSet = 22;
device.parameters.ecoMode = EcoMode.Quiet;
const parDev = await client.setDevice(device);
console.log(parDev);
```

### Setting parameters

```Typescript
// Use enums for correct values.
const par: DeviceParameters = {
    operate: Power.On,
    operationMode: OperationMode.Auto,
    ecoMode: EcoMode.Auto,
    temperatureSet: 22,
    airSwingUD: AirSwingUD.Mid,
    airSwingLR: AirSwingLR.Mid,
    fanAutoMode: FanAutoMode.AirSwingAuto,
    fanSpeed: FanSpeed.Auto
};
const parRes = await client.setParameters(deviceId, par);
```

### Full code example

```Typescript
import { ComfortCloud, DeviceParameters, AirSwingLR, AirSwingUD, EcoMode, FanAutoMode, FanSpeed, OperationMode, Power } from 'panasonic-comfort-cloud-api';
import { exit } from 'process';
import * as dotenv from 'dotenv';

dotenv.config();

const runner = new Promise<any>(async (resolve, reject) => {
    const client = new ComfortCloud(process.env.USERNAME as string, process.env.PASSWORD as string);

    const token = await client.login();
    console.log(token);

    const groups = await client.getGroups();
    console.log(groups);

    const deviceId = groups[0].deviceList[0].deviceGuid;
    const device = await client.getDevice(deviceId);
    console.log(device);

    const deviceNow = await client.getDeviceNow(deviceId);
    console.log(deviceNow);

    const par: DeviceParameters = {
        operate: Power.On,
        operationMode: OperationMode.Auto,
        ecoMode: EcoMode.Auto,
        temperatureSet: 22,
        airSwingUD: AirSwingUD.Mid,
        airSwingLR: AirSwingLR.Mid,
        fanAutoMode: FanAutoMode.AirSwingAuto,
        fanSpeed: FanSpeed.Auto
    };
    const parRes = await client.setParameters(deviceId, par);
    console.log(parRes);

    device.parameters.temperatureSet = 22;
    device.parameters.ecoMode = EcoMode.Quiet;
    const parDev = await client.setDevice(device);
    console.log(parDev);

    resolve('OK');
});

runner.then(x => {
    console.log(x);
    exit();
}).catch(x => {
    console.error(x);
    exit();
});

```
