import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return {"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGUzMGUxOGQ2YWQ0Yzc2MmNjZGYzM2UiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAYXBwc2VlZC51cyIsInBhc3N3b3JkIjoiJDJhJDEwJHFZNkpDMzgvTnZ4WFp6cjRaN1NUOS5EUlFIU1g4RXVWclFNZUlvY1lvd0hueXVkZDlMQmEuIiwiZGF0ZSI6IjIwMjEtMDctMDVUMTM6NTA6MTYuNDE5WiIsIl9fdiI6MCwiaWF0IjoxNjQ3NTU0NTE3LCJleHAiOjE2NDc2NDA5MTd9.7WtumgpulQlJbSRH4ALX8MpnolSoAbkOZtnByJ3ZDI8","user":{"_id":"60e30e18d6ad4c762ccdf33e","username":"test","email":"test@appseed.us","date":"2021-07-05T13:50:16.419Z","__v":0}}
  };

  static Register = (data) => {
    return axios.post(`${base}/register`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } } );
  };
}

let base = "users";

export default AuthApi;
