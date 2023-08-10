import axios, {AxiosResponse} from "axios";
import { Dispatch } from "redux";
import { ProductAction, ProductActionTypes, ProductData } from "../../types/product";
import requests from "../api/api";



export const getProductThunk = () => async (dispatch: Dispatch<ProductAction>) => {

    try {
        dispatch({ type: ProductActionTypes.GET_PRODUCT_REQUEST });
        let response: AxiosResponse<any> = await axios.post(requests.getProduct, {"select" : ["ID", "NAME"]});
        let result: ProductData[] = [];
        result.push(response.data.result);

        while (response.data?.next && response.data?.next > 0) {
            const data = { start: response.data.next, "select" : ["ID", "NAME"] };
            response = await axios.post(requests.getProduct, data);
            result.push(response.data.result);
        }

        dispatch({
            type: ProductActionTypes.GET_PRODUCT_SUCCESS,
            payload: result.flat(),
        });

    } catch (e) {
        console.log(e);
        dispatch({
            type: ProductActionTypes.GET_PRODUCT_FAILURE,
            payload: "Failed to fetch product data.",
        });
    } finally {

    }

};

