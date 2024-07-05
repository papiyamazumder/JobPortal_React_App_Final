import React,{useState} from "react";
import './sidebar.css';
import ModeofWork from "./ModeOfWork/modeOfWork";
import JobType from "./JobType/jobType";
import SalaryRange from "./SalaryRange/salaryRange";
import { Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import { MdFilterListAlt } from "react-icons/md";


export function SideBar({handleFilter}){
    const[filter,setFilter]=useState(null)

    const handleChange=(e)=>{
        const selectedvalue=e.target.value;
        setFilter(selectedvalue)
        handleFilter(selectedvalue)
    }
    return(
        <section className="sidebar">
            <Card className="filter">
                <Card.Header style={{fontSize:"18px"}}><MdFilterListAlt /> Filters</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item className="list"><ModeofWork handleChange={handleChange}/> </ListGroup.Item>
                <ListGroup.Item  className="list"><JobType handleChange={handleChange}/></ListGroup.Item>
                <ListGroup.Item  className="list"><SalaryRange handleChange={handleChange}/></ListGroup.Item>
                </ListGroup>
            </Card>   
        </section>
    )
}