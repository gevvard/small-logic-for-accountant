import axios from "axios";
import {AddJobDataActionTypes} from "../../types/addJob";
import requests from "../api/api";


export const addJobDataThunk = (data: any) => async (
    dispatch: any,
) => {
    dispatch({type: AddJobDataActionTypes.ADD_JOB_DATA_REQUEST});
    try {
        const response = await axios.post(requests.updateNewData, data);
        dispatch({type: AddJobDataActionTypes.ADD_JOB_DATA_SUCCESS, payload: response.data.result});
        return response.data.result
    } catch (error) {
        dispatch({type: AddJobDataActionTypes.ADD_JOB_DATA_FAILURE, error: error});
    }
};