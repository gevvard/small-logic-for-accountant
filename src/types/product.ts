

export interface ProductData {
    product: any[],
    productLoading: boolean,
    error: null | string;
}

export enum ProductActionTypes {
    GET_PRODUCT_REQUEST = "GET_PRODUCT_REQUEST",
    GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS",
    GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE",
}

export interface GetProductRequest {
    type: ProductActionTypes.GET_PRODUCT_REQUEST;
}

export interface GetProductSuccess {
    type: ProductActionTypes.GET_PRODUCT_SUCCESS;
    payload: any[];
}

export interface GetProductFailure {
    type: ProductActionTypes.GET_PRODUCT_FAILURE;
    payload: string;
}
export type ProductAction =   GetProductRequest | GetProductSuccess | GetProductFailure;