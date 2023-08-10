import {AddJobDataAction, AddJobDataActionTypes, addJobDataState } from "../../types/addJob";




const initialState: addJobDataState = {
    addJobData: [],
    addJobDataLoading: false,
    error: "",
};
export const addJobDataReducer = (state = initialState, action: AddJobDataAction): addJobDataState => {
    switch (action.type) {
        case AddJobDataActionTypes.ADD_JOB_DATA_REQUEST:
            return {
                ...state,
                addJobDataLoading: true,
                error: "",
            };
        case AddJobDataActionTypes.ADD_JOB_DATA_SUCCESS:
            return {
                ...state,
                addJobData: action.payload,
                addJobDataLoading: false,
                error: "",
            };
        case AddJobDataActionTypes.ADD_JOB_DATA_FAILURE:
            return {
                ...state,
                addJobDataLoading: false,
                error: action.error,
            }
        default:
            return state;
    }
}