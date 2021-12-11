import { exit } from 'process';
import { ComfortCloud } from '../src';
import * as dotenv from 'dotenv';
import { DeviceParameters } from '../src/models/interfaces';

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
    const par: DeviceParameters = { temperatureSet: 21.5 };
    const parRes = await client.setParameters(deviceId, par);
    console.log(parRes);
    device.parameters.temperatureSet = 22;
    const parDev = await client.setDevice(device);
    console.log(parDev);

    resolve('OK');
});

runner.then(x => {
    console.log(x);
    exit();
}).catch(console.error);

