export interface addDealDataState {
    dealData: any[];
    dealDataLoading: boolean;
    error: string | null;
}

export enum addDealActionTypes {
    ADD_DEAL_REQUEST = "ADD_DEAL_REQUEST",
    ADD_DEAL_SUCCESS = "ADD_DEAL_SUCCESS",
    ADD_DEAL_FAILURE = "ADD_DEAL_FAILURE",
}
interface addDealDataRequestAction {
    type: addDealActionTypes.ADD_DEAL_REQUEST;
}

interface addDealDataSuccessAction {
    type: addDealActionTypes.ADD_DEAL_SUCCESS;
    payload: any
}

interface addDealDataFailureAction {
    type: addDealActionTypes.ADD_DEAL_FAILURE;
    error: any;
}

export type addDealDataAction = | addDealDataRequestAction | addDealDataSuccessAction | addDealDataFailureAction;

