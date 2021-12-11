
export interface IaqStatus {
    statusCode: number;
}

export interface ModeAvlList {
    autoMode: number;
    fanMode: number;
}
export interface Parameters {
    ecoFunctionData: number;
    airSwingLR: number;
    nanoe: number;
    lastSettingMode: number;
    ecoNavi: number;
    ecoMode: number;
    operationMode: number;
    fanAutoMode: number;
    temperatureSet: number;
    fanSpeed: number;
    iAuto: number;
    airQuality: number;
    insideTemperature: number;
    outTemperature: number;
    operate: number;
    airDirection: number;
    actualNanoe: number;
    airSwingUD: number;
}

export interface GroupDevice {
    deviceGuid: string;
    deviceType: string;
    deviceName: string;
    permission: number;
    deviceModuleNumber: string;
    deviceHashGuid: string;
    summerHouse: number;
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
    ecoFunction: number;
    temperatureUnit: number;
    modeAvlList: ModeAvlList;
    coordinableFlg: boolean;
    parameters: Parameters;
}

export interface Device {
    dryTempMin: number;
    modeAvlList: ModeAvlList;
    airSwingLR: boolean;
    nanoe: boolean;
    autoMode: boolean;
    autoSwingUD: boolean;
    ecoNavi: boolean;
    heatTempMax: number;
    temperatureUnit: number;
    iAutoX: boolean;
    coolTempMin: number;
    autoTempMin: number;
    quietMode: boolean;
    powerfulMode: boolean;
    timestamp: number;
    fanMode: boolean;
    coolMode: boolean;
    summerHouse: number;
    coolTempMax: number;
    permission: number;
    dryMode: boolean;
    nanoeStandAlone: boolean;
    heatMode: boolean;
    fanSpeedMode: number;
    dryTempMax: number;
    autoTempMax: number;
    fanDirectionMode: number;
    ecoFunction: number;
    heatTempMin: number;
    pairedFlg: boolean;
    parameters: Parameters;
}


export interface Group {
    groupId: number;
    groupName: string;
    deviceList: GroupDevice[];
}

export interface GroupResponse {
    iaqStatus: IaqStatus;
    uiFlg: boolean;
    groupCount: number;
    groupList: Group[];
}
