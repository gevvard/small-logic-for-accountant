export interface updateProductRowsDataState {
    updateProductRows: any[];
    updateProductRowsLoading: boolean;
    error: string | null;
}

export enum updateProductRowsActionTypes {
    UPDATE_PRODUCT_ROWS_REQUEST = "UPDATE_PRODUCT_ROWS_REQUEST",
    UPDATE_PRODUCT_ROWS_SUCCESS = "UPDATE_PRODUCT_ROWS_SUCCESS",
    UPDATE_PRODUCT_ROWS_FAILURE = "UPDATE_PRODUCT_ROWS_FAILURE",
}

interface updateProductRowsRequestAction {
    type: updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_REQUEST;
}

interface updateProductRowsSuccessAction {
    type: updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_SUCCESS;
    payload: any
}

interface updateProductRowsFailureAction {
    type: updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_FAILURE;
    error: any;
}
export type updateProductRowsAction = | updateProductRowsRequestAction | updateProductRowsSuccessAction | updateProductRowsFailureAction;

