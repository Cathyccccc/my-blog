import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 50000,
  withCredentials: true,
});

instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

instance.interceptors.request.use(
  (config) => {
    // console.log(config);
    config.headers["Authorization"] = sessionStorage.getItem("token") || null; //- 获取token，并且设置到请求头里面
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  },
  (err) => console.log(err)
);

instance.interceptors.response.use(
  (resp) => {
    console.log(resp);
    // const token = resp.headers.get("Authentication");
    // console.log(resp.headers.has("Authentication"));
    // console.log("token", token);
    if (resp.data.success) {
      // if (resp.data.token) {
      //   sessionStorage.setItem("token", resp.data.token); //- 获取token，并且存储到sessionStorage里面
      //   // const token = res.headers.get('Authorization');
      //   // token && sessionStorage.setItem('token', token); //- 获取token，并且存储到sessionStorage里面
      // }
      // return resp.data;
      if (resp.data.data) {
        return resp.data.data;
      } else {
        return resp.data;
      }
    } else {
      console.log(resp.data);
      alert(resp.data.message);
      return resp.data;
    }
  },
  // alert(err.response.data.message || "网络异常，请稍后再试！")
  (err) => {
    if (err.response.data.message) {
      alert(err.response.data.message);
    }
    console.log(err);
  }
);

export default instance;
