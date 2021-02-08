const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.YELP_API_URL, //'https://api.yelp.com/v3/',
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const axiosGet = (endpoint, params) => {
  return axiosInstance
    .get(endpoint, {
      params
    })
    .catch((error) => {
      // console.error(error);
      return error;
    });
};

const searchBusinesses = (term, category, location, offset, limit) => {
  return axiosGet('/businesses/search', { term, category, location, offset, limit });
};

const getBusiness = (alias) => {
  return axiosGet(`/businesses/${alias}`);
};

const getReviews = (alias) => {
  return axiosGet(`/businesses/${alias}/reviews`);
}

module.exports = {
  searchBusinesses,
  getBusiness,
  getReviews
};
