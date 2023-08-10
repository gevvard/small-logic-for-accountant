import axios from "axios";
import request from "../api/api";
import {PurposeActionTypes} from "../../types/purpose";

export const purposeOptionDataThunk = (data: any) => async (
    dispatch: any,
) => {
    try {
        dispatch({ type: PurposeActionTypes.GET_PURPOSE_REQUEST });
        const response = await axios.post(request.purposeOptionData ,data);
        dispatch({ type:PurposeActionTypes.GET_PURPOSE_SUCCESS, payload: response?.data?.result[0]?.LIST});
    } catch (error) {
        dispatch({ type:PurposeActionTypes.GET_PURPOSE_FAILURE, error: error });
    }
};