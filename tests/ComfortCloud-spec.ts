import { ComfortCloud } from "../src/ComfortCloud";
// import { expect } from "chai";
import { Device, DeviceParameters } from "../src/models/interfaces";
import { OperationMode } from "../src/models/enums";
import nock from 'nock';

describe("ComfortCloud Tests", () => {
    beforeAll(() => { });
    afterAll(() => { });
    beforeEach(() => { });

    it("should be able to test", () => {
        expect(true).toBeTruthy;
    });
    it("should be able to create instance", () => {
        const client = new ComfortCloud("test", "pwd");
        expect(client).toBeInstanceOf(ComfortCloud);
    });
    it("returned parameters should not include invalid properties", () => {
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            insideTemperature: 23,
            test: 12,
            outTemperature: 10,
        } as DeviceParameters;
        const parOut = client.getParameters(parIn);
        expect(parOut).not.toHaveProperty("insideTemperature");
        expect(parOut).not.toHaveProperty("test");
    });
    it("operation mode should not be returned", () => {
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            operationMode: OperationMode.Auto,
        } as DeviceParameters;
        const device = { autoMode: false, parameters: parIn } as Device;
        let parOut = client.getDeviceParameters(device);
        expect(parOut).not.toHaveProperty("operationMode");

        parIn.operationMode = OperationMode.Cool;
        device.coolMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).not.toHaveProperty("operationMode");

        parIn.operationMode = OperationMode.Dry;
        device.dryMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).not.toHaveProperty("operationMode");

        parIn.operationMode = OperationMode.Fan;
        device.fanMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).not.toHaveProperty("operationMode");

        parIn.operationMode = OperationMode.Heat;
        device.heatMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).not.toHaveProperty("operationMode");
    });
    it("operation mode should be returned correct", () => {
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            operationMode: OperationMode.Auto,
        } as DeviceParameters;
        const device = { autoMode: true, parameters: parIn } as Device;
        let parOut = client.getDeviceParameters(device);
        expect(parOut).toHaveProperty("operationMode");
        expect(parOut.operationMode).toEqual(OperationMode.Auto);

        parIn.operationMode = OperationMode.Cool;
        device.coolMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).toHaveProperty("operationMode");
        expect(parOut.operationMode).toEqual(OperationMode.Cool);

        parIn.operationMode = OperationMode.Dry;
        device.dryMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).toHaveProperty("operationMode");
        expect(parOut.operationMode).toEqual(OperationMode.Dry);

        parIn.operationMode = OperationMode.Fan;
        device.fanMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).toHaveProperty("operationMode");
        expect(parOut.operationMode).toEqual(OperationMode.Fan);

        parIn.operationMode = OperationMode.Heat;
        device.heatMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).toHaveProperty("operationMode");
        expect(parOut.operationMode).toEqual(OperationMode.Heat);
    });
    it('Should not crash when server returns an error', async () => {
        const scope = nock('https://accsmart.panasonic.com')
            .persist()
            .get('/device/group/')
            .reply(403, 'Forbidden');
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            operationMode: OperationMode.Auto,
        } as DeviceParameters;

        expect(async () => {
            const device = { autoMode: false, parameters: parIn } as Device;
            const groups = await client.getGroups();
        }).rejects.toMatchObject({ httpCode: 403, responseMessage: 'Forbidden', statusCode: 403, statusMessage: null });

    });
});
