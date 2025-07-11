import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Realtime from './components/Realtime/Realtime';
import Report from './components/Report/Report';
import Billing from './components/Billing/Billing';
import Assignmeter from './components/Assignmeter/Assignmeter';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Costev from './components/Billing/Costev';
import Login from "./components/Login/Login";
import Sidebar from './components/Sidebar/Sidebar';
import Graphpage from './components/Realtime/Graphpage';
import Assign from './components/Billing/Assign';
import Listassign from './components/Assignmeter/Listassign';
import Reportexcel from './components/Report/Reportexcel';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/sidebar' element={<Sidebar />}>
            <Route path='/sidebar/dashboard' element={<Dashboard />}> </Route>
            <Route path='/sidebar/realtime' element={<Realtime />}></Route>
            <Route path="/sidebar/graph" element={<Graphpage />} />
            <Route path='/sidebar/report' element={<Report />}> </Route>
            <Route path='/sidebar/reportexcel' element={<Reportexcel />}> </Route>
            <Route path='/sidebar/billing' element={<Billing />}> </Route>
            <Route path='/sidebar/costev' element={<Costev />}> </Route>
            <Route path='/sidebar/assigncost' element={<Assign />}> </Route>
            <Route path='/sidebar/assignmeter' element={<Assignmeter />}> </Route>
            <Route path='/sidebar/listassign' element={<Listassign />}> </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
