import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    PermanentAddress: "",
    contactNumber: "",
    Cgpa: "",
    skills: "",
    Resume: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactNumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: digitsOnly,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      Resume: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      Firstname: "",
      Lastname: "",
      email: "",
      PermanentAddress: "",
      contactNumber: "",
      Cgpa: "",
      skills: "",
      Resume: null,
    });
    navigate("/submit");
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-card-body">
          <h2 className="form-card-title">Job Application Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Firstname">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="Firstname"
                  placeholder="Firstname"
                  value={formData.Firstname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Lastname">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="Lastname"
                  placeholder="Lastname"
                  value={formData.Lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="form-radio-group">
                <input
                  className="form-radio-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="Male"
                  required
                />
                <label className="form-radio-label" htmlFor="inlineRadio1">
                  Male
                </label>
                <input
                  className="form-radio-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                  value="Female"
                  required
                />
                <label className="form-radio-label" htmlFor="inlineRadio2">
                  Female
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="PermanentAddress">Permanent Address</label>
              <input
                type="text"
                className="form-control"
                name="PermanentAddress"
                placeholder="Permanent Address"
                value={formData.PermanentAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="form-control"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="qualification">Highest Qualification</label>
              <select
                className="form-select"
                name="qualification"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select your qualification
                </option>
                <option value="B.E/B.Tech">B.E/B.Tech</option>
                <option value="BCA/B.sc">BCA/B.sc</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Cgpa">CGPA/Percentage</label>
              <input
                type="text"
                className="form-control"
                name="Cgpa"
                placeholder="CGPA"
                value={formData.Cgpa}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <select
                className="form-select"
                name="experience"
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Select your experience
                </option>
                <option value="0-1 years">0-1 years</option>
                <option value="2-3 years">2-3 years</option>
                <option value="3-4 years">3-4 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                className="form-control"
                name="skills"
                placeholder="Skills"
                value={formData.skills}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Resume" className="form-label">Resume</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="form-submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
