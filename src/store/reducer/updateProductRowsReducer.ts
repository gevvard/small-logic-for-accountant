import {updateProductRowsAction, updateProductRowsActionTypes, updateProductRowsDataState } from "../../types/updateProductRows";
const initialState: updateProductRowsDataState = {
    updateProductRows: [],
    updateProductRowsLoading: false,
    error: null,
};
export const updateProductRowsReducer = (state = initialState, action: updateProductRowsAction
): updateProductRowsDataState => {
    switch (action.type) {
        case updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_REQUEST:
            return {
                ...state,
                updateProductRowsLoading: true,
                error: null,
            };
        case updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_SUCCESS:
            return {
                ...state,
                updateProductRows: action.payload,
                updateProductRowsLoading: false,
                error: null,
            };
        case updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_FAILURE:
            return {
                ...state,
                updateProductRowsLoading: false,
                error: action.error,
            }
        default:
            return state;
    }
}