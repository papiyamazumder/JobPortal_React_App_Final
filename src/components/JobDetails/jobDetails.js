// JobDetails.js

import React, { useState, useEffect } from "react";
import "./jobdetails.css";
import { useParams, Link} from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container, Image, Card, ListGroup, Badge, Stack, Button } from "react-bootstrap";
import { PiBriefcaseBold } from "react-icons/pi";
import { FaWallet } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { getJobById } from "../../Api/usersApi"; // Adjust import path as per your project structure

function JobDetails() {
  const { id } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);
 
  useEffect(() => {
    fetchJobDetails(); // Fetch job details on component mount
  }, []);

  const fetchJobDetails = async () => {
    try {
      const jobData = await getJobById(id); // Fetch job details by ID
      setSelectedJob(jobData); // Set selectedJob state with fetched job data
    } catch (error) {
      console.error('Error fetching job details:', error);
      // Optionally handle error as per your application's needs
    }
  };


  if (!selectedJob) {
    return <div>Loading...</div>; // Placeholder for when job data is being fetched
  }

  return (
    <div>
      <Helmet>
        <style>{`.navbar { display: none; }`}</style>
      </Helmet>
      <Container>
        <Card className="job-card-description">
          <ListGroup variant="dark">
            <ListGroup.Item className="job-items">
              <div className="d-flex align-items-center">
                <Image className="logo" src={selectedJob.logo} roundedCircle />
                <div className="job-title-name">
                  <h5>{selectedJob.title}</h5>
                  <h6>{selectedJob.name}</h6>
                  <FaLocationDot /> : {selectedJob.location}
                  <br /> <br />
                  <Stack direction="vertical" gap={2}>
                    <Stack direction="horizontal" gap={5}>
                      <Badge className="skill-badge-a"><PiBriefcaseBold />: {selectedJob.experience} </Badge>
                      <Badge className="skill-badge-a"><FaWallet />: {selectedJob.salary} </Badge>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                      <Badge className="box-badge-color">{selectedJob.modeOfWork}</Badge>
                      <Badge className="box-badge-color">{selectedJob.jobType}</Badge>
                      <Badge className="box-badge-color">Vacancy: {selectedJob.vacancy}</Badge>
                    </Stack>
                  </Stack>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="job-company">
              <h5>About the Company</h5>
              <p>{selectedJob.aboutCompany}</p>
            </ListGroup.Item>
            <ListGroup.Item className="job-company">
              <h5>Job Description</h5>
              <p>{selectedJob.description}</p>
            </ListGroup.Item>
            <ListGroup.Item className="job-company">
              <h5>Job Responsibility</h5>
              <p>{selectedJob.responsibility.split('- ').map((list, index) => (
                <li key={index}>{list}</li>
              ))}</p>
            </ListGroup.Item>
            <ListGroup.Item className="job-company">
              <h5>Qualifications</h5>
              <p>{selectedJob.qualifications}</p>
            </ListGroup.Item>
            <ListGroup.Item className="job-company">
              <h5>Key Skills</h5>
              <p>{selectedJob.skillsRequired.split(',').map((skills, index) => (
                <Badge className="skill-badge" key={index}>{skills}</Badge>
              ))}</p>
            </ListGroup.Item>
            <ListGroup.Item className="job-company">
              <h5>Contact Details</h5>
              <p><MdEmail />: {selectedJob.contactInfo.email}</p>
              <p><MdLocalPhone />: {selectedJob.contactInfo.phone}</p>
            </ListGroup.Item>
          </ListGroup>
        </Card>

        <div className="button-container">
          <Link to="/jobs">
            <Button variant="secondary" size="lg" className="back-button">Back</Button>
          </Link>
          <Link to={`/profile/${selectedJob.id}/${selectedJob.contactInfo.email}/true`}>
            <Button variant="primary" size="lg" className="apply-button">Apply</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default JobDetails;
