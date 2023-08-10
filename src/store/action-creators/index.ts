import * as productActionCreators from './productAction'
import * as partnerActionCreators from './partnerAction'
import * as addDealActionCreators from './addDealAction'
import * as addJobActionCreators from './addJobDataAction'
import * as storageOutputActionCreator from './storageOutputDataAction'
import * as storageAccessActionCreator from './storageAccessDataAction'
import * as updateProductRowsActionCreator from './updateProductRowsAction'
import * as PurposeActionCreator from './purposeOptionListAction'


export default {
    ...productActionCreators,
    ...partnerActionCreators,
    ...addDealActionCreators,
    ...addJobActionCreators,
    ...storageOutputActionCreator,
    ...updateProductRowsActionCreator,
    ...storageAccessActionCreator,
    ...PurposeActionCreator

}