import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Adminhome from './pages/adminhome/Adminhome';
import Customer from './pages/customer/Customer';
import Appoinment from './pages/appoinment/Appoinment';
import Emp_details from './pages/emp_details/Emp_details';
import Emp_attendance from './pages/emp_attendance/Emp_attendance';
import Emp_salary from './pages/emp_salary/Emp_salary';
import Emp_leaves from './pages/emp_leaves/Emp_leaves';


function App() {


  return (

    <BrowserRouter>
      <Header />


      <div className='main'>
        <Routes>

          <Route path='/adminhome' Component={Adminhome}></Route>
          <Route path='/customer' Component={Customer}></Route>
          <Route path='/appoinment' Component={Appoinment}></Route>
          <Route path='/emp_details' Component={Emp_details}></Route>
          <Route path='/emp_attendance' Component={Emp_attendance}></Route>
          <Route path='/emp_salary' Component={Emp_salary}></Route>
          <Route path='/emp_leaves' Component={Emp_leaves}></Route>

        </Routes>

      </div>

      <Sidebar />

    </BrowserRouter>
  );
}

export default App;
