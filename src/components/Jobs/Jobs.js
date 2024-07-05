import React, { useState, useEffect } from 'react';
import './Jobs.css';
import JobCard from '../JobCard/jobCard'; 
import { Container, Row, Col } from 'react-bootstrap';
import SearchJob from '../SearchBar/searchJob';
import { SideBar } from '../Sidebar/sidebar';
import axios from 'axios';
import { getJobs } from '../../Api/usersApi'; // Adjust import path as per your project structure

function Jobs() {
  const [jobs, setJobs] = useState([]); // State to store all jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered jobs

  useEffect(() => {
    fetchJobs(); // Fetch jobs data on component mount
  }, []);

  // Function to fetch jobs data
  const fetchJobs = async () => {
    try {
      const jobsData = await getJobs(); // Call getJobs function from API
      setJobs(jobsData); // Set jobs state with fetched data
      setFilteredJobs(jobsData); // Initialize filteredJobs with all jobs on first load
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Function to handle job filtering based on selected criteria
  const handleFilter = (selectedValue) => {
    const filteredJob = jobs.filter((job) => {
      if (job.jobType === selectedValue) {
        return true;
      } else if (job.modeOfWork === selectedValue) {
        return true;
      }

      const [min, max] = selectedValue.split('-').map(s => parseFloat(s));
      const [minSalary, maxSalary] = job.salary.split('-').map(s => parseFloat(s.replace(/₹|\s/g, '')));

      // Check if either minSalary or maxSalary matches selectedValue
      return (minSalary >= min && maxSalary <= max);
    });
    setFilteredJobs(filteredJob); // Update filteredJobs state based on filter criteria
  };

  return (
    <div className='jobs'>
      <br />
      <div className='search'>
        <SearchJob jobs={jobs} setFilteredJobs={setFilteredJobs} />
      </div>
      <br />
      <hr />
      <SideBar handleFilter={handleFilter} />
      <div className='card-container'>
        <Container>
          <Row xs={1} md={3} className="g-4">
            {filteredJobs.map(job => (
              <Col lg={true} key={job.id}>
                <JobCard job={job} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Jobs;
