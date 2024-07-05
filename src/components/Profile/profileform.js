import React, { useState, useEffect } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserProfile, userProfile } from '../../Api/usersApi';
import './profileform.css';

const ProfileForm = ({ userEmail, onCreate, onCancel }) => {
  const initialFormData = {
    basicDetails: {
      profilePhoto: null,
      fullname: '',
      gender: '',
      email: userEmail,
      address: '',
      city: '',
      state: '',
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
    experience: {
      companyname: '',
      designation: '',
      totalExperienceMonths: '',
      totalExperienceYears: '',
      workdescription: '',
      typeofexperience: '',
    },
    resume: {
      resumeFile: null,
      resumeFileName: '', // Added to store the file name
      resumePreviewUrl: null,
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail) {
          const userProfileData = await getUserProfile(userEmail);
          console.log(userProfileData);
          if (userProfileData) {
            setFormData(userProfileData);
          } else {
            // Handle case where userProfileData is null or undefined
            setFormData(initialFormData); // Reset formData to initial empty values
          }
        }
      } catch (error) {
        console.error('Error fetching user profile', error);
        // Handle error appropriately
      }
    };
    fetchData();
  }, [userEmail]);

  const handleChange = (e, section) => {
    const { name, value, files } = e.target;
    if (name === 'mobileNumber') {
      // Ensure only digits are entered and limit to 10 digits
      const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [name]: cleanedValue,
        },
      }));
    } else if (name === 'cgpa') {
      // Ensure only digits and dot (.) are entered for CGPA
      let cleanedValue = value.replace(/[^\d.]/g, '');
      const parts = cleanedValue.split('.');
      if (parts.length > 2) {
        cleanedValue = parts.slice(0, 2).join('.');
      }
      if (cleanedValue.includes('..')) {
        // If consecutive dots found, remove the last dot
        cleanedValue = cleanedValue.replace('..', '.');
      }
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [name]: cleanedValue,
        },
      }));
    } else if (name === 'profilePhoto') {
      const file = files && files.length > 0 ? files[0] : null;

      if (file) {
        const blobUrl = URL.createObjectURL(file); // Create blob URL for the file
        setFormData(prevState => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            profilePhoto: file,
            previewUrl: blobUrl, // Store blob URL instead of data URL
          },
        }));
      } else {
        // If no file is selected, reset profilePhoto and previewUrl
        setFormData(prevState => ({
          ...prevState,
          [section]: {
            ...prevState[section],
            profilePhoto: null,
            previewUrl: null,
          },
        }));
      }
    } else if (name === 'resume' ) {
      const file = files && files.length > 0 ? files[0] : null;

      if (file) {
        const blobUrl = URL.createObjectURL(file); // Create blob URL for the file
        setFormData(prevState => ({
          ...prevState,
          resume: {
            resumeFile: file,
            resumeFileName: file.name,
            resumePreviewUrl: blobUrl,
          },
        }));
      } else {
        // If no file is selected, reset resumeFile and resumePreviewUrl
        setFormData(prevState => ({
          ...prevState,
          resume: {
            resumeFile: null,
            resumeFileName: '',
            resumePreviewUrl: null,
          },
        }));
      }
    }
    else if (name === 'certificatefile') {
      const file = files && files.length > 0 ? files[0] : null;

      if (file) {
        const blobUrl = URL.createObjectURL(file);
        setFormData(prevState => ({
          ...prevState,
          certifications: {
            ...prevState.certifications,
            certificatefile: file,
            certificateFileName: file.name,
            certificatePreviewUrl: blobUrl,
          },
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          certifications: {
            ...prevState.certifications,
            certificatefile: null,
            certificateFileName: '',
            certificatePreviewUrl: null,
          },
        }));
      }
    } 
    else {
      setFormData(prevState => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [name]: value,
          previewUrl: null // Set preview URL to null if no file is selected
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userProfile(formData);
      console.log("Profile Created", response);
      onCreate();
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error appropriately
    }
  };

  const handleCancel = () => {
    // Reset form data and cancel the action
    setFormData({
      ...initialFormData,
      resume: {
        resumeFile: null,
        resumeFileName: '',
        resumePreviewUrl: null,
      }
    });
    onCancel();
  };

 
  return (
    <div style={{marginTop:"20px"}}>
      <Accordion className="profile-container" defaultActiveKey={['0']} flush alwaysOpen >
      <h2 style={{marginLeft:"210px"}}>Create Profile</h2>
 
 
 
      <Form className="profile-form"onSubmit={handleSubmit}>
      <Accordion.Item eventKey="0">
       
    <Accordion.Header><b style={{fontSize:"15px"}}>Basic Details</b></Accordion.Header>
 
    <Accordion.Body>
    <Form.Group as={Row} className="mb-2" controlId="profilePhoto">
                <Form.Label className="form-label" column sm={2}>
                  Profile Photo
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={(e) => handleChange(e, 'basicDetails')}
                  />
                  {formData.basicDetails.previewUrl && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={formData.basicDetails.previewUrl}
                        alt="Preview"
                        style={{
                          minWidth: '200px',
                          minHeight: '200px',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  )}
                </Col>
              </Form.Group>
      <Form.Group as={Row} className="mb-3" controlledId="fullname">
        <Form.Label className="form-label" column sm={2}>Full Name</Form.Label>
        <Col sm={10}>
          <Form.Control type="text" id="fullname" name="fullname"
            value={formData.basicDetails.fullname} onChange={e => handleChange(e, 'basicDetails')}
            placeholder="Fullname" required />
        </Col>
      </Form.Group>
      <Form.Group as={Col} className="mb-3" controlId="formHorizontalGender">
    <Form.Label className="form-label" column sm={2}>Gender</Form.Label>
    <Col sm={10}>
        <Form.Select aria-label="Select your gender" id="gender" name="gender" value={formData.basicDetails.gender} onChange={e => handleChange(e, 'basicDetails')} required>
            <option value="" disabled>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>      
            <option value="Transgender">Transgender</option>      
        </Form.Select>
    </Col>
</Form.Group>
     
      <Row className="mb-3">
        <Form.Group as={Col} controlledId="email">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control type="text" id="email"
            name="email" value={formData.basicDetails.email}
            onChange={e => handleChange(e, 'basicDetails')} placeholder="Email" required />
        </Form.Group>
       
 
        <Form.Group as={Col} controlledId="mobileNumber">
          <Form.Label className="form-label">Mobile No</Form.Label>
          <Form.Control type="tel" id="mobileNumber"
            name="mobileNumber" value={formData.basicDetails.mobileNumber}
            onChange={e => handleChange(e, 'basicDetails')} placeholder="Mobile Number"
            required />
        </Form.Group>
      </Row>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
    <Form.Label className="form-label" column sm={2}>Address</Form.Label>
    <Col sm={10}>
        <Form.Control type="text" id="address" name="address" value={formData.basicDetails.address} onChange={e => handleChange(e, 'basicDetails')} placeholder="Address" required />
    </Col>
</Form.Group>
 
<Row className="mb-3">
 
<Form.Group as={Col} className="mb-3" controlId="formHorizontalState">
    <Form.Label className="form-label" column sm={2}>State</Form.Label>
    <Col sm={10}>
        <Form.Select aria-label="Select your state" id="state" name="state" value={formData.basicDetails.state} onChange={e => handleChange(e, 'basicDetails')} required>
            <option value="" disabled>Select your state...</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Telangana">Telangana</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Delhi">Delhi</option>
 
           
        </Form.Select>
    </Col>
</Form.Group>
<Form.Group as={Col} className="mb-3" controlId="formHorizontalCity">
    <Form.Label className="form-label" column sm={2}>City</Form.Label>
        <Form.Control type="text" id="city" name="city" value={formData.basicDetails.city} onChange={e => handleChange(e, 'basicDetails')} placeholder="City" required />  
</Form.Group>
 
      </Row>
    </Accordion.Body>
  </Accordion.Item>
 
 
 
     
      <Accordion.Item eventKey="1">
        <Accordion.Header><b style={{fontSize:"15px"}}>Education</b></Accordion.Header>
        <Accordion.Body>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCourse">
         <Form.Label className="form-label" column sm={2}>Course Name</Form.Label>
         <Col sm={10}>
            <Form.Select aria-label="Default select example"
            id="coursename" name="coursename"
            value={formData.educationDetails.coursename}
            onChange={e => handleChange(e, 'educationDetails')}>
                <option value="" disabled>Select your course...</option>
                <option value="B.Tech/B.E">B.Tech/B.E</option>
                <option value="BCA">BCA</option>
                <option value="B.Arch">B.Arch</option>
                <option value="MBA">MBA</option>
                <option value="M.Tech">M.Tech</option>
            </Form.Select>
         </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formSpecialization">
        <Form.Label className="form-label" column sm={2}>Specialization </Form.Label>
        <Col sm={10}>
          <Form.Control  type="text" id="specialization" name="specialization"
            value={ formData.educationDetails.specialization}
            onChange={e => handleChange(e, 'educationDetails')}
            placeholder="Specialization" />
        </Col>
      </Form.Group>  
      <Form.Group as={Row} className="mb-3" controlId="formSpecialization">
        <Form.Label className="form-label" column sm={2}>College </Form.Label>
        <Col sm={10}>
          <Form.Control  type="text" id="collegename" name="collegename"
            value={ formData.educationDetails.collegename}
            onChange={e => handleChange(e, 'educationDetails')}
            placeholder="College Name" required/>
        </Col>
      </Form.Group>  
      <Form.Group as={Row} className="mb-3" controlId="formSpecialization">
        <Form.Label className="form-label" column sm={2}>CGPA </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" id="cgpa"
            name="cgpa" value={(formData.educationDetails && formData.educationDetails.cgpa) || ''}
            onChange={e => handleChange(e, 'educationDetails')}
            placeholder="CGPA"
            required/>
            </Col>
        </Form.Group>  
        </Accordion.Body>
        </Accordion.Item>
 
        <Accordion.Item eventKey="2">
        <Accordion.Header><b style={{fontSize:"15px"}}>Key Skills</b></Accordion.Header>
        <Accordion.Body>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCourse">
         <Form.Label className="form-label" column sm={2}>Skills</Form.Label>
         <Col sm={10}>
         <Form.Control type="text" id="skills"
            name="skills" value={(formData.skills.skills) || ''}
            onChange={e => handleChange(e, 'skills')}
            placeholder="Skills"
            required/>
         </Col>
      </Form.Group>
      
       </Accordion.Body>
       </Accordion.Item>
 
       
       <Accordion.Item eventKey="3">
  <Accordion.Header><b style={{fontSize:"15px"}}>Project Details</b></Accordion.Header>
  <Accordion.Body>
    <Form.Group as={Row} className="mb-3" controlId="formProjectName">
      <Form.Label className="form-label" column sm={2}>Project Name</Form.Label>
      <Col sm={10}>
        <Form.Control type="text" id="projectname" name="projectname"
          value={formData.projects.projectname}
          onChange={e => handleChange(e, 'projects')}
          placeholder="Project Name"
         
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formProjectDetails">
      <Form.Label className="form-label" column sm={2}>Description</Form.Label>
      <Col sm={10}>
        <Form.Control type="text" id="projectdetails" name="projectdetails"
          value={formData.projects.projectdetails}
          onChange={e => handleChange(e, 'projects')}
          placeholder="Description"
         
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formProjectSkills">
      <Form.Label className="form-label" column sm={2}>Key Skills</Form.Label>
      <Col sm={10}>
        <Form.Control type="text" id="projectskills" name="projectskills"
          value={formData.projects.projectskills}
          onChange={e => handleChange(e, 'projects')}
          placeholder="Key skills used in the project"
         
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formProjectURL">
      <Form.Label className="form-label" column sm={2}>Project URL</Form.Label>
      <Col sm={10}>
        <Form.Control type="text" id="projecturl" name="projecturl"
          value={formData.projects.projecturl}
          onChange={e => handleChange(e, 'projects')}
          placeholder="Project URL(optional)"
        />
      </Col>
    </Form.Group>
  </Accordion.Body>
</Accordion.Item>
 
 
       
<Accordion.Item eventKey="4">
 <Accordion.Header ><b style={{fontSize:"15px"}}>Certifications</b></Accordion.Header>
 
  <Accordion.Body>
    <Form.Group as={Row} className="mb-3" controlId="formCertificationName">
      <Form.Label className="form-label" column sm={2}>Certification Name</Form.Label>
      <Col sm={10}>
        <Form.Control type="text" id="certificationname" name="certificationname"
          value={formData.certifications.certificationname}
          onChange={e => handleChange(e, 'certifications')}
          placeholder="Certification Name"
         
        />
      </Col>
    </Form.Group>
    <Form.Group as={Row} className="mb-3" controlId="formCerificateURL">
      <Form.Label className="form-label" column sm={2}>Certificate URL</Form.Label>
      <Col sm={10}>
        <Form.Control type="text" id="certificateurl" name="certificateurl"
          value={formData.certifications.certificateurl}
          onChange={e => handleChange(e, 'certifications')}
          placeholder="Certificate URl"
        />
      </Col>
    </Form.Group>
    
    <Form.Group as={Row} className="mb-3" controlId="formCertificateFile">
                <Form.Label className="form-label" column sm={2}>Certificate File (PDF)</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    id="certificatefile"
                    name="certificatefile"
                    accept=".pdf"
                    onChange={e => handleChange(e, 'certifications')}
                  />
                  {formData.certifications.certificatePreviewUrl && (
                    <div style={{ marginTop: '10px' }}>
                      <a href={formData.certifications.certificatePreviewUrl} target="_blank" rel="noopener noreferrer">View Uploaded Certificate</a>
                    </div>
                  )}
                </Col>
              </Form.Group>
   
  </Accordion.Body>
</Accordion.Item>
<Accordion.Item eventKey="5">
            <Accordion.Header>
              <b style={{ fontSize: '15px' }}>Experience</b>
            </Accordion.Header>
            <Accordion.Body>
            <Form.Group as={Row} className="mb-3" controlId="formTypeOfExperience">
                <Form.Label className="form-label" column sm={2}>
                  Type of Experience
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    id="typeofexperience"
                    name="typeofexperience"
                    value={formData.experience.typeofexperience}
                    onChange={(e) => handleChange(e, 'experience')}
                  >
                    <option value="" disabled>Select type of experience...</option>
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formCompanyName">
                <Form.Label className="form-label" column sm={2}>
                  Company Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    id="companyname"
                    name="companyname"
                    value={formData.experience.companyname}
                    onChange={(e) => handleChange(e, 'experience')}
                    placeholder="Company Name"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formDesignation">
                <Form.Label className="form-label" column sm={2}>
                  Designation
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.experience.designation}
                    onChange={(e) => handleChange(e, 'experience')}
                    placeholder="Designation"
                  />
                </Col>
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formTotalExperienceYears">
                  <Form.Label className="form-label">Total Experience (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    id="totalExperienceYears"
                    name="totalExperienceYears"
                    value={formData.experience.totalExperienceYears}
                    onChange={(e) => handleChange(e, 'experience')}
                    placeholder="Years"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formTotalExperienceMonths">
                  <Form.Label className="form-label">Total Experience (Months)</Form.Label>
                  <Form.Control
                    type="number"
                    id="totalExperienceMonths"
                    name="totalExperienceMonths"
                    value={formData.experience.totalExperienceMonths}
                    onChange={(e) => handleChange(e, 'experience')}
                    placeholder="Months"
                  />
                </Form.Group>
              </Row>
              <Form.Group as={Row} className="mb-3" controlId="formWorkDescription">
                <Form.Label className="form-label" column sm={2}>
                  Job profile
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    id="workdescription"
                    name="workdescription"
                    value={formData.experience.workdescription}
                    onChange={(e) => handleChange(e, 'experience')}
                    placeholder="Work Description"
                    rows={3}
                  />
                </Col>
              </Form.Group>
             
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header><b style={{ fontSize: "15px" }}>Resume</b></Accordion.Header>
            <Accordion.Body>
              <Form.Group as={Row} className="mb-2" controlId="resume">
                <Form.Label className="form-label" column sm={2}>
                  Resume (PDF)
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={(e) => handleChange(e, 'resume')}
                  />
                  {formData.resume.resumePreviewUrl && (
                    <div style={{ marginTop: '10px' }}>
                      <a href={formData.resume.resumePreviewUrl} target="_blank" rel="noopener noreferrer">View Uploaded Resume</a>
                    </div>
                  )}
                </Col>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

 
<br/>
       
        <div  className="button-profile-container">
             <button className="reset-btn"type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="submit-btn" type="submit" >Save</button>
        </div>
       
       
      </Form >
     </Accordion>
    </div>
       
     
  );
};
 
 
export default ProfileForm;
