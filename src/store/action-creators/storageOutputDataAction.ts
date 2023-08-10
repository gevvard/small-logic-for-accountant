import axios from "axios";
import { storageOutputDataActionTypes } from "../../types/storageOutput";
import request from "../api/api";

export const storageOutputDataThunk = (data: any) => async (
    dispatch: any,
) => {
    try {
        dispatch({ type: storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_REQUEST });
        const response = await axios.post(request.storageOutputData ,data);
        dispatch({ type:storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({ type:storageOutputDataActionTypes.STORAGE_OUTPUT_DATA_FAILURE, error: error });
    }
};