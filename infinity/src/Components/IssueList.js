import React from 'react'
import { styles } from '../Styles/CustomerStyle';
import { getDateFromTs } from '../Common/Common';
import { EMP_LIST_HEADER, LOGIN_TYPE, CUST_LIST_HEADER } from '../Common/Constants';
const IssueList = (props) => {
  const userId = parseInt(localStorage.getItem("userId"));
  const userType = parseInt(localStorage.getItem("userType"));
  let userListHeader = [];
  if (userType === LOGIN_TYPE.EMPLOYEE) {
    if (userId === 1 && props.alloc) {
      userListHeader = ["Emp Id ", "Emp Name ", ...EMP_LIST_HEADER];
      userListHeader.pop()
    }
    else userListHeader = [...EMP_LIST_HEADER];
  } else userListHeader = [...CUST_LIST_HEADER];

  const showDetails = (data) => {
    props.showDetails(data);
  }

  if (props.showIssueList)
    return (
      <div style={{ borderRadius: 15, borderWidth: 5, borderStyle: "solid", padding: 20, margin: 20 }}>
        <div style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>{props.header}</div>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: 20, padding: 10, borderRadius: 10, borderStyle: "solid", borderWidth: 5 }}>
          {userListHeader.map((header) => (<div key={header} style={{ ...styles.issueBlock, backgroundColor: "pink" }}>{header}</div>))}
        </div>
        {
          props.issueArr && props.issueArr.map((item, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", margin: 20, padding: 10, borderRadius: 10, borderStyle: "solid", borderWidth: 5 }}>
              {userType === LOGIN_TYPE.EMPLOYEE && userId === 1 && props.alloc && <div style={styles.issueBlock}>{item.empId}</div>}
              {userType === LOGIN_TYPE.EMPLOYEE && userId === 1 && props.alloc && <div style={styles.issueBlock}>{item.empName}</div>}
              <div style={styles.issueBlock}>{item.id}</div>
              {userType === LOGIN_TYPE.EMPLOYEE && <div style={styles.issueBlock}>{item.custName}</div>}
              <div style={styles.issueBlock}>{item.prod}</div>
              <div style={styles.issueBlock}>{getDateFromTs(item.date)}</div>
              <div style={styles.issueBlock}>{item.issues.map((issue) => ("(" + issue + ")\n"))}</div>
              {userType === LOGIN_TYPE.EMPLOYEE && <div style={styles.issueBlock}>{item.status ? item.status : "Pending"}</div>}
              {userType === LOGIN_TYPE.EMPLOYEE && !props.alloc && < div style={{ ...styles.issueBlock, backgroundColor: "tomato" }} onClick={() => showDetails(item)}>Show Detail</div>}
            </div >))
        }
      </div >
    );
  else return null;
}
export default IssueList;