import { GroupDevice } from "./GroupDevice";


export interface Group {
    groupId: number;
    groupName: string;
    deviceList: GroupDevice[];
}
