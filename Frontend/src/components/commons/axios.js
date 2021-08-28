import _axios from 'axios';

//Seting the baseURL
const axios = baseURL => {
  const instance = _axios.create({
    baseURL:
      'http://18.144.1.165',
    timeout: 10000
  });

  // const instance = _axios.create({
  //   baseURL:
  //     'https://ezbuy.site',
  //   timeout: 5000
  // });

  instance.interceptors.request.use(
    config => {
      const jwToken = global.auth.getToken();
      config.headers['Authorization'] = 'Bearer ' + jwToken;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export { axios };

export default axios();
