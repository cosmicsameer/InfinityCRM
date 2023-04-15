import WelcomePage from "./WelcomePage";
import Login from "./Components/Login";
import Customer from "./AccountHolder/Customer";
import Admin from "./AccountHolder/Admin";
import UnallocatedTask from "./Components/UnallocatedTask";
import IssueDetail from "./Components/IssueDetail"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllocatedTask from "./Components/AllocatedTask";
import Emp from "./AccountHolder/Emp";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/unalloc" element={<UnallocatedTask />} />
        <Route path="/issueDetail" element={<IssueDetail issueDetail={{}} />} />
        <Route path="/alloc" element={<AllocatedTask />} />
        <Route path="/emp" element={<Emp />} />
      </Routes>
    </Router>
  );
}

export default App;
