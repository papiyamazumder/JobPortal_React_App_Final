import Input from "../Input";
import './salaryRange.css'
import { Badge } from "react-bootstrap";

function SalaryRange({handleChange}){
    return(
        <div className="m1">
            <h2 className="sidebar-title"><Badge pill > Salary Range</Badge></h2>
            <div>
                <Input handleChange={handleChange} value="1-5"
                title="Below 5 LPA" name="mode"/>

                <Input handleChange={handleChange} value="5-10"
                title="5 - 10 LPA" name="mode"/>

                <Input handleChange={handleChange} value="10-20"
                title="10 - 20 LPA" name="mode"/>

                <Input handleChange={handleChange} value="20-50"
                title="20 LPA or more" name="mode"/>

            </div>
        </div>
    )
}
export default SalaryRange