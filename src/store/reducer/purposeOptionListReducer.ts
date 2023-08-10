import {PurposeAction, PurposeActionTypes, PurposeData} from "../../types/purpose";


const initialState:PurposeData = {
    purpose: [],
    purposeDataLoading: false,
    error: "",
};

const purposeOptionListReducer = (
    state = initialState,
    action: PurposeAction
): PurposeData => {
    switch (action.type) {
        case PurposeActionTypes.GET_PURPOSE_REQUEST:
            return {
                ...state,
                purposeDataLoading: true,
                error: "",
            };
        case PurposeActionTypes.GET_PURPOSE_SUCCESS:
            return {
                ...state,
                purpose: action.payload,
                purposeDataLoading: false,
                error: "",
            };
        case PurposeActionTypes.GET_PURPOSE_FAILURE:
            return {
                ...state,
                purposeDataLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default purposeOptionListReducer;