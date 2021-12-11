import * as https from 'https';
import { RequestOptions } from 'https';
import * as url from 'url';
import { HttpMethod } from './HttpMethod';
import { OperationMode } from './models/enums';
import { Device, DeviceParameters, Group, GroupResponse } from './models/interfaces';
import { LoginRequest } from './models/LoginRequest';
import { LoginResponse } from './models/LoginResponse';
import { UpdateResponse } from './models/UpdateResponse';

export class ComfortCloud {
    private _config = {
        username: '',
        password: '',
        base_url: 'https://accsmart.panasonic.com',
        login_url: '/auth/login',
        group_url: '/device/group',
        device_url: '/deviceStatus/{guid}',
        device_now_url: '/deviceStatus/now/{guid}',
        device_control_url: '/deviceStatus/control',
        device_history_url: '/deviceHistoryData',
    };
    private _accessToken: string = '';
    private _clientId: string = '';

    constructor(username: string, password: string) {
        this._config.username = username;
        this._config.password = password;
    }

    /**
     * Login to Panasonic Comfort Cloud
     * @param username Login username
     * @param password Login password
     * @returns LoginResponse containing access token.
     */
    public async login(username: string = this._config.username, password: string = this._config.password): Promise<LoginResponse | undefined> {
        const data = new LoginRequest(username, password);
        const uri = url.parse(`${this._config.base_url}${this._config.login_url}`, true);
        const options: RequestOptions = this.getRequestOptions(HttpMethod.Post, uri);
        const result = await this.request(options, JSON.stringify(data));
        if (result.result === 0) {
            this._accessToken = result.uToken;
            this._clientId = result.clientId;
            return result as LoginResponse;
        }
        return undefined;
    }

    /**
     * Get groups.
     * @returns A list of groups containing list of devices.
     */
    public async getGroups(): Promise<Group[]> {
        const uri = url.parse(`${this._config.base_url}${this._config.group_url}`, true);
        const options: RequestOptions = this.getRequestOptions(HttpMethod.Get, uri);
        const result = await this.request(options);
        if (result.iaqStatus.statusCode === 200) {
            const data = result as GroupResponse;
            return data.groupList;
        }
        return [] as Group[];
    }

    /**
     * Returns device with the provided Device ID
     * @param deviceId Device ID to use. Aka deviceGuid
     * @returns Device based on deviceId
     */
    public async getDevice(deviceId: string): Promise<Device> {
        const uri = url.parse(`${this._config.base_url}${this._config.device_url.replace('{guid}', deviceId)}`, true);
        const options: RequestOptions = this.getRequestOptions(HttpMethod.Get, uri);
        const result = await this.request(options);
        result.deviceGuid = deviceId;
        return result as Device;
    }

    /**
     * Set parameters on device. Parameters can contain one or more properties.
     * @param deviceId Device ID to use. Aka deviceGuid
     * @param parameters Parameters to set
     * @returns
     */
    public async setParameters(deviceId: string, parameters: DeviceParameters): Promise<UpdateResponse> {
        try {
            const uri = url.parse(`${this._config.base_url}${this._config.device_control_url}`, true);
            const options: RequestOptions = this.getRequestOptions(HttpMethod.Post, uri);
            const requestBody = { deviceGuid: deviceId, parameters: this.getParameters(parameters) };
            const result = await this.request(options, JSON.stringify(requestBody));
            const response: UpdateResponse = { status: -1, statusText: 'Unknown response' };
            if (result) {
                response.status = result.result;
                response.statusText = 'OK';
                return response;
            }
            return response;

        } catch (error: any) {
            const res: UpdateResponse = { status: -1 };
            res.error = error;
            res.statusText = 'Invalid parameter. Please check the input and use the Device\'s boolean values to check valid capabilities.';
            if (error && error.code && error.message) {
                res.status = error.code;
            }
            return res;
        }
    }

    /**
     * Set parameters from device. Manipulate device parameters before calling.
     * @param device Device ID to be used
     * @returns true if recuest succeeds
     */
    public async setDevice(device: Device): Promise<UpdateResponse> {
        try {
            const parameters: DeviceParameters = this.getDeviceParameters(device);
            const res = await this.setParameters(device.deviceGuid, parameters);
            return res;
        } catch (error: any) {
            const res: UpdateResponse = { status: -1 };
            if (error && error.code && error.message) {
                res.error = error;
                res.status = error.code;
            }
            return res;
        }
    }

    private getDeviceParameters(device: Device): DeviceParameters {
        const parameters: DeviceParameters = {};
        if (device.parameters.operate)
            parameters.operate = device.parameters.operate;
        if (device.parameters.temperatureSet)
            parameters.temperatureSet = device.parameters.temperatureSet;
        if (device.parameters.fanAutoMode)
            parameters.fanAutoMode = device.parameters.fanAutoMode;
        if (device.parameters.airDirection)
            parameters.airDirection = device.parameters.airDirection;
        if (device.parameters.airSwingLR)
            parameters.airSwingLR = device.parameters.airSwingLR;
        if (device.parameters.airSwingUD)
            parameters.airSwingUD = device.parameters.airSwingUD;
        if (device.parameters.fanSpeed)
            parameters.fanSpeed = device.parameters.fanSpeed;
        if (device.parameters.ecoFunctionData)
            parameters.ecoFunctionData = device.parameters.ecoFunctionData;
        if (device.parameters.ecoMode)
            parameters.ecoMode = device.parameters.ecoMode;
        if (device.nanoeStandAlone && device.parameters.actualNanoe)
            parameters.actualNanoe = device.parameters.actualNanoe;
        if (device.nanoe && device.parameters.nanoe)
            parameters.nanoe = device.parameters.nanoe;
        if ((device.autoMode && device.parameters.operationMode === OperationMode.Auto)
            || (device.coolMode && device.parameters.operationMode === OperationMode.Cool)
            || (device.dryMode && device.parameters.operationMode === OperationMode.Dry)
            || (device.heatMode && device.parameters.operationMode === OperationMode.Heat)
            || (device.fanMode && device.parameters.operationMode === OperationMode.Fan))
            parameters.operationMode = device.parameters.operationMode;
        return parameters;
    }

    private getParameters(parameters: DeviceParameters): DeviceParameters {
        const par: DeviceParameters = {};
        if (parameters.operate)
            par.operate = parameters.operate;
        if (parameters.temperatureSet)
            par.temperatureSet = parameters.temperatureSet;
        if (parameters.fanAutoMode)
            par.fanAutoMode = parameters.fanAutoMode;
        if (parameters.airDirection)
            par.airDirection = parameters.airDirection;
        if (parameters.airSwingLR)
            par.airSwingLR = parameters.airSwingLR;
        if (parameters.airSwingUD)
            par.airSwingUD = parameters.airSwingUD;
        if (parameters.fanSpeed)
            par.fanSpeed = parameters.fanSpeed;
        if (parameters.actualNanoe)
            par.actualNanoe = parameters.actualNanoe;
        if (parameters.nanoe)
            par.nanoe = parameters.nanoe;
        if (parameters.ecoFunctionData)
            par.ecoFunctionData = parameters.ecoFunctionData;
        if (parameters.ecoMode)
            par.ecoMode = parameters.ecoMode;
        if (parameters.operationMode)
            par.operationMode = parameters.operationMode;
        return par;
    }

    /**
     *
     * @param options RequestOprions to use
     * @param data optional data to use for request body
     * @returns Promise<any>
     */
    private async request(options: https.RequestOptions, data?: any): Promise<any> {
        const self = this;
        return await new Promise<any>((resolve, reject) => {
            const req = https.request(options, (res: any) => {
                let str: string = '';
                res.on('data', function (chunk: string) {
                    str += chunk;
                });
                res.on('end', function () {
                    let response: any = self.isJsonString(str) ? JSON.parse(str) : str;
                    if (res.statusCode >= 200 && res.statusCode < 300) resolve(response);
                    else reject(response);
                });
            });
            req.on('error', (e: any) => {
                console.error(`problem with request: ${e.message}`);
                reject(e);
            });
            if (data) {
                req.write(data);
            }
            req.end();
        });
    }

    /**
     *
     * @param method HTTP method to use
     * @param uri Uri to use
     * @returns An object containing request options
     */
    private getRequestOptions(method: HttpMethod, uri: url.UrlWithParsedQuery): https.RequestOptions {
        return {
            host: uri.host,
            port: uri.port,
            path: uri.path,
            method: method,
            headers: {
                Connection: 'Keep-Alive',
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Host: uri.hostname as string,
                'X-APP-TYPE': 1,
                'X-APP-VERSION': '1.20.0',
                'X-User-Authorization': this._accessToken,
                'User-Agent': 'G-RAC',
            },
        };
    }

    isJsonString(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}
