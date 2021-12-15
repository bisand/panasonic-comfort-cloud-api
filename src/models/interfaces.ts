import { AirSwingLR, AirSwingUD, EcoMode, FanAutoMode, FanSpeed, NanoeMode, OperationMode, Power } from "./enums";

export interface Device {
    deviceGuid: string;

    autoMode: boolean;
    ecoNavi: boolean;
    iAutoX: boolean;
    quietMode: boolean;
    powerfulMode: boolean;
    fanMode: boolean;
    coolMode: boolean;
    dryMode: boolean;
    nanoeStandAlone: boolean;
    nanoe: boolean;
    heatMode: boolean;
    pairedFlg: boolean;

    modeAvlList: ModeAvlList;
    airSwingLR: AirSwingLR;
    autoSwingUD: AirSwingUD;

    dryTempMin: number;
    heatTempMax: number;
    temperatureUnit: number;
    coolTempMin: number;
    autoTempMin: number;
    timestamp: number;
    summerHouse: number;
    coolTempMax: number;
    permission: number;
    fanSpeedMode: number;
    dryTempMax: number;
    autoTempMax: number;
    fanDirectionMode: number;
    ecoFunction: number;
    heatTempMin: number;
    parameters: DeviceParameters;
}

export interface Group {
    groupId: number;
    groupName: string;
    deviceList: GroupDevice[];
}

export interface GroupDevice {
    deviceGuid: string;
    deviceType: string;
    deviceName: string;
    deviceModuleNumber: string;
    deviceHashGuid: string;

    iAutoX: boolean;
    nanoe: boolean;
    nanoeStandAlone: boolean;
    autoMode: boolean;
    heatMode: boolean;
    fanMode: boolean;
    dryMode: boolean;
    coolMode: boolean;
    ecoNavi: boolean;
    powerfulMode: boolean;
    quietMode: boolean;
    airSwingLR: boolean;
    autoSwingUD: boolean;
    coordinableFlg: boolean;

    permission: number;
    summerHouse: number;
    ecoFunction: number;
    temperatureUnit: number;

    modeAvlList: ModeAvlList;
    parameters: DeviceParameters;
}

export interface GroupResponse {
    iaqStatus: IaqStatus;
    uiFlg: boolean;
    groupCount: number;
    groupList: Group[];
}

export interface IaqStatus {
    statusCode: number;
}

export interface ModeAvlList {
    autoMode: number;
    fanMode: number;
}

export interface DeviceParameters {
    ecoFunctionData?: number;
    airSwingLR?: AirSwingLR;
    nanoe?: NanoeMode;
    lastSettingMode?: number;
    ecoNavi?: number;
    ecoMode?: EcoMode;
    operationMode?: OperationMode;
    fanAutoMode?: FanAutoMode;
    temperatureSet?: number;
    fanSpeed?: FanSpeed;
    iAuto?: number;
    airQuality?: number;
    insideTemperature?: number;
    outTemperature?: number;
    operate?: Power;
    airDirection?: number;
    actualNanoe?: NanoeMode;
    airSwingUD?: AirSwingUD;
}
