
import {addDealActionTypes, addDealDataAction, addDealDataState} from "../../types/addDeal";


const initialState: addDealDataState = {
    dealData: [],
    dealDataLoading: false,
    error: null,
};
export const addDealReducer = (state = initialState, action: addDealDataAction): addDealDataState => {
    switch (action.type) {
        case addDealActionTypes.ADD_DEAL_REQUEST:
            return {
                ...state,
                dealDataLoading: true,
                error: null,
            };
        case addDealActionTypes.ADD_DEAL_SUCCESS:
            return {
                ...state,
                dealData: action.payload,
                dealDataLoading: false,
                error: null,
            };
        case addDealActionTypes.ADD_DEAL_FAILURE:
            return {
                ...state,
                dealDataLoading: false,
                error: action.error,
            }
        default:
            return state;
    }
}