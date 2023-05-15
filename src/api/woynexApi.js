import axios from 'axios';
import constants from '../common/constants';

const instance = axios.create({
  baseURL: constants.WoynexBackOfficeApiUrl, // https://test-backofficeapi.woynex.com
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Accept-Language': 'TR'
  }
});

instance.interceptors.request.use(
  config => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const { token } = parsedUser;
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
