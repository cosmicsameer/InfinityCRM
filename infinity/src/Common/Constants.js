export const LOGIN_TYPE = { EMPLOYEE: 1, CUSTOMER: 2 };
export const LOGIN_LABEL = { 1: "Employee", 2: "Customer" };
export const PROD_AND_ISSUES = [
  { name: "Mobile Phone", issues: ["Broken Screen", "Faulty Camera", "Overheating Issue"] },
  { name: "TV", issues: ["Damaged Screen", "Discoloration Of Screen", "Adapter Issues"] },
  { name: "Refrigerator", issues: ["Panel Controls Broken", "Compressor Not Working", "Unable To Turn On"] },
  { name: "Washing Machine", issues: ["Water overflowing", "Motor not working"] },
];
export const CUST_LIST_HEADER = ["Issue Id", "Product", "Date of issue", "Issue List"];
export const EMP_LIST_HEADER = ["Issue Id", "Cust Name", "Product", "Date of issue", "Issue List", "Status", "Details"];
export const ISSUES_STATUS = ["In Progress", "On Hold", "Completed"];