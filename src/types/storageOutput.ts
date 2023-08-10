
export interface storageOutputDataState {
    storageOutputData: any[];
    storageOutputDataLoading: boolean;
    error: string | null;
}

export enum storageOutputDataActionTypes {
    STORAGE_OUTPUT_DATA_REQUEST = "STORAGE_OUTPUT_DATA_REQUEST",
    STORAGE_OUTPUT_DATA_SUCCESS = "STORAGE_OUTPUT_DATA_SUCCESS",
    STORAGE_OUTPUT_DATA_FAILURE = "STORAGE_OUTPUT_DATA_FAILURE",
}

interface storageOutputDataRequestAction {
    type: storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_REQUEST;
}
interface storageOutputDataSuccessAction {
    type: storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_SUCCESS;
    payload: any
}
interface storageOutputDataFailureAction {
    type: storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_FAILURE;
    error: string;
}
export type storageOutputDataAction =storageOutputDataRequestAction| storageOutputDataSuccessAction | storageOutputDataFailureAction