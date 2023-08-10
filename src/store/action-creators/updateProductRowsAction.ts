import axios from "axios";
import { updateProductRowsAction, updateProductRowsActionTypes } from "../../types/updateProductRows";
import request from "../api/api";
import { Dispatch } from "react";

export const updateProductRowsThunk = (data: any) => async (dispatch: Dispatch<updateProductRowsAction>): Promise<void> => {
    dispatch({ type: updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_REQUEST });
    try {
        const response = await axios.post(request.updateProductRows ,data);
        dispatch({ type:updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_SUCCESS, payload: response.data.result});
    } catch (error) {
        dispatch({ type:updateProductRowsActionTypes.UPDATE_PRODUCT_ROWS_FAILURE, error: error });
    }
};