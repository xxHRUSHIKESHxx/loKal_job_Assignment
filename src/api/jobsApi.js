import axios from 'axios';

const API_URL = 'https://testapi.getlokalapp.com/common/jobs?page=1';

export const fetchJobs = async (page) => {
  try {
    const response = await axios.get(`${API_URL}&page=${page}`);
    // console.log('jobs data' , response.data.results)
    return response.data.results;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
