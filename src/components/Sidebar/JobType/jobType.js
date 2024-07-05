import React from "react";
import "./jobType.css";
import Input from "../Input";
import { Badge } from "react-bootstrap";
function JobType({handleChange}){
    return(
        <div className="m1">
            <h2 className="sidebar-title"> <Badge pill>Job Type</Badge></h2>
            <div>
                <Input handleChange={handleChange} value="Fulltime"
                title="FullTime" name="mode"/>

                <Input handleChange={handleChange} value="Internship"
                title="Internship" name="mode"/>

            </div>
        </div>
    )
}
export default JobType