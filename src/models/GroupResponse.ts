import { Group } from './Group';
import { IaqStatus } from "./IaqStatus";


export interface GroupResponse {
    iaqStatus: IaqStatus;
    uiFlg: boolean;
    groupCount: number;
    groupList: Group[];
}
