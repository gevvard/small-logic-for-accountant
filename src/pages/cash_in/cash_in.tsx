import React, {useEffect, useState} from 'react';
import Select, {ActionMeta} from "react-select";
import {addDealThunk} from "../../store/action-creators/addDealAction";
import Loading from "../../components/loading/loading";
import {getPartnerDataThunk} from "../../store/action-creators/partnerAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import css from "./cash_in.module.scss"


interface purposeOption {
    TITLE: any;
    ID: any;
}

interface cashRegOption {
    value: any;
    label: any;
}

interface partnerSelectOption {
    TITLE: any;
    ID: any;
    NAME: any;
}

interface CashRegisterPartner {
    [key: string]: number;
}

const cashRegisterOption: cashRegOption[] = [
    {value: '356', label: 'Դրամարկղ 1'},
    {value: '357', label: 'Դրամարկղ 2'},
    {value: '358', label: 'Դրամարկղ 3'},
    {value: '359', label: 'Դրամարկղ 4'},
    {value: '360', label: 'Դրամարկղ 5'},
    {value: '361', label: 'Դրամարկղ 6'},
    {value: '362', label: 'Դրամարկղ 7'},
]

const cashRegisterPartner: CashRegisterPartner = {
    "356": 0,
    "357": 33,
    "358": 0,
    "359": 40,
    "360": 34,
    "361": 49,
    "362": 50,
}

const customStyles = {
    control: (provided: any, ) => ({
        ...provided,
        marginTop: "5px",
    }),
};
const Cash_in = () => {
    const {dealData, dealDataLoading} = useTypedSelector(state => state.dealData)
    const {partner, loading} = useTypedSelector(state => state.partner)
    const {purpose} = useTypedSelector(state => state.purpose)
    const {getPartnerDataThunk, addDealThunk, purposeOptionDataThunk} = useActions()
    const [sum, setSum] = useState("");
    const [selectedOption, setSelectedOption] = useState<purposeOption[]>([]);
    const [selectedCashRegisterOption, setSelectedCashRegisterOption] = useState<cashRegOption[]>([]);
    const [selectedPartnerOption, setSelectedPartnerOption] = useState<partnerSelectOption[]>([]);
    const [error, setError] = useState("")
    const purposeOptions: purposeOption[] = purpose?.map(({ID, VALUE}) => ({ID: ID, TITLE: VALUE}))
    const partnerOptions: partnerSelectOption[] = partner?.map(({TITLE, ID}) => ({ID: ID, TITLE: TITLE, NAME: TITLE}));

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    // const responsible_id = searchParams.get("user_id");
    const responsible_id =155

    // @ts-ignore
    const handleChange = (selected: OptionTypeBase) => {
        setSelectedOption(selected);
    };

    // @ts-ignore
    function handleChangePartner(selectedOption: ValueType<SelectOption, true>, actionMeta: ActionMeta<SelectOption>) {
        setSelectedPartnerOption(selectedOption as partnerSelectOption[]);
    }

    // @ts-ignore
    function handelChangeCashRegister(selected: OptionTypeBase) {
        setSelectedCashRegisterOption(selected);


    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        //@ts-ignore
        const selectedCashRegisterOptionID: any = selectedCashRegisterOption.value
        //@ts-ignore
        const selectedOptionID = selectedOption.value;
        //@ts-ignore
        const selectedPartnerOptionID = selectedPartnerOption?.ID
        //@ts-ignore

        if (selectedCashRegisterOptionID && sum && cashRegisterPartner[selectedCashRegisterOptionID]) {

            // @ts-ignore
            let sendingData = {
                "FIELDS": {
                    "CATEGORY_ID": 8,
                    "UF_CRM_1680600668998": sum,
                    "UF_CRM_1675681501": selectedOptionID,
                    "UF_CRM_1681308224532": selectedCashRegisterOptionID,
                    "UF_CRM_1680870363": id,
                    "UF_CRM_1681718173": cashRegisterPartner[selectedCashRegisterOptionID],
                    "COMPANY_ID": selectedPartnerOptionID,
                    "ASSIGNED_BY_ID": 155
                }
            };

            // @ts-ignore
            addDealThunk(sendingData).then(() => {
                setSum("")
                setSelectedPartnerOption([])
                setSelectedOption([])
                setSelectedCashRegisterOption([])
            })

        } else {
            if (!(cashRegisterPartner[selectedCashRegisterOptionID])) {
                setError("Խնդրում ենք ընտրել նպատակ")
            }
            if (!selectedOptionID) {
                setError("Խնդրում ենք ընտրել գործընկեր")

            }
            if (!selectedCashRegisterOptionID) {
                setError("Խնդրում ենք ընտրել դրամարկղ")

            }
            if (!sum) {
                setError("Խնդրում ենք ընտրել գումար")
            }

        }


    }

    useEffect(() => {
        getPartnerDataThunk()
        purposeOptionDataThunk({
            "FILTER": {
                "FIELD_NAME": "UF_CRM_1675681501"
            }
        })
    }, [])

    if (loading) {
        return <div><Loading/></div>
    }
    if (dealDataLoading) {
        return <div><Loading/></div>
    }

    return (
        <>{responsible_id ? <div>
                <h3 className={css.title}>Դրամարկղի մուտքի օրդեր</h3>
                {
                    Number(dealData) && Number(dealData) > 0 ?
                        <div className={css.container}>"Ինֆորմացիան հաջողությամբ պահպանված է"</div>
                        : <div className={css.container}>
                            <form onSubmit={handleFormSubmit}>
                                <div className={css.emptyErrorContainer}>{error}</div>
                                <div className={css.item}>
                                    <label>Մուտքագրվող գումար</label>
                                    <input
                                        type="text"
                                        placeholder="Sum"
                                        name="Sum"
                                        value={sum}
                                        onChange={(e) =>
                                            setSum(e.target.value)
                                        }/>
                                </div>
                                <div className={css.item}>
                                    <label>Նպատակ</label>
                                    <Select
                                        styles={customStyles}
                                        options={purposeOptions}
                                        getOptionLabel={(option) => option.TITLE}
                                        getOptionValue={(option) => option.ID}
                                        value={selectedOption}
                                        onChange={handleChange}
                                    />
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
                                <div className={css.item}>
                                    <label>Դրամարկղ</label>
                                    <Select
                                        styles={customStyles}
                                        options={cashRegisterOption}
                                        value={selectedCashRegisterOption}
                                        onChange={handelChangeCashRegister}
                                    />
                                </div>

                                <div className={css.btnContainer}>
                                    <button>Ուղարկել</button>
                                </div>
                            </form>
                        </div>

                }
            </div>
            : <div className={css.errorContainer}>Խնդրում ենք ճշտել հղումը և կրկին փորձել</div>}</>

    );
};

export default Cash_in;
