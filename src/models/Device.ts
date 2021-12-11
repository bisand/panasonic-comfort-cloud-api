import { ModeAvlList } from "./ModeAvlList";
import { Parameters } from "./Parameters";


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
