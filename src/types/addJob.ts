export interface addJobDataState {
    addJobData: any[];
    addJobDataLoading: boolean;
    error: string ;
}
export enum AddJobDataActionTypes {
    ADD_JOB_DATA_REQUEST = "ADD_JOB_DATA_REQUEST",
    ADD_JOB_DATA_SUCCESS = "ADD_JOB_DATA_SUCCESS",
    ADD_JOB_DATA_FAILURE = "ADD_JOB_DATA_FAILURE",
}

interface AddJobDataRequestAction {
    type: AddJobDataActionTypes.ADD_JOB_DATA_REQUEST;
}
interface AddJobDataSuccessAction {
    type: AddJobDataActionTypes.ADD_JOB_DATA_SUCCESS;
    payload: any
}
interface AddJobDataFailureAction {
    type: AddJobDataActionTypes.ADD_JOB_DATA_FAILURE;
    error: string;
}
export type AddJobDataAction =AddJobDataRequestAction | AddJobDataSuccessAction | AddJobDataFailureAction

