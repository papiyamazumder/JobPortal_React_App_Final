import React, { useState } from 'react';
import './searchJob.css'
import { FaSearch } from "react-icons/fa";
import { SideBar } from '../Sidebar/sidebar';

function SearchJob({ jobs, setFilteredJobs }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredJobs = jobs.filter((job)=>
      job.name.toLowerCase().includes(keyword)||
      job.title.toLowerCase().includes(keyword)||
      job.location.toLowerCase().includes(keyword)
    );
    setFilteredJobs(filteredJobs);
    setSearch(keyword);
  };
  
  return (
    
      <form className='w-100 text-center'>
        <input  type='search' className='Searchbar'  
        value={search} onChange={handleSearch} placeholder="Search by company,location,title..." /> <FaSearch size='25px' />
      </form>
    
  );
}

export default SearchJob;