import { LOGIN_TYPE } from "./Constants";

export const checkSession = (navigate) => {
  if (localStorage.getItem("token")) {
    let userType = localStorage.getItem("userType");
    let userId = localStorage.getItem("userId");
    if (parseInt(userType) === LOGIN_TYPE.CUSTOMER) navigate("/customer");
    else if (parseInt(userId) === 1) navigate("/admin");
    else navigate('/emp');
  }
}
export const getDateFromTs = (ts) => {
  let newDate = new Date(parseInt(ts));
  let dateString = newDate.getDate() + "/" + newDate.getMonth() + "/" + newDate.getUTCFullYear();
  return dateString;
}