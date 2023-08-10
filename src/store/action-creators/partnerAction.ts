import axios, {AxiosResponse} from "axios";
import { Dispatch } from "redux";
import { PartnerAction, PartnerActionTypes, PartnerData } from "../../types/partner";

import requests from "../api/api";

export const getPartnerDataThunk = () => async (dispatch: Dispatch<PartnerAction>): Promise<void> => {


    try {
        dispatch({ type: PartnerActionTypes.GET_PARTNER_DATA_REQUEST });
        let response: AxiosResponse<any> = await axios.post(requests.getPartnerData, {"select" : ["ID", "TITLE"]});
        let result: PartnerData[] = [];
        result.push(response.data.result);

        while (response.data?.next && response.data?.next > 0) {
            const data = { start: response.data.next, "select" : ["ID", "TITLE"] };
            response = await axios.post(requests.getPartnerData, data);
            result.push(response.data.result);
        }

        dispatch({
            type: PartnerActionTypes.GET_PARTNER_DATA_SUCCESS,
            payload: { partner: result.flat() },
        });


    } catch (e) {
        console.log(e);
        dispatch({
            type: PartnerActionTypes.GET_PARTNER_DATA_FAILURE,
            payload: "Failed to fetch product data.",
        });

    }
};
