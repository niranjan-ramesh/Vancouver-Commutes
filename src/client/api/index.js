import axios from 'axios';

// Health APIs
export const getHealthAPI = async () => {
  const response = await axios.get('/api/health');
  return response.data;
};
