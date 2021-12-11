import { ModeAvlList } from "./ModeAvlList";
import { Parameters } from "./Parameters";


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
