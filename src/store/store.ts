import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer/rootReducer";
import {ProductData} from "../types/product";
import {PartnerData} from "../types/partner";
import { addDealDataState } from "../types/addDeal";
import { updateProductRowsDataState } from "../types/updateProductRows";
import { addJobDataState } from "../types/addJob";
import { storageOutputDataState } from "../types/storageOutput";
import { storageAccessDataState } from "../types/storageAccess";
import {PurposeData} from "../types/purpose";

export type RootState ={
    product:ProductData,
    partner:PartnerData,
    dealData:addDealDataState
    updateProductRows:updateProductRowsDataState,
    addJobData:addJobDataState,
    storageAccessData:storageAccessDataState,
    storageOutputData:storageOutputDataState,
    purpose:PurposeData
}

export const store = createStore(rootReducer, applyMiddleware(thunk));

