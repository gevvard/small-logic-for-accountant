import React, {useState} from 'react';
import css from "./job.module.scss"
import Loading from "../../components/loading/loading";
import {addJobDataThunk} from "../../store/action-creators/addJobDataAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface FileTuple {
    name: any;
    path: any;
}

const Job = () => {
    const {addJobData, addJobDataLoading} = useTypedSelector(state => state.addJobData)
    const [jobName, setJobName] = useState("")
    const [space, setSpace] = useState("")
    const [files, setFiles] = useState<FileTuple[]>([]);
    const [location, setLocation] = useState("")
    const [error, setError] = useState("")
    const searchParams = new URLSearchParams(window.location.search);
    const deal = searchParams.get("deal");
    const token = searchParams.get("token")

    const responsible_id =155

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const totalFiles = Array.from(e.target.files || []);

        if (totalFiles.length > 0) {
            const file = totalFiles[0];
            const base64Data = await toBase64(file);
            const fileName = file.name;
            const newFile: FileTuple = {
                name: fileName,
                path: base64Data?.split(',')[1]
            };

            setFiles([...files, newFile]);
        }

    };
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    };

    const showPosition = (position: GeolocationPosition) => {
        let locationInput = document.getElementById('geoLink') as HTMLInputElement;

        // @ts-ignore
        setLocation(locationInput?.value)
        if (locationInput) {
            locationInput.value =
                'http://maps.google.com/maps?z=20&t=m&q=' +
                position.coords.latitude +
                '+' +
                position.coords.longitude;

        }
    };
    getLocation();


    const handleSubmit = () => {
        let sendingData = {
            "entityTypeId": "178",
            "fields": {
                "ufCrm2_1674207068719": files,
                "ufCrm2_1674558897644": space,
                "ufCrm2_1674207004334": location,
                "TITLE": jobName,
                "ufCrm2_1674559053": token,
                "parentId2": deal,
                "ASSIGNED_BY_ID": responsible_id
            }
        }

        if (!space) {
            setError("Խնդրում ենք լրացնել աշխատանքի ՔՄ")
        }
        if (!jobName) {
            setError("Խնդրում ենք լրացնել աշխատանքի անվանում")
        }
        if (files && location && space && jobName && token && deal) {
            // @ts-ignore
            addJobDataThunk(sendingData).then(() => {
                setJobName("")
                setSpace("")
                setFiles([])
                setLocation("")
            })
        }
    }
    if (addJobDataLoading) {
        return <div><Loading/></div>
    }

    return (
        <>
            {
                responsible_id ?
                    <div>
                        {
                            Object.values(addJobData) && Object.values(addJobData)?.length > 0 ?
                                <div className={css.formBoldMainWrapper}>"Ինֆորմացիան հաջողությամբ պահպանված է"</div>
                                : <div className={css.formBoldMainWrapper}>

                                    <div className={css.formBoldFormWrapper}>
                                        <div className={css.emptyErrorContainer}>{error}</div>
                                        <div>
                                            <input type="hidden" name="geoLink" id="geoLink"/>
                                            <div className={css.formBoldInputFlex}>
                                                <div>
                                                    <label htmlFor="workTitle">
                                                        Աշխատանքի անվանում
                                                    </label>
                                                    <input
                                                        value={jobName}
                                                        onChange={(e) => {
                                                            setJobName(e.target.value)
                                                        }}
                                                        type="text"
                                                        name="workTitle"
                                                        id="workTitle"
                                                        className={css.formBoldFormInput}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={css.formBoldInputFlex}>
                                            <div>
                                                <label htmlFor="space" className={css.formBoldFormLabel}>ՔՄ</label>
                                                <input
                                                    value={space}
                                                    onChange={(e) => {
                                                        setSpace(e.target.value)
                                                    }}
                                                    type="text"
                                                    name="space"
                                                    id="space"
                                                    className={css.formBoldFormInput}
                                                />

                                            </div>
                                        </div>

                                        <div className={css.formBoldInputFile}>
                                            <div
                                                className={css.formBoldFilenameWrapper}
                                                id="formbold-filename-wrapper"
                                            ></div>
                                            <label htmlFor="upload" className={css.formBoldInputLabel}>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g clipPath="url(#clip0_1670_1531)">
                                                        <path
                                                            d="M12.3568 6.4644L7.64349 11.1786C7.5639 11.2554 7.50041 11.3474 7.45674 11.4491C7.41307 11.5507 7.39008 11.6601 7.38912 11.7707C7.38815 11.8814 7.40924 11.9911 7.45114 12.0935C7.49304 12.1959 7.55492 12.289 7.63316 12.3672C7.71141 12.4455 7.80445 12.5073 7.90686 12.5492C8.00928 12.5912 8.11901 12.6122 8.22966 12.6113C8.34031 12.6103 8.44966 12.5873 8.55133 12.5436C8.653 12.5 8.74495 12.4365 8.82182 12.3569L13.536 7.64356C14.0049 7.17468 14.2683 6.53875 14.2683 5.87565C14.2683 5.21255 14.0049 4.57661 13.536 4.10773C13.0671 3.63885 12.4312 3.37544 11.7681 3.37544C11.105 3.37544 10.469 3.63885 10.0002 4.10773L5.28599 8.8219C4.89105 9.20701 4.57652 9.6667 4.36062 10.1743C4.14473 10.6819 4.03178 11.2274 4.02832 11.779C4.02487 12.3306 4.13097 12.8774 4.34049 13.3877C4.55 13.8979 4.85876 14.3615 5.24884 14.7516C5.63892 15.1416 6.10256 15.4503 6.61287 15.6597C7.12318 15.8692 7.67 15.9752 8.2216 15.9717C8.77321 15.9681 9.31862 15.8551 9.82621 15.6391C10.3338 15.4232 10.7934 15.1086 11.1785 14.7136L15.8927 10.0002L17.071 11.1786L12.3568 15.8927C11.8151 16.4344 11.172 16.8641 10.4643 17.1573C9.75649 17.4505 8.99791 17.6014 8.23182 17.6014C7.46574 17.6014 6.70716 17.4505 5.99939 17.1573C5.29162 16.8641 4.64853 16.4344 4.10682 15.8927C3.56512 15.351 3.13542 14.7079 2.84225 14.0002C2.54908 13.2924 2.39819 12.5338 2.39819 11.7677C2.39819 11.0016 2.54908 10.2431 2.84225 9.5353C3.13542 8.82753 3.56512 8.18443 4.10682 7.64273L8.82182 2.9294C9.60767 2.17041 10.6602 1.75043 11.7527 1.75992C12.8451 1.76942 13.8902 2.20762 14.6627 2.98015C15.4353 3.75269 15.8735 4.79774 15.883 5.89023C15.8925 6.98271 15.4725 8.03522 14.7135 8.82106L10.0002 13.5369C9.76794 13.7691 9.49226 13.9532 9.18887 14.0788C8.88548 14.2045 8.56032 14.2691 8.23195 14.2691C7.90357 14.269 7.57843 14.2043 7.27507 14.0786C6.97171 13.9529 6.69607 13.7687 6.46391 13.5365C6.23174 13.3043 6.04759 13.0286 5.92196 12.7252C5.79633 12.4218 5.7317 12.0966 5.73173 11.7683C5.73177 11.4399 5.79649 11.1148 5.92219 10.8114C6.04788 10.508 6.2321 10.2324 6.46432 10.0002L11.1785 5.28606L12.3568 6.4644Z"
                                                            fill="#07074D"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1670_1531">
                                                            <rect width="20" height="20" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                Կցել ֆայլեր
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    name="upload"
                                                    id="upload"
                                                    className={css.file}
                                                    onChange={handleFileUpload}
                                                />
                                                <div>
                                                    {files.length > 0 && (
                                                        <div>
                                                            <ol>
                                                                {files.map((file) => (
                                                                    <li key={file.name}>{file.name}</li>
                                                                ))}
                                                            </ol>
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        <button className={css.formBoldBtn}
                                                onClick={handleSubmit}
                                        >
                                            Ուղարկել
                                        </button>
                                    </div>

                                </div>
                        }
                    </div>
                    : <div className={css.errorContainer}>Խնդրում ենք ճշտել հղումը և կրկին փորձել</div>
            }
        </>
    );
};

export default Job;


