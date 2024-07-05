import React, { useEffect, useState } from 'react';
import { getCompanyDataByEmail } from '../../Api/adminApi'; // Adjust import path as per your project structure
import { useAuth } from '../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userEmail } = useAuth();
  const [companies, setCompanies] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (userEmail) {
          const companyData = await getCompanyDataByEmail(userEmail);
         console.log(userEmail)
          setCompanies(companyData);
        } else {
          console.error('Email not found in state.');
          alert("No Jobs Posted")
          navigate("/postJob")
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
 
    fetchCompanyData();
  }, [userEmail]);
 
  return (
    <div className="admin-dashboard">
     
      <div className="company-list">
       
      {companies.length === 0 ? (
          <p>No companies found.</p>
        ) : (
          companies.map((company) => (
            <div key={company.id} className="company-item">
              <p>Title: {company.title}</p>
              <p>Location: {company.location}</p>
              <p>Name: {company.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
 
export default AdminDashboard;