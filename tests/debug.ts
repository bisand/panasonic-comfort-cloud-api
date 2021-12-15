import { exit } from "process";
import { ComfortCloud } from "../src";
import * as dotenv from "dotenv";
import { DeviceParameters } from "../src/models/interfaces";
import { EcoMode, AirSwingLR, AirSwingUD, FanAutoMode, FanSpeed, NanoeMode, OperationMode, Power, dataMode } from "../src/models/enums";

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
        fanSpeed: FanSpeed.Auto,
    };
    const parRes = await client.setParameters(deviceId, par);
    console.log(parRes);

    device.parameters.temperatureSet = 22;
    device.parameters.ecoMode = EcoMode.Quiet;
    const parDev = await client.setDevice(device);
    console.log(parDev);

    resolve("OK");
});

runner
    .then((x) => {
        console.log(x);
        exit();
    })
    .catch((x) => {
        console.error(x);
        exit();
    });
