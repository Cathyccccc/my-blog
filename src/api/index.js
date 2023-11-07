import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 50000,
  withCredentials: true,
})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


instance.interceptors.request.use((config) => {
  // console.log(config);
  return config;
}, (err) => console.log(err))

instance.interceptors.response.use((resp) => {
  // console.log(resp)
  if(resp.data.success) {
    return resp.data.data;
  }else {
    console.log(resp.data)
    return resp.data;
  }
  
}, (err) => console.log(err))

export default instance;