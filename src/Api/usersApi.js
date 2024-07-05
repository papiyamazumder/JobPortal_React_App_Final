// api/usersApi.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',  // Replace with your JSON Server URL
  timeout: 10000,  // Timeout in milliseconds (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

//#region Registration API
export const checkUserExists = async (email) => {
  try {
    const response = await instance.get(`/users?email=${email}`);
    return response.data.length > 0; // Return true if user with email exists, false otherwise
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await instance.post('/users', userData);
    return response.data;  // Assuming JSON Server returns created user data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;  // Optionally handle error as needed
  }
};
//#endregion

//#region login api
export const validateLogin = async (email, password) => {
  try {
    const response = await instance.get(`/users?email=${email}`);
    const users = response.data;
    // Find user with matching email
    const user = users.find(user => user.email === email);
    if (!user) {
      return false; // If user with email not found, return false
    }
    // Check if password matches
    return user.password === password;
  } catch (error) {
    console.error('Validate login error:', error);
    throw error;
  }
};

// Login user function to fetch user data upon successful login
export const loginUser = async (email) => {
  try {
    const response = await instance.get(`/users?email=${email}`);
    return response.data[0]; // Return user data upon successful login
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

//#endregion

//#region Profile Api
// Assuming `instance` is correctly configured Axios instance
export const getUserProfile = async (email) => {
  try {
    const response = await instance.get(`/profiles?email=${email}`);
    const profiles = response.data;

    // Find user with matching email
    const profile = profiles.find(profile => profile.basicDetails.email === email);

    if (!profile) {
      console.log("No user found with email:", email);
      return null; // Return null if user with email not found
    } else {
      console.log("User profile found:", profile);
      return profile; // Return the profile object if found
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Throw error to be handled in the calling component
  }
}


export const userProfile = async (formData) => {
  try {
    // Check if profile exists for the provided email
    const existingProfile = await getUserProfile(formData.basicDetails.email);

    if (existingProfile) {
      // If profile exists, update it using PUT request
      const response = await instance.put(`/profiles/${existingProfile.id}`, formData);
      console.log("Profile Updated:", response.data);
      return response.data; // Assuming JSON Server returns updated user data
    } else {
      // If profile does not exist, create it using POST request
      const response = await instance.post('/profiles', formData);
      console.log("Profile Created:", response.data);
      return response.data; // Assuming JSON Server returns created user data
    }
  } catch (error) {
    console.error('Error in Profile user:', error);
    throw error; // Optionally handle error as needed
  }
}

//#endregion

//#region Jobs Api
export const getJobs= async ()=>{
  try{
    const response = await instance.get(`/company`);
    return response.data;
  }catch (error){
    throw error
  }
}

export const getJobById= async(id)=>{
  try {
    const response = await instance.get(`/company?id=${id}`);
    return response.data[0]; // Assuming you fetch a single profile based on email
  } catch (error) {
    throw error; // Handle error in component where this function is called
  }
}
//#endregion

//#region applications Api
export const applyJob = async (companyEmail, jobId,userEmail,userProfileData) => {
  try {
    const response = await instance.post('/applications', { companyEmail, jobId,userEmail,userProfileData });
    console.log(response.data);
    return response.data; // Assuming your API returns some confirmation or data
    
  } catch (error) {
    throw error;
  }
}
//#endregion


export default instance;
