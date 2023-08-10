import {storageOutputDataAction, storageOutputDataActionTypes, storageOutputDataState } from "../../types/storageOutput";
const initialState: storageOutputDataState = {
    storageOutputData: [],
    storageOutputDataLoading: false,
    error: null,
};
export const storageOutputDataReducer = (state = initialState, action: storageOutputDataAction
): storageOutputDataState => {
    switch (action.type) {
        case storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_REQUEST:
            return {
                ...state,
                storageOutputDataLoading: true,
                error: null,
            };
        case storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_SUCCESS:
            return {
                ...state,
                storageOutputData: action.payload,
                storageOutputDataLoading: false,
                error: null,
            };
        case storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_FAILURE:
            return {
                ...state,
                storageOutputDataLoading: false,
                error: action.error,
            }
        default:
            return state;
    }
}