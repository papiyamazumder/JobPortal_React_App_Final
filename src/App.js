import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Jobs from "./components/Jobs/Jobs";
import JobDetails from "./components/JobDetails/jobDetails";
import { Nav, Navbar, Container } from "react-bootstrap";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoBriefcase } from "react-icons/io5";
import ApplyForm from "./components/ApplyForm/ApplyForm";
import ApplyFormSubmit from "./components/ApplyForm/ApplyFormSubmit";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Form from "./pages/Registration/Form.jsx";
import { MdLogin } from "react-icons/md";
import { AuthProvider, useAuth } from "./Auth/AuthProvider.jsx";
import PrivateRoute from "./Auth/PrivateRoute.jsx";
import Logout from "./pages/Logout/Logout.jsx";
import { IoLogOut } from "react-icons/io5";
import Display from "./components/Profile/Display.js";
import JobPostingForm from "./Admin/JobPost/JobPostingForm.js";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminSideBar from "./Admin/Admin-Sidebar/AdminSideBar.js";
import DisplayJobs from "./Admin/DisplayJobs/DisplayJobs.js";
 
 
function NavbarLinks() {
  const { isAuthenticated,userRole, logout } = useAuth();
  console.log("Hello")
 console.log(userRole)
  return (
    <Nav className="justify-content-end" variant="underline">
      {isAuthenticated && userRole === "user" && (
        <>
          <Nav.Link as={Link} to="/jobs" className="nav-link-icons">
            <IoBriefcase color="white" size={20} />
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" className="nav-link-icons">
            <RiAccountCircleFill color="white" size={22} />
          </Nav.Link>
          <Nav.Link as={Link} to="/logout" onClick={logout} className="nav-link-icons">
            <IoLogOut color="white" size={22} />
          </Nav.Link>
        </>
      )}
      {isAuthenticated && userRole === "admin" && (
        <AdminSideBar/>
      )}      
      {!isAuthenticated && (
        <>
 
          <Nav.Link as={Link} to="/login" className="login-box">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/registration" className="register-box">
            Register
          </Nav.Link>
        </>
      )}
    </Nav>
  );
}
 
function App() {
 
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar className="navbar-container" data-bs-theme="dark">
            <Container>
              <Navbar.Brand >
                JobPortal
              </Navbar.Brand>
              <NavbarLinks />
            </Container>
          </Navbar>
 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registration" element={<Form />} />
            <Route path="/logout" element={<Logout />} />
         
          <Route element={<PrivateRoute/>}>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile/:id/:companyEmail/:fromJobDetails" element={<Display/>} />
            <Route path="/profile" element={<Display/>}/>
            <Route path="/submit" element={<ApplyFormSubmit />} />
            <Route path="/job/:id" element={<JobDetails/>} />
            <Route path="/postJob" element={<JobPostingForm />} />
            <Route path="/postJob/:id" element={<JobPostingForm />} />
            <Route path="/admindashboard" element={<AdminDashboard/>}/>
            <Route path="/viewJobs" element={<DisplayJobs/>} />           
          </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}
 
export default App;