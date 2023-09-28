import axios from "axios";

const instance = axios.create({
  baseURL: 'https://mock.apifox.cn/m1/3317083-0-default',
  timeout: 1000,
})


instance.interceptors.request.use((config) => {
  // console.log(config);
  return config;
}, (err) => console.log(err))

instance.interceptors.response.use((resp) => {
  // console.log(resp)
  return resp.data;
}, (err) => console.log(err))

export default instance;