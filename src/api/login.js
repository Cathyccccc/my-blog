import instance from "./instance";

export const logIn = (data) => {
  return instance.post("/login", data);
};
