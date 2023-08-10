import axios from "axios";
import { Dispatch } from "react";
import { addDealActionTypes, addDealDataAction } from "../../types/addDeal";

import requests from "../api/api";


export const addDealThunk = (data: any) => async (dispatch: Dispatch<addDealDataAction>): Promise<any> => {
    try {
        dispatch({ type: addDealActionTypes.ADD_DEAL_REQUEST });
        const response = await axios.post(requests.addDeal ,data);
        dispatch({ type:addDealActionTypes.ADD_DEAL_SUCCESS, payload: response.data.result});
        return response.data.result
    } catch (error) {
        dispatch({ type:addDealActionTypes.ADD_DEAL_FAILURE, error: error });
    }
};