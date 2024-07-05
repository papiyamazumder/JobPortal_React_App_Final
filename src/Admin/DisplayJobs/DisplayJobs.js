import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCompanyDataByEmail ,deleteJob} from '../../Api/adminApi'; // Adjust import path as per your project structure
import { useAuth } from '../../Auth/AuthProvider';
import './displayJobs.css'
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from 'react-bootstrap';
import {calculateDaysAgoMessage} from '../../Api/postedDate';
import { GoClockFill } from "react-icons/go";

 
const DisplayJobs = () => {
    const { userEmail } = useAuth();
    const [companies, setCompanies] = useState([]);
 
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                if (userEmail) {
                    const companyData = await getCompanyDataByEmail(userEmail);
                    console.log(userEmail)
                    setCompanies(companyData);
                } else {
                    console.error('Email not found in state.');
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };
 
        fetchCompanyData();
    }, [userEmail]);
 
    const handleDelete = async (companyId) => {
        try {
            if (window.confirm('Are you sure you want to delete this job?')) {
                await deleteJob(companyId);
                setCompanies(prevCompanies => prevCompanies.filter(company => company.id !== companyId));
                alert('Job deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            // Optionally handle specific errors or display error messages
        }
    };
 
    return (
        <div className="display-jobs-container">
        <div className="job-list">
        {companies.map((company, index) => (
                <div key={index} className="company-item">
                    <div className="company-logo">
                        <img src={company.logo} alt="Company Logo" />
                    </div>
                    <div className="company-details">
                        <h3 className="job-title">{company.title}</h3>
                        <div className="job-location-type">
                            <FaLocationDot />
                            <span>{company.location}</span>
                            <span className="badge-pill">
                                <Badge pill bg="secondary">{company.jobType}</Badge>
                            </span>
                        </div>
                        <div className="posted-time">
                               <GoClockFill/> {calculateDaysAgoMessage(company.postedAt)}
                        </div>
                    </div>
                    <div className="company-actions">
                        <Link to={`/postJob/${company.id}`} className="edit-button">Edit</Link>
                        <button onClick={() => handleDelete(company.id)} className="delete-button">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};
 
export default DisplayJobs;