import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Logout from '../Components/Logout';

const Admin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token") || parseInt(localStorage.getItem("userId")) !== 1 || parseInt(localStorage.getItem("userType")) !== 1) navigate("/");
  }, [])
  const handlePress = (val) => {
    if (val === "alloc") navigate("/alloc");
    else if (val === "unalloc") navigate("/unalloc")
    else if (val === "selfIssued") navigate("/emp");
  }
  return (
    <div>
      <Logout />
      <div style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>Welcome back Admin!</div>
      <div style={{ textAlign: "center", fontSize: 25, fontWeight: "bold", marginTop: 30 }}>Please identify the tasks you want to see</div>\
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 50 }}>
        <div style={{ textTransform: "uppercase", borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} onClick={() => handlePress("unalloc")}>unallocated</div>
        <div style={{ textTransform: "uppercase", borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} onClick={() => handlePress("alloc")}>allocated</div>
        <div style={{ textTransform: "uppercase", borderStyle: "solid", borderWidth: 5, borderRadius: 15, padding: 10, fontSize: 35 }} onClick={() => handlePress("selfIssued")}>My issues</div>
      </div>
    </div>
  )
}

export default Admin;

