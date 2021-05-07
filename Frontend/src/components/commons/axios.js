import _axios from 'axios';

//Seting the baseURL
const axios = baseURL => {
  // const instance = _axios.create({
  //   baseURL:
  //     'http://localhost:5000',
  //   timeout: 5000
  // });

  const instance = _axios.create({
    baseURL:
      'https://ezbuy.site',
    timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      const jwToken = global.auth.getToken();
      config.headers['Authorization'] = 'Bearer ' + jwToken;
      // config.headers['Access-Control-Allow-Origin'] = '*'
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return instance;
};

export { axios };

export default axios();