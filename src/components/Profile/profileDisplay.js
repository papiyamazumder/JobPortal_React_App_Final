import React, { useState, useEffect } from 'react';
import './profiledisplay.css';
import { useNavigate,useParams } from 'react-router-dom';
import { BsGenderAmbiguous } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { GrPhone } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { getUserProfile,applyJob} from '../../Api/usersApi';
import { PiCity } from "react-icons/pi";

const ProfileDisplay = ({ userEmail,onEdit }) => {
  const { id, companyEmail,fromJobDetails} = useParams();
  console.log(fromJobDetails);
  const [formData, setFormData] = useState({
    basicDetails: {
      profilePhoto: null,
      fullname: '',
      gender: '',
      email: '',
      address: '',
      mobileNumber: '',
      previewUrl: null,
    },
    educationDetails: {
      coursename: '',
      specialization: '',
      collegename: '',
      cgpa: '',
    },
    skills: {
      skills: '',
    },
    projects: {
      projectname: '',
      projectdetails: '',
      projectskills: '',
      projecturl: '',
    },
    certifications: {
      certificationname: '',
      certificateurl: '',
      certificatefile:null,
      certificateFileName:'',
      certificatePreviewUrl:null,
    },
    experience:{
      companyname: '',
      designation: '',
      totalExperienceMonths: '',
      totalExperienceYears: '',
      workdescription: '',
      typeofexperience: ''
   },
   resume: {
    resumeFile: null,
    resumeFileName: '',
    resumePreviewUrl: null,
  },
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await getUserProfile(userEmail); // Replace with actual API call
        if (userProfileData)
          setFormData(userProfileData);
        }
      catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle error fetching user profile
      }
    };

    if (userEmail) {
      fetchUserProfile();
    }
  }, [userEmail]);

  useEffect(() => {
    console.log('fromJobDetails:', fromJobDetails); // Ensure fromJobDetails is logged correctly
  }, [fromJobDetails]);
    
  const handleApplyJob = async () => {
    try {
      console.log(id)
      const response = await applyJob(companyEmail, id, userEmail, formData); // Pass companyEmail and jobId here
      console.log('Application submitted successfully:', response);
      // Optionally, handle success (e.g., show success message, navigate to another page)
      navigate('/submit'); // Example: Navigate to submit page on successful application
    } catch (error) {
      console.error('Error applying for job:', error);
      // Optionally, handle error (e.g., show error message)
    }
  };

  // const handleSubmit = () => {
  //   navigate('/submit');
  // };
  

  return (
    <div className="display-container">
      <h2>Profile</h2>
      <div>
        <div className="display-card">
          <div className="display-card-body">
            <p className="display-card-text"></p>
            <div className="row">
              <div className="col-md-4">
            {formData.basicDetails.previewUrl ? (
              <img
                src={formData.basicDetails.previewUrl}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <img
                src={'./images/img/profile1.jpg'}
                alt="Default Profile"
                className="profile-image"
              />
            )}
            
            <p className="display-card-text"> <b style={{margin:35}}>{formData.basicDetails.fullname.split(' ')[0]}</b></p>
            </div>

            <div className="col-md-8">
            <p className="display-card-text"><CgProfile style={{fontSize:"24px"}} />
            { " "+ formData.basicDetails.fullname}</p>
            <p className="display-card-text"><AiTwotoneMail  style={{ fontSize: '24px' }}/> {formData.basicDetails.email}</p>
            <p className="display-card-text"><BsGenderAmbiguous style={{ fontSize: '24px' }}/> {formData.basicDetails.gender}</p>
            <p className="display-card-text"><IoLocationOutline style={{ fontSize: '24px' }}/> {formData.basicDetails.address}</p>
            <p className="display-card-text"> <PiCity   style={{ fontSize: '24px' }}/>{formData.basicDetails.city}</p>
            <p className="display-card-text">{` ${formData.basicDetails.state}`}</p>
            <p className="display-card-text"><GrPhone style={{ fontSize: '24px' }} />: {formData.basicDetails.mobileNumber}</p>
          </div>
          </div>
          </div>

        </div>
        
        <div className="display-card">
          <div className="display-card-body">
            <h5 className="display-card-title">Education</h5>
            <p className="display-card-text">Course Name: {formData.educationDetails.coursename}</p>
            <p  className="display-card-text">Specialization: {formData.educationDetails.specialization}</p>
            <p  className="display-card-text">College Name: {formData.educationDetails.collegename}</p>
            <p  className="display-card-text">CGPA: {formData.educationDetails.cgpa}</p>
          </div>
        </div>
       
        <div className="display-card">
          <div className="display-card-body">
            <h5 className="display-card-title">Skills</h5>
            <p className="display-card-text">Skills: {formData.skills.skills}</p>
          </div>
        </div>
       
        <div className="display-card">
          <div className="display-card-body">
            <h5 className="display-card-title">Projects</h5>
            <p className="display-card-text">Project Name: {formData.projects.projectname}</p>
            <p className="display-card-text">Description: {formData.projects.projectdetails}</p>
            <p className="display-card-text">Key Skills: {formData.projects.projectskills}</p>
            <p className="display-card-text">Project URL: {formData.projects.projecturl}</p>
          </div>
        </div>
        
        <div className="display-card">
          <div className="display-card-body">
            <h5 className="display-card-title">Certifications</h5>
            <p className="display-card-text">Certification Name: {formData.certifications.certificationname}</p>
            <p className="display-card-text">Certification URL: {formData.certifications.certificateurl}</p>
            <p className="display-card-text">Certificate:
            {formData.certifications.certificatePreviewUrl? (
              
             
               
                <a href={formData.certifications.certificatePreviewUrl} target="_blank" rel="noopener noreferrer">{formData.certifications.certificateFileName}</a>
                 
             
            ) : (
              <p className="display-card-text">No Certificate uploaded</p>
            )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="display-card">
          <div className="display-card-body">
            <h5 className="display-card-title">Experience</h5>
            <p className="display-card-text">Job Type: {formData.experience.typeofexperience}</p>
            <p className="display-card-text">Company: {formData.experience.companyname}</p>
            <p  className="display-card-text">Designation:{formData.experience.designation} </p>
            <p  className="display-card-text">Duration:{formData.experience.totalExperienceYears} years {formData.experience.totalExperienceMonths} months </p>
            <p  className="display-card-text">Job profile:{formData.experience.workdescription}</p>
          </div>
        </div>
        <div className="display-card">
          <div className="display-card-body">
            <h5 className="display-card-title">Resume</h5>
            {formData.resume.resumePreviewUrl? (
              <div>
             
               
                <a href={formData.resume.resumePreviewUrl} target="_blank" rel="noopener noreferrer">{formData.resume.resumeFileName}</a>
                 
              </div>
            ) : (
              <p className="display-card-text">No resume uploaded</p>
            )}
          </div>
        </div>

       
        
        <div className="button-display-container">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          {fromJobDetails === 'true' ?
          <button onClick={handleApplyJob} className="apply-btn">Submit</button> :
          null
        }
        </div>
      
    </div>
  );
};

export default ProfileDisplay;