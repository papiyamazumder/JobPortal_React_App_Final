import React, { useEffect,useState } from 'react';
import { useNavigate ,useParams} from 'react-router-dom';
import { getCompanyById,postAJob,getId } from '../../Api/adminApi';
import { useAuth } from '../../Auth/AuthProvider';
import'./jobPosting.css';
 
const JobPostingForm = () => {
  const { userEmail } = useAuth();
    const navigate=useNavigate()
    const { id } = useParams();
  const [formData, setFormData] = useState({
    id: null,
    logo: null,
    name: '',
    title: '',
    location: '',
    modeOfWork: '',
    jobType: '',
    vacancy: '',
    salary: '',
    aboutCompany: '',
    description: '',
    responsibility: '',
    qualifications: '',
    experience: '',
    skillsRequired: '',
    contactInfo: {
      email: userEmail,
      phone: ''
    },
    postedAt: ''
  });
  useEffect(() => {
    const fetchCompanyDetails = async () => {
        try {
            const companyDetails = await getCompanyById(id);
            setFormData(companyDetails);
        } catch (error) {
            console.error('Error fetching company details:', error);
        }
    };
 
    if (id) {
        fetchCompanyDetails();
    }
}, [id]);
 
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
 
     if (name.includes('.')) {
      const [parentKey, nestedKey] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [nestedKey]: files ? files[0] : value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: files ? files[0] : value
      }));
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const currentDate = new Date(); // Get current date
        const formattedDate = currentDate.toISOString(); // Format date as ISO string

        const newJobData = {
            ...formData,
            id: null, // Assuming this is set by your API or backend
            postedAt: formattedDate // Add current date to formData
        };

        if (id) {
            // Update existing job
            await postAJob(id, newJobData);
            alert('Job updated successfully!');
        } else {
            // Post new job
            const lastId = await getId();
            newJobData.id = String(lastId + 1);
            await postAJob(null, newJobData);
            alert('Job posted successfully!');
        }

        navigate('/viewJobs');
    } catch (error) {
        console.error('Error posting/updating job:', error);
        // Optionally handle specific errors or display error messages
    }
};

  return (
    <div className="job-post-container">
      <form className="form" onSubmit={handleSubmit}>
      <div className="row g-3">
  <div className="col">
  <div className="form-floating mb-3">
     
      <input
        type="text"
        className="form-control"
        name="logo"
        onChange={handleChange}
         placeholder='image'
      />
       <label htmlFor="floatingInput">Logo</label>
    </div>
  </div>
</div>
 
        <div className="row g-3">
          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
              placeholder=''
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="floatingInput">Company Name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <label>Job Title</label>
            </div>
          </div>
        </div>
 
        <div className="row g-3">
          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <label>Location</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating mb-3">
              <select
               
                className="form-control"            
                name="modeOfWork"
                placeholder="Mode of work"
                value={formData.modeOfWork}
                onChange={handleChange}
                required
              >
                 <option value="" disabled hidden ></option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
                <option value="Remote">Remote</option>
                </select>
                <label htmlFor="floatingInput">Mode of Work</label>
            </div>
          </div>
        </div>
 
        <div className="row g-3">
          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Job Type"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
              />
              <label>Job Type</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Vacancy"
                name="vacancy"
                value={formData.vacancy}
                onChange={handleChange}
                required
              />
              <label>Vacancy</label>
            </div>
          </div>
        </div>
 
        <div className="row g-3">
          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
              <label>Salary</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                placeholder="Contact Email"
                name="contactInfo.email"
                value={formData.contactInfo.email}
                onChange={handleChange}
                required
              />
              <label>Contact Email</label>
            </div>
          </div>
        </div>
 
        <div className="row g-3">
          <div className="col">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Contact Phone"
                name="contactInfo.phone"
                value={formData.contactInfo.phone}
                onChange={handleChange}
                required
              />
              <label>Contact Phone</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="About Company"
                name="aboutCompany"
                value={formData.aboutCompany}
                onChange={handleChange}
                required
              />
              <label>About Company</label>
            </div>
          </div>
        </div>
 
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>Job Description</label>
        </div>
 
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Responsibility"
            name="responsibility"
            value={formData.responsibility}
            onChange={handleChange}
            required
          />
          <label>Responsibility</label>
        </div>
 
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          />
          <label>Qualifications</label>
        </div>
 
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <label>Experience</label>
        </div>
 
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Skills Required"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            required
          />
          <label>Skills Required</label>
        </div>
 
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
 
export default JobPostingForm;
