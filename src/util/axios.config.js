import axios from "axios";


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    console.log("📡 发送请求, Token:", token);
    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { authorization } = response.headers
    authorization && localStorage.setItem("token",authorization)
    console.log("存入token")
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {status} = error.response
    if(status === 401){
      console.log('捕捉到401錯誤,消除token並跳回login')
      localStorage.removeItem("token")
      window.location.href="#/login"
    }
    return Promise.reject(error);
  });
