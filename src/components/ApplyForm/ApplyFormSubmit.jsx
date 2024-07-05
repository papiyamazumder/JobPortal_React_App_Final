import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplyFormSubmit = () => {
  const navigate = useNavigate();

  const handleApplyForJob = () => {
    navigate("/jobs");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card-body text-center">
          <h2 className="card-title mb-4" style={{color:"green",fontSize:"x-large"}}>Form Submitted Successfully</h2>
          <p className="card-text mb-4">Thank you for applying. We will review your application and get back to you soon.</p>
          <button 
            className="btn btn-primary" 
            onClick={handleApplyForJob}>
            Apply for Another Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyFormSubmit;
