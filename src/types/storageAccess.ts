export interface storageAccessDataState {
    storageAccessData: any[];
    storageAccessDataLoading: boolean;
    error: string | null;
}
export enum storageAccessDataActionTypes {
    STORAGE_ACCESS_DATA_REQUEST = "STORAGE_ACCESS_DATA_REQUEST",
    STORAGE_ACCESS_DATA_SUCCESS = "STORAGE_ACCESS_DATA_SUCCESS",
    STORAGE_ACCESS_DATA_FAILURE = "STORAGE_ACCESS_DATA_FAILURE",
}

interface storageAccessDataRequestAction {
    type: storageAccessDataActionTypes.STORAGE_ACCESS_DATA_REQUEST;
}
interface storageAccessDataSuccessAction {
    type: storageAccessDataActionTypes.STORAGE_ACCESS_DATA_SUCCESS;
    payload: any
}
interface storageAccessDataFailureAction {
    type: storageAccessDataActionTypes.STORAGE_ACCESS_DATA_FAILURE;
    error: string;
}
export type storageAccessDataAction =storageAccessDataRequestAction | storageAccessDataSuccessAction | storageAccessDataFailureAction
