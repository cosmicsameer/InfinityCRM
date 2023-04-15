import React, { useEffect, useState } from 'react'
import DropOption from './DropOption'
import { styles } from '../Styles/CustomerStyle';
import { getDateFromTs } from '../Common/Common';
import { ISSUES_STATUS } from '../Common/Constants';

const IssueDetail = (props) => {
  const [openEmployeeList, setOpenEmpList] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState("")
  const [arr, setArr] = useState([]);
  useEffect(() => {
    console.log(props.issueDetail);
    if (props.issueDetail && props.issueDetail.assigned === "YES") {
      setArr(ISSUES_STATUS);
    } else {
      fetch('https://infinityserver.onrender.com/api/getemp')
        .then(response => response.text())
        .then(data => {
          let arr = JSON.parse(data)
          if (arr) setArr([...arr]);
        })
        .catch(error => {
          console.error(error);
        });

    }
  }, []);


  const setOption = (val) => {
    console.log(val);
    setOpenEmpList(false);
    setSelectedOption(val);
  }
  const closeDetail = () => {
    props.showDetails(null);
  }
  const allocateIssue = () => {
    if (!selectedOption || !selectedOption.id) {
      setError("Please select an employee from the list and assign");
      return;
    }

    let dataToSend = {};
    dataToSend.issueId = props.issueDetail.id;
    dataToSend.id = selectedOption.id;
    dataToSend.custId = props.issueDetail.custId;
    dataToSend.empName = selectedOption.name;

    fetch("https://infinityserver.onrender.com/api/assignIssue", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: dataToSend })
    })
      .then(response => {
        if (response.status === 200) {
          window.location.reload()
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => { console.error(error) });

  }


  const changeStatus = () => {
    if (!selectedOption) {
      setError("Please select a status from the list and submit");
      return;
    }

    let dataToSend = {};
    dataToSend.issueId = props.issueDetail.id;
    dataToSend.id = parseInt(localStorage.getItem("userId"));
    dataToSend.custId = props.issueDetail.custId;
    dataToSend.status = selectedOption;
    window.location.reload();
    return;

    fetch("https://infinityserver.onrender.com/api/changeIssueStatus", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: dataToSend })
    })
      .then(response => {
        if (response.status === 200) {
          window.location.reload()
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => { console.error(error) });
  }

  return (
    <div>
      <div style={{ ...styles.issueBlock, backgroundColor: "tomato" }} onClick={() => closeDetail()} >GO BACK</div>
      <div style={{ ...styles.formCont, width: 700 }}>
        <div style={{ textAlign: "center", margin: 20, fontWeight: "bold", textTransform: "uppercase" }}>issue Details</div>
        <div style={styles.issueDetail}>Name: {props.issueDetail.custName}</div>
        <div style={styles.issueDetail}>Product: {props.issueDetail.prod}</div>
        <div style={styles.issueDetail}>Issues: {props.issueDetail.issues.map((issues) => ("(" + issues + ")"))}</div>
        <div style={styles.issueDetail}>Date: {getDateFromTs(props.issueDetail.date)}</div>
        <div style={styles.issueDetail}>Description: {props.issueDetail.desc}</div>
        <div style={{ borderBottomLeftRadius: !openEmployeeList ? 15 : 0, padding: 10, fontSize: 20, borderTopRightRadius: 15, borderTopLeftRadius: 15, borderWidth: 5, borderStyle: "solid", width: 200, marginTop: 40, marginLeft: 40 }}
          onClick={() => { setOpenEmpList(!openEmployeeList) }}>{selectedOption ? props.issueDetail.assigned === "YES" ? selectedOption : selectedOption.name : "Select"}</div>
        {openEmployeeList && <div style={{ borderWidth: 5, borderTopWidth: 0, padding: 10, borderStyle: "solid", marginLeft: 40, width: 200 }}>
          {arr.map((option) => (<DropOption key={option.id} setOption={setOption} multiSelect={false} option={option} />))}
        </div>}
        <div style={{ ...styles.issueBlock, backgroundColor: "tomato", margin: 40 }} onClick={() => props.issueDetail.assigned === "YES" ? changeStatus() : allocateIssue()} > {props.issueDetail.assigned === "YES" ? "change status" : "Assign"}</div>
        <div style={{ textAlign: "center", color: "red", margin: 10 }}>{error}</div>
      </div>
    </div>
  )

}


export default IssueDetail;
