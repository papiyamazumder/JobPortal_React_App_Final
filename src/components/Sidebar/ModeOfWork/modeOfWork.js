import React from "react";
import './modeOfWork.css';
import Input from "../Input";
import { Badge } from "react-bootstrap";

function ModeofWork({handleChange}){
    return(
        <div className="m1">
            <h2 className="sidebar-title"> <Badge pill >Mode Of Work</Badge></h2>
            <div>
                <Input handleChange={handleChange} value="Remote"
                title="Remote" name="mode"/> 

                <Input handleChange={handleChange} value="On-site"
                title="On-Site" name="mode"/>

                <Input handleChange={handleChange} value="Hybrid"
                title="Hybrid" name="mode"/>

            </div>
        </div>
    )
}
export default ModeofWork