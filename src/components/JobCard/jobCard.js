import React from 'react';
import './jobcard.css';
import { MapPinIcon, WalletIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader, CardImg, CardSubtitle, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GoClockFill } from "react-icons/go";
import { calculateDaysAgoMessage } from '../../Api/postedDate';

function JobCard({ job }) {
  return (
    <div>
      <Card className='job-card' border='dark' style={{ height: '15rem', width: '15rem' }}>
        <CardBody>
          <Link to={`/job/${job.id}`} className="custom-link">
            <CardImg variant='top' src={job.logo} style={{ height: '20px', width: 'auto' }} />
            <CardHeader as="h1"> </CardHeader>
            <CardText className="card-title">{job.title}</CardText>
            <CardText className="card-name">{job.name}</CardText>
            <CardSubtitle className="mb-2 text-muted">
              <WalletIcon color="black" style={{ height: '1rem', width: '1rem' }} />
              <span className="badge rounded-pill job-card-salary">{job.salary}</span>
            </CardSubtitle>
            <CardSubtitle>
              <MapPinIcon style={{ height: '1rem', width: '1rem' }} /> {job.location}
            </CardSubtitle>
            {/* Align posted date to the right */}
            <div className="d-flex justify-content-between align-items-center mt-2">
              <CardSubtitle className="text-muted" style={{ fontSize: '0.8rem' }}>
                <GoClockFill style={{ height: '0.8rem', width: '0.8rem', marginRight: '0.5rem' }} />
                {calculateDaysAgoMessage(job.postedAt)}
              </CardSubtitle>
              {/* This empty div creates a gap */}
              <div style={{ width: '20px' }}></div>
            </div>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}

export default JobCard;
