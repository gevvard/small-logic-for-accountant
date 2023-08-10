const BASE_URL = process.env.REACT_APP_BASE_URL
const getProduct = BASE_URL + '?type=product.list'
const getPartnerData = BASE_URL + '?type=company.list'
const addDeal = BASE_URL + '?type=deal.add'
const updateProductRows = BASE_URL + '?type=deal.productrows.set'
const updateNewData = BASE_URL + `?type=item.add`
const getUserData = BASE_URL + `?type=user.get`
const storageAccessData = BASE_URL + `?type=deal.userfield.list`
const storageOutputData = BASE_URL + `?type=deal.userfield.list`
const purposeOptionData = BASE_URL + `?type=deal.userfield.list`
const request = {
    getProduct,
    getPartnerData,
    addDeal,
    updateProductRows,
    updateNewData,
    getUserData,
    storageAccessData,
    storageOutputData,
    purposeOptionData
}
export default request