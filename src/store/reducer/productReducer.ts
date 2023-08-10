
import {ProductAction, ProductActionTypes, ProductData} from "../../types/product";



const initialState: ProductData = {
    product: [],
    productLoading: false,
    error: "",
};

const productReducer = (
    state = initialState,
    action: ProductAction
): ProductData => {
    switch (action.type) {
        case ProductActionTypes.GET_PRODUCT_REQUEST:
            return {
                ...state,
                productLoading: true,
                error: "",
            };
        case ProductActionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload,
                productLoading: false,
                error: "",
            };
        case ProductActionTypes.GET_PRODUCT_FAILURE:
            return {
                ...state,
                productLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default productReducer;
