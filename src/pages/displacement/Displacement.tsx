import React, {useEffect, useState} from 'react';
import Select, {ActionMeta} from 'react-select';
import { addDealThunk } from '../../store/action-creators/addDealAction';
import { updateProductRowsThunk } from '../../store/action-creators/updateProductRowsAction';
import {getPartnerDataThunk} from "../../store/action-creators/partnerAction";
import { getProductThunk} from '../../store/action-creators/productAction';
import css from "./Displacement.module.scss"
import Loading from '../../components/loading/loading';
import {storageOutputDataThunk} from "../../store/action-creators/storageOutputDataAction";
import {storageAccessDataThunk} from "../../store/action-creators/storageAccessDataAction";
import {useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
;


interface SelectProductOption {
    TITLE: any;
    ID: any;
    NAME: any;
}

interface SelectPartnerOption {
    TITLE: any;
    ID: any;
    NAME: any;
}

interface SelectStorageOutputOption {
    TITLE: any;
    ID: any;
    NAME: any;
}

interface SelectStorageAccessOption {
    TITLE: any;
    ID: any;
    NAME: any;
}


const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        marginTop: "5px",
    }),
};
const Displacement =()=> {
    const {product,productLoading} = useTypedSelector(state => state.product)
    const {partner,loading} = useTypedSelector(state => state.partner)
    const {dealData,dealDataLoading} = useTypedSelector(state => state.dealData)
    const {updateProductRows} = useTypedSelector(state => state.updateProductRows)

    const {getProductThunk,getPartnerDataThunk,addDealThunk,storageOutputDataThunk,updateProductRowsThunk} = useActions()
    const [selectedOption, setSelectedOption] = useState<SelectProductOption[]>([]);
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");
    const [selectedValue, setSelectedValue] = useState<{PRODUCT_ID: number, QUANTITY: string}[]>([]);
    const [selectedPartnerOption, setSelectedPartnerOption] = useState<SelectPartnerOption[]>([]);
    const [selectedStorageOutputOptions, setSelectedStorageOutputOptions] = useState<SelectStorageOutputOption[]>([]);
    const [selectedStorageAccessOptions, setSelectedStorageAccessOptions] = useState<SelectStorageAccessOption[]>([]);
    const [error,setError]=useState("")

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    // const responsible_id = searchParams.get("user_id");
    const responsible_id = 155
    const options: SelectProductOption[] = product ? product : [];
    const partnerOptions: SelectPartnerOption[] = partner?.map(({ TITLE, ID }) => ({ID: ID, TITLE: TITLE, NAME: TITLE}));


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, selectedOptionID: number) => {
        const newSelectedValue = [...selectedValue];
        const index = newSelectedValue.findIndex((item) => item.PRODUCT_ID === selectedOptionID);
        if (index > -1) {
            newSelectedValue[index] = {...newSelectedValue[index], QUANTITY: event.target.value};
        } else {
            newSelectedValue.push({PRODUCT_ID: selectedOptionID, QUANTITY: event.target.value});
        }
        setSelectedValue(newSelectedValue);
    };


    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //@ts-ignore
        const selectedPartnerOptionID = selectedPartnerOption.ID;
        //@ts-ignore
        const outputDataId = selectedStorageOutputOptions.ID;
        //@ts-ignore
        const inputDataId = selectedStorageAccessOptions.ID;
        if (!selectedPartnerOptionID) {
            setError("Խնդրում ենք ընտրել գործընկեր")
        }
        if (!deliveryAddress) {
            setError("Խնդրում ենք ընտրել առաքման հասցե")
        }
        if (!deliveryDate) {
            setError("Խնդրում ենք ընտրել առաքման օր")
        }


        if (selectedPartnerOptionID && deliveryAddress && deliveryDate) {
            //@ts-ignore
            let data = {
                "FIELDS": {
                    "CATEGORY_ID": 11,
                    "UF_CRM_1677572898188": deliveryAddress,
                    "UF_CRM_1674548283626": deliveryDate,
                    "UF_CRM_1680870363": id,
                    "COMPANY_ID": selectedPartnerOptionID,
                    "ASSIGNED_BY_ID": responsible_id,
                    "UF_CRM_1684140070": inputDataId,
                    "UF_CRM_1684140034": outputDataId
                }
            };
            // @ts-ignore
            addDealThunk(data).then((response) => {
                setDeliveryAddress("");
                setDeliveryDate("");
                setSelectedPartnerOption([]);
                const sendingData: any[] = dealData;
                if (sendingData) {
                    // @ts-ignore
                    updateProductRowsThunk({id: response, rows: selectedValue}).then(() => {
                        setDeliveryAddress("");
                        setDeliveryDate("");
                        setSelectedPartnerOption([]);
                        setSelectedValue([]);
                        setSelectedOption([]);
                        setError("")

                    });
                }
            })

        }

    }


    // @ts-ignore
    function handleChange(selectedOption: ValueType<SelectOption, true>, actionMeta: ActionMeta<SelectOption>) {
        setSelectedOption(selectedOption as SelectProductOption[]);
    }
    // @ts-ignore
    function handleChangePartner(selectedOption: ValueType<SelectOption, true>, actionMeta: ActionMeta<SelectOption>) {
        setSelectedPartnerOption(selectedOption as SelectPartnerOption[]);
    }

    useEffect(() => {
        getProductThunk();
        getPartnerDataThunk();
    }, [ ]);
    useEffect(() => {
        storageOutputDataThunk({
            "FILTER": {
                "FIELD_NAME": "UF_CRM_1684140034"
            }
        });
        storageAccessDataThunk({
            "FILTER" : {
                "FIELD_NAME" : "UF_CRM_1684140070"
            }
        })
    }, [])
    if (productLoading) {
        return <div><Loading/></div>
    }

    if(loading){
        return <div><Loading/></div>
    }

    if(dealDataLoading){
        return <div><Loading/></div>
    }

    // @ts-ignore
    return (
       <>{responsible_id?
           <div>
           <h3 className={css.title} >Տեղաշարժ</h3>
           {typeof updateProductRows === 'boolean' && updateProductRows ===true ?
               <div className={css.container} >"Ինֆորմացիան հաջողությամբ պահպանված է"</div>
               :<div className={css.container}>
                   <form onSubmit={handleFormSubmit}>
                       <div className={css.emptyErrorContainer}  >{error}</div>

                       <div className={css.item}>
                           <label >Առաքման հասցե</label>
                           <input type="text"
                                  name="deliveryAddress"
                                  className={css.formInput}
                                  value={deliveryAddress}
                                  onChange={(e) =>
                                      setDeliveryAddress(e.target.value)
                                  }/>

                       </div>

                       <div className={css.item}>
                           <label >Առաքման օր</label>
                           <input type="date"
                                  name="deliveryDate"
                                  className={css.formInput}
                                  value={deliveryDate}
                                  onChange={(e) =>
                                      setDeliveryDate(e.target.value)
                                  }/>
                       </div>

                       <div className={css.item}>
                           <label>Գործընկեր</label>
                           <Select
                               styles={customStyles}
                               options={partnerOptions}
                               value={selectedPartnerOption}
                               getOptionLabel={(option) => option.TITLE}
                               getOptionValue={(option) => option.ID}
                               onChange={handleChangePartner}
                           />
                       </div>

                       <div >
                           <label className={css.label} >Ապրանքներ</label>
                           <div>
                               <Select
                                   styles={customStyles}
                                   options={options}
                                   isMulti
                                   getOptionLabel={(option) => option.NAME}
                                   getOptionValue={(option) => option.ID}
                                   value={selectedOption}
                                   onChange={handleChange}
                               />
                           </div>
                       </div>

                       <div className={css.item}>
                           {selectedOption && selectedOption?.map(({ID, NAME}) => {
                               return (
                                   <div key={ID} className={css.renderItem}>
                                       <div className={css.nameContainer}  >{NAME}</div>
                                       <div className={css.inputContainer} >
                                           <input
                                               type="number"
                                               className={css.input}
                                               value={selectedValue.find((item) =>
                                                      item.PRODUCT_ID === ID)?.QUANTITY || ""}
                                                  onChange={(e) => handleInputChange(e, ID)} />
                                       </div>
                                   </div>
                               );
                           })}
                       </div>

                       <div className={css.btnContainer}>
                           <button>Ուղարկել</button>
                       </div>

                   </form>
               </div>
           }</div>
           :<div className={css.errorContainer}>Խնդրում ենք ճշտել հղումը և կրկին փորձել</div>}</>

    );
}


export default Displacement;