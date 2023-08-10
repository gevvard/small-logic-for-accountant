import axios from "axios";
import { storageAccessDataActionTypes } from "../../types/storageAccess";
import request from "../api/api";

export const storageAccessDataThunk = (data: any) => async (
    dispatch: any,
) => {
    try {
        dispatch({ type: storageAccessDataActionTypes.STORAGE_ACCESS_DATA_REQUEST });
        const response = await axios.post(request.storageAccessData ,data);
        dispatch({ type:storageAccessDataActionTypes.STORAGE_ACCESS_DATA_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({ type:storageAccessDataActionTypes.STORAGE_ACCESS_DATA_FAILURE, error: error });
    }
};