import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div onClick={() => onLogout()} style={{ padding: 10, borderWidth: 5, borderStyle: "solid", fontWeight: "bold", backgroundColor: "red", color: "white", borderRadius: 10 }}>
      Logout
    </div>
  );
}

export default Logout;