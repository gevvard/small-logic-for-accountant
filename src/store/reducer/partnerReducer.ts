import {PartnerAction, PartnerActionTypes, PartnerData} from "../../types/partner";



const initialState: PartnerData = {
    partner: [],
    loading: false,
    error: "",
};

const partnerReducer = (
    state = initialState,
    action: PartnerAction
): PartnerData => {
    switch (action.type) {
        case PartnerActionTypes.GET_PARTNER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case PartnerActionTypes.GET_PARTNER_DATA_SUCCESS:
            return {
                ...state,
                partner: action.payload.partner,
                loading: false,
                error: "",
            };
        case PartnerActionTypes.GET_PARTNER_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
export default partnerReducer