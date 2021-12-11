import * as https from 'https';
import { RequestOptions } from 'https';
import * as url from 'url';
import { HttpMethod } from './HttpMethod';
import { Device, Group, GroupResponse } from './models/interfaces';
import { LoginResponse } from './models/LoginResponse';

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
        const data = {
            language: '0',
            loginId: username,
            password: password,
        };
        const uri = url.parse(`${this._config.base_url}${this._config.login_url}`, true);
        const options: RequestOptions = this.getRequestOptions(HttpMethod.Post, uri);
        const res = await this.request(options, JSON.stringify(data));
        const result = JSON.parse(res);
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
        const res = await this.request(options);
        const result = JSON.parse(res);
        if (result.iaqStatus.statusCode === 200) {
            const data = result as GroupResponse;
            return data.groupList;
        }
        return [] as Group[];
    }

    /**
     * Returns device with the provided Device ID
     * @param deviceId Device ID to use aka deviceGuid
     * @returns Device based on deviceId
     */
    public async getDevice(deviceId: string): Promise<Device> {
        const uri = url.parse(`${this._config.base_url}${this._config.device_url.replace('{guid}', deviceId)}`, true);
        const options: RequestOptions = this.getRequestOptions(HttpMethod.Get, uri);
        const res = await this.request(options);
        const result = JSON.parse(res);
        return result as Device;
    }

    /**
     * 
     * @param options RequestOprions to use
     * @param data optional data to use for request body
     * @returns Promise<any>
     */
    private async request(options: https.RequestOptions, data?: any): Promise<any> {
        return await new Promise<any>((resolve, reject) => {
            const req = https.request(options, (res: any) => {
                let str: string = '';
                res.on('data', function (chunk: string) {
                    str += chunk;
                });
                res.on('end', function () {
                    if (res.statusCode === 200) resolve(str);
                    else if (res.statusCode === 401) reject(str);
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
}
