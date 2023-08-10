import {cash_in, cash_out, displacement, job} from "../ui/url";
import Cash_in from "./cash_in/cash_in";
import Displacement from "./displacement/Displacement";
import Job from "./job/job";
import Cash_out from "./cash_out/cash_out";

export const menuItem = [
    {
        name: "displacement",
        "element":Displacement,
        path: displacement,
    },
    {
        name: "cash_in",
        "element":Cash_in,
        path: cash_in,
    },
    {
        name: "cash_out",
        "element":Cash_out,
        path: cash_out,
    },
    {
        name:"job",
        "element":Job,
        path:job
    },
]