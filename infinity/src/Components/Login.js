import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { LOGIN_LABEL, LOGIN_TYPE } from '../Common/Constants';
import { checkSession } from '../Common/Common';
import PopUp from './PopUp';

const Login = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPopUp, setPopUp] = useState(false);
  const loginType = localStorage.getItem("userType");
  let popUpMessage = "Not authenticated, Please try with a valid login"

  useEffect(() => { checkSession(navigate) }, []);

  const callLoginApi = (dataToSend) => {
    fetch("https://infinityserver.onrender.com/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: dataToSend })
    })
      .then(response => {
        if (response.status === 200) {
          if (parseInt(loginType) === parseInt(LOGIN_TYPE.CUSTOMER)) navigate("/customer");
          return response.json();
        } else {
          setPopUp(true);
        }
      })
      .then(data => {
        if (data.token) localStorage.setItem('token', data.token)
        if (data.id) localStorage.setItem("userId", data.id);
        if (parseInt(loginType) === parseInt(LOGIN_TYPE.EMPLOYEE) && data.token) {
          if (data.id === 1) navigate("/admin");
          else navigate("/emp");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleSumbit = () => {
    let dataToSend = { name: name, password: password, loginType: loginType };
    if (!name || name === "") { setError("Username missing"); return; }
    else if (!password || password === "") { setError("password missing"); return }
    else if (error) setError(null);
    callLoginApi(dataToSend);
  }

  return (
    <div>
      {showPopUp && <PopUp onClick={() => setPopUp(false)} buttonLabel={"Okay"} content={popUpMessage} />}
      <div style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>{"Welcome " + LOGIN_LABEL[loginType] + " to the login page"}</div>
      <div style={{ marginTop: 50, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", marginTop: 20 }}>
            <div style={{ fontSize: 30, marginRight: 20 }}>UserName</div>
            <input onChange={(e) => { setName(e.target.value) }} style={{ borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} type="text" />
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", marginTop: 20 }}>
            <div style={{ fontSize: 30, marginRight: 20 }}>Password</div>
            <input onChange={(e) => { setPassword(e.target.value) }} style={{ borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} type="password" />
          </div>
          <div style={{ textTransform: "uppercase", borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35, marginTop: 20 }} onClick={() => handleSumbit()}>Submit</div>
          <div style={{ textAlign: "center", color: "red", margin: 10 }}>{error}</div>
        </div>
      </div>
    </div>
  )
}


export default Login;