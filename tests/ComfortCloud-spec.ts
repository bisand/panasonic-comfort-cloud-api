import { ComfortCloud } from "../src/ComfortCloud";
import { expect } from "chai";
import { Device, DeviceParameters } from "../src/models/interfaces";
import { AirSwingLR, OperationMode } from "../src/models/enums";

describe("MyEnergi Tests", () => {
    it("should be able to test", () => {
        expect(true).to.be.true;
    });
    it("should be able to create instance", () => {
        const client = new ComfortCloud("test", "pwd");
        expect(client).to.be.instanceOf(ComfortCloud);
    });
    it("returned parameters should not include invalid properties", () => {
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            insideTemperature: 23,
            test: 12,
            outTemperature: 10,
        } as DeviceParameters;
        const parOut = client.getParameters(parIn);
        expect(parOut).to.not.have.property("insideTemperature");
        expect(parOut).to.not.have.property("test");
    });
    it("operation mode should not be returned", () => {
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            operationMode: OperationMode.Auto,
        } as DeviceParameters;
        const device = { autoMode: false, parameters: parIn } as Device;
        let parOut = client.getDeviceParameters(device);
        expect(parOut).to.not.have.property("operationMode");

        parIn.operationMode = OperationMode.Cool;
        device.coolMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.not.have.property("operationMode");

        parIn.operationMode = OperationMode.Dry;
        device.dryMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.not.have.property("operationMode");

        parIn.operationMode = OperationMode.Fan;
        device.fanMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.not.have.property("operationMode");

        parIn.operationMode = OperationMode.Heat;
        device.heatMode = false;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.not.have.property("operationMode");
    });
    it("operation mode should be returned correct", () => {
        const client = new ComfortCloud("test", "pwd");
        const parIn = {
            operationMode: OperationMode.Auto,
        } as DeviceParameters;
        const device = { autoMode: true, parameters: parIn } as Device;
        let parOut = client.getDeviceParameters(device);
        expect(parOut).to.have.property("operationMode");
        expect(parOut.operationMode).to.be.equal(OperationMode.Auto);

        parIn.operationMode = OperationMode.Cool;
        device.coolMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.have.property("operationMode");
        expect(parOut.operationMode).to.be.equal(OperationMode.Cool);

        parIn.operationMode = OperationMode.Dry;
        device.dryMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.have.property("operationMode");
        expect(parOut.operationMode).to.be.equal(OperationMode.Dry);

        parIn.operationMode = OperationMode.Fan;
        device.fanMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.have.property("operationMode");
        expect(parOut.operationMode).to.be.equal(OperationMode.Fan);

        parIn.operationMode = OperationMode.Heat;
        device.heatMode = true;
        parOut = client.getDeviceParameters(device);
        expect(parOut).to.have.property("operationMode");
        expect(parOut.operationMode).to.be.equal(OperationMode.Heat);
    });
});
