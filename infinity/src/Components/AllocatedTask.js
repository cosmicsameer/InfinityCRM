import React, { useEffect, useState } from "react";
import IssueList from "./IssueList";

const AllocatedTask = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    fetch('https://infinityserver.onrender.com/api/getAllocIssue')
      .then(response => response.text())
      .then(data => {
        let obj = JSON.parse(data)
        if (obj) setIssues(obj);
        console.log(obj);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <IssueList showIssueList={true} issueArr={issues} alloc={true} header={"List Of Allocated Issues"} />
  );
}

export default AllocatedTask;