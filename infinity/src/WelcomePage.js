import React, { useEffect } from 'react'
import { LOGIN_TYPE } from './Common/Constants';
import { useNavigate } from "react-router-dom";
import { checkSession } from './Common/Common';
function WelcomePage() {
  const navigate = useNavigate();
  const handlePress = (val) => {
    localStorage.setItem('userType', val)
    navigate("/login")
  }

  useEffect(() => { checkSession(navigate) }, []);

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>Hi, welcome to the Market!</div>
      <div style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginTop: 30 }}>Please identify yourself by clicking as a customer or an employee</div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 50 }}>
        <div style={{ textTransform: "uppercase", borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} onClick={() => handlePress(LOGIN_TYPE.CUSTOMER)}>customer</div>
        <div style={{ textTransform: "uppercase", borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} onClick={() => handlePress(LOGIN_TYPE.EMPLOYEE)}>Employeee</div>
      </div>
    </div>
  );
}

export default WelcomePage;