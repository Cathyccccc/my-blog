import instance from ".";

export const logOn = (data) => {
  return instance.post('/logon', data)
}