import React, { useEffect, useState } from 'react'
import IssueList from './IssueList';
import IssueDetail from './IssueDetail';

const UnallocatedTask = () => {
  const [issues, setIssues] = useState([]);
  const [issueDetail, setDetails] = useState(null);
  useEffect(() => {
    fetch('https://infinityserver.onrender.com/api/getUnallocIssue')
      .then(response => response.text())
      .then(data => {
        let obj = JSON.parse(data)
        if (obj) setIssues(obj);
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
      {issueDetail ? <IssueDetail issueDetail={issueDetail} showDetails={showDetails} />
        :
        <IssueList showDetails={showDetails} showIssueList={true} issueArr={issues} header={"List Of Unallocated Issues"} />}
    </div>
  )
}


export default UnallocatedTask;
