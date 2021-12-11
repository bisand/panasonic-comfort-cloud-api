import { exit } from 'process';
import { ComfortCloud } from '../src';
import * as dotenv from 'dotenv';

dotenv.config();

const runner = new Promise<any>(async (resolve, reject) => {
    const client = new ComfortCloud(process.env.USERNAME as string, process.env.PASSWORD as string);

    const token = await client.login();
    console.log(token);
    const groups = await client.groups().catch(console.error);
    console.log(groups);
    const deviceId = groups[0].deviceList[0].deviceGuid;
    const device = await client.device(deviceId).catch(console.error);
    console.log(device);

    resolve('OK');
});

runner.then(x => {
    console.log(x);
    exit();
});
