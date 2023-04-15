import React, { useEffect, useState } from 'react'
import DropOption from '../Components/DropOption';
import { styles } from '../Styles/CustomerStyle';
import { PROD_AND_ISSUES } from '../Common/Constants';
import IssueList from '../Components/IssueList';
import Logout from '../Components/Logout';
import PopUp from '../Components/PopUp';
import { useNavigate } from 'react-router-dom';
const Customer = () => {
  let selectedIssues = {};
  const [showPastIssues, setShowPast] = useState(false);
  const [openProductDropDown, setProductDrop] = useState(false);
  const [selectedOption, setSelectedOpt] = useState(null);
  const [openIssueDropDown, setOpenIssueDrop] = useState(false);
  const [issueArr, setIssueArr] = useState(null);
  const [selectedIssuesState, setSelectedIssue] = useState([]);
  const [custIssues, setCustIssues] = useState([]);
  const [showForm, setFormDisplay] = useState(false);
  const [error, setError] = useState("")
  const [showPopUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const popUpMessage = "Your response is submitted successfully"
  let desc = null;


  useEffect(() => {
    if (parseInt(localStorage.getItem("userType")) !== 2 || !localStorage.getItem("token")) {
      navigate("/")
      return;
    }
    fetch('https://infinityserver.onrender.com/api/getCustIssues/?custId=' + userId)
      .then(response => response.text())
      .then(data => {
        let obj = JSON.parse(data)
        if (obj && obj.issues) setCustIssues(obj.issues);
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  const onSubmitForm = () => {
    let dataToSend = { custId: userId, issues: selectedIssuesState, desc: desc, prod: selectedOption ? selectedOption.name : null };
    if (!dataToSend.prod) {
      setError("Please select a product");
      return;
    }
    else if (!dataToSend.issues || dataToSend.issues.length === 0) {
      setError("Please select alteast one issue");
      return;
    }
    else if (!desc) {
      setError("pls fill description")
      return;
    };
    setError("");

    fetch("https://infinityserver.onrender.com/api/submitIssue", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: dataToSend })
    })
      .then(response => {
        if (response.status === 200) {
          setPopUp(true)
        }
        return response.json();
      })
      .then(data => console.log("-->", data))
      .catch(error => { console.error(error) }
      );
  }

  const handleIssueSelect = () => {
    let issueToSend = [];
    let arr = Object.keys(selectedIssues);
    for (let i = 0; i < arr.length; i++) {
      if (selectedIssues[arr[i]]) issueToSend.push(arr[i]);
    }
    setOpenIssueDrop(false);
    setSelectedIssue(issueToSend);
  }

  const setOption = (val, arr) => {
    setSelectedOpt(val);
    setProductDrop(false);
    setIssueArr(arr);
    setOpenIssueDrop(true);
    setSelectedIssue([]);
  }

  const CustForm = () => {
    return (
      <div>
        <div onClick={() => setFormDisplay(!showForm)} style={styles.headers}>add new issue </div>
        {showForm && <div style={styles.formCont}>

          <div style={styles.productDropDown(openProductDropDown)} onClick={() => { setProductDrop(!openProductDropDown) }}>{selectedOption ? selectedOption.name : "Select product"}</div>

          {openProductDropDown && <div style={styles.openDropDown}>
            {PROD_AND_ISSUES.map((option) => (<DropOption setOption={setOption} multiSelect={false} option={option} issueArr={option.issues} />))}
          </div>}

          <div style={styles.issueDropCont(openIssueDropDown)} onClick={() => { setOpenIssueDrop(!openIssueDropDown) }}>
            <div> {selectedIssuesState.length > 0 ? selectedIssuesState.map((issue) => (issue + " | ")) : "Select Issue"}</div>
            {openIssueDropDown && <div style={styles.issueDropDown} onClick={() => { handleIssueSelect() }}>Done</div>}
          </div>

          {openIssueDropDown && issueArr && issueArr.length > 0 && <div style={styles.openDropDown}>
            {issueArr && issueArr.map((option) => (<DropOption setOption={setOption} multiSelect={true} selectedItem={selectedIssues} option={option} />))}
          </div>}

          <textarea placeholder='enter your issue description here' onChange={(e) => { desc = e.target.value }} style={styles.textArea}></textarea>

          <div style={styles.custSumButton} onClick={() => onSubmitForm()}>Submit</div>
          <div style={{ textAlign: "center", color: "red", margin: 10 }}>{error}</div>
        </div>}
      </div>)
  }

  return (
    <div>
      {showPopUp && <PopUp onClick={() => setPopUp(false)} buttonLabel={"Okay"} content={popUpMessage} />}
      <Logout />
      <div style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>Hello Customer!</div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <div style={{ width: "60%" }}>
          <div onClick={() => setShowPast(!showPastIssues)} style={styles.headers}>show past issues</div>
          <IssueList showIssueList={showPastIssues} issueArr={custIssues} header={"List Of Past Issues"} />
        </div>
        <CustForm />
      </div>
    </div>
  )
}

export default Customer;





