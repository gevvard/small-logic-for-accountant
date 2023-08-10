


export interface PurposeData {
    purpose: any[],
    purposeDataLoading: boolean,
    error: null | string

}

export enum PurposeActionTypes {
    GET_PURPOSE_REQUEST = "GET_PURPOSE_REQUEST",
    GET_PURPOSE_SUCCESS = "GET_PURPOSE_SUCCESS",
    GET_PURPOSE_FAILURE = "GET_PURPOSE_FAILURE",
}
export interface GetPurposeRequest {
    type: PurposeActionTypes.GET_PURPOSE_REQUEST;
}

export interface GetPurposeSuccess {
    type: PurposeActionTypes.GET_PURPOSE_SUCCESS;
    payload: any[];
}

export interface GetPurposeFailure {
    type: PurposeActionTypes.GET_PURPOSE_FAILURE;
    payload: string;
}
export type PurposeAction =   GetPurposeRequest | GetPurposeSuccess | GetPurposeFailure;