
export interface PartnerData {
    partner: any[];
    loading: boolean;
    error: string;
}
export enum PartnerActionTypes {
    GET_PARTNER_DATA_REQUEST = "GET_PARTNER_DATA_REQUEST",
    GET_PARTNER_DATA_SUCCESS = "GET_PARTNER_DATA_SUCCESS",
    GET_PARTNER_DATA_FAILURE = "GET_PARTNER_DATA_FAILURE",
}
export interface GetPartnerDataRequest {
    type: PartnerActionTypes.GET_PARTNER_DATA_REQUEST;
}
export interface GetPartnerDataSuccess {
    type: PartnerActionTypes.GET_PARTNER_DATA_SUCCESS;
    payload: { partner: PartnerData[] };
}

export interface GetPartnerDataFailure {
    type: PartnerActionTypes.GET_PARTNER_DATA_FAILURE;
    payload: string;
}

export type PartnerAction =  GetPartnerDataRequest | GetPartnerDataSuccess | GetPartnerDataFailure;