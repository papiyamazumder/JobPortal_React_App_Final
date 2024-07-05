import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',  // Replace with your JSON Server URL
  timeout: 10000,  // Timeout in milliseconds (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postAJob = async (companyId, jobData) => {
  try {
      if (companyId) {
          // Update existing job
          const response = await instance.put(`/company/${companyId}`, jobData);
          return response.data;
      } else {
          // Post new job
          const response = await instance.post('/company', jobData);
          return response.data;
      }
  } catch (error) {
      console.error('Error posting/updating job:', error);
      throw error;
  }
};
 
export const getId = async() => {
    try{
        const response=await instance.get('/company');
        const company=response.data;
        const maxId = company.length > 0 ? Math.max(...company.map(c => c.id)) : 1;
        return maxId;
    } catch(error){
        console.error(error);
        throw error;
    }
}
 
 // Adjust the import as per your project structure
 
 export const getCompanyDataByEmail = async (adminEmail) => {
  try {
      const response = await instance.get(`/company`);
      const companies = response.data;
 
      // Filter companies based on the adminEmail in contactInfo
      const filteredCompanies = companies.filter(company => company.contactInfo.email === adminEmail);
       console.log(filteredCompanies)
      return filteredCompanies;
  } catch (error) {
      console.error('Error fetching company data by email:', error);
      throw error;
  }
};
 
export const getCompanyById = async (companyId) => {
  try {
      const response = await instance.get(`/company/${companyId}`);
      return response.data;
  } catch (error) {
      console.error('Error fetching company by ID:', error);
      throw error;
  }
};
 
 
export const deleteJob = async (companyId) => {
  try {
      const response = await instance.delete(`/company/${companyId}`);
      console.log(response.data)
      return response.data;
  } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
  }
};
 
 
 
 
export default instance;
