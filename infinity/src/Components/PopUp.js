import React from 'react';
const PopUp = (props) => {
  return (
    <div style={{
      width: 600,
      height: 300,
      backgroundColor: "yellow",
      position: "fixed",
      top: "30%",
      left: "30%",
      transform: "translate(-50 %, -50 %)",
      borderRadius: 20, borderWidth: 10, borderStyle: "solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ textAlign: "center", margin: 20, fontSize: 30, fontWeight: "bold" }}>{props.content}</div>
      <div onClick={props.onClick} style={{ backgroundColor: "green", color: "white", padding: 10, borderRadius: 4, maxWidth: 100, margin: 20, textTransform: "uppercase" }}>{props.buttonLabel}</div>
    </div>

  )
};
export default PopUp;