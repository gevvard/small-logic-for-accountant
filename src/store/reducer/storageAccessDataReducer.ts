import {storageAccessDataAction, storageAccessDataActionTypes, storageAccessDataState } from "../../types/storageAccess";

const initialState: storageAccessDataState = {
    storageAccessData: [],
    storageAccessDataLoading: false,
    error: null,
};
export const storageAccessDataReducer = (state = initialState, action: storageAccessDataAction
): storageAccessDataState => {
    switch (action.type) {
        case storageAccessDataActionTypes.STORAGE_ACCESS_DATA_REQUEST:
            return {
                ...state,
                storageAccessDataLoading: true,
                error: null,
            };
        case storageAccessDataActionTypes.STORAGE_ACCESS_DATA_SUCCESS:
            return {
                ...state,
                storageAccessData: action.payload,
                storageAccessDataLoading: false,
                error: null,
            };
        case storageAccessDataActionTypes.STORAGE_ACCESS_DATA_FAILURE:
            return {
                ...state,
                storageAccessDataLoading: false,
                error: action.error,
            }
        default:
            return state;
    }
}