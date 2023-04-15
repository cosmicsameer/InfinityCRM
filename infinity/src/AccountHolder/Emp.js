import React, { useEffect, useState } from 'react'
import IssueList from '../Components/IssueList';
import IssueDetail from '../Components/IssueDetail';
import Logout from '../Components/Logout';
import { useNavigate } from 'react-router-dom';

const Emp = () => {
  const [issues, setIssues] = useState([]);
  const [issueDetail, setDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (parseInt(localStorage.getItem("userType")) !== 1 || !localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    fetch('https://infinityserver.onrender.com/api/getEmpDataById?empId=' + parseInt(localStorage.getItem("userId")))
      .then(response => response.text())
      .then(data => {
        let obj = JSON.parse(data)
        if (obj) setIssues(obj.issues);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const showDetails = (data) => {
    setDetails(data);
  }
  return (
    <div>
      <Logout />
      {issueDetail ? <IssueDetail issueDetail={issueDetail} showDetails={showDetails} />
        :
        <IssueList showDetails={showDetails} showIssueList={true} issueArr={issues} header={"List Of Assigned Issues"} />}
    </div>
  )
}
export default Emp;