import {combineReducers} from "redux";
import partnerReducer from "./partnerReducer";
import {addDealReducer} from "./addDealReducer";
import {updateProductRowsReducer} from "./updateProductRowsReducer";
import {addJobDataReducer} from "./addJobDataReducer";
import ProductReducer from "./productReducer";
import {storageAccessDataReducer} from "./storageAccessDataReducer";
import { storageOutputDataReducer } from "./storageOutputDataReducer";
import purposeOptionListReducer from "./purposeOptionListReducer";




const rootReducer  = combineReducers({
    product:ProductReducer,
    partner:partnerReducer,
    dealData:addDealReducer,
    updateProductRows:updateProductRowsReducer,
    addJobData:addJobDataReducer,
    storageAccessData:storageAccessDataReducer,
    storageOutputData:storageOutputDataReducer,
    purpose:purposeOptionListReducer


})
export default rootReducer