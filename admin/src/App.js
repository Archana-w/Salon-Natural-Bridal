import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Supplier from './pages/supplier/supplier'; 
import Customer from './pages/customer/Customer';
import Salary from './pages/salary/Salary';
import Appointment from './pages/appointment/Appointment';
import { useAuthToken } from './auth';
import SignOut from './pages/signout/SignOut';
import Emp_details from './pages/emp_details/Emp_details';
import Emp_attendance from './pages/emp_attendance/Emp_attendance';
import Emp_salary from './pages/emp_salary/Emp_salary';
import Emp_leaves from './pages/emp_leaves/Emp_leaves';
import Orders from './pages/orders/Orders';
import OrderList from './pages/OrderList/OrderList';
import AddEmp from './pages/add_emp/AddEmp';

function App() {
  var token = useAuthToken();
  if (token == null) {
    return (
      <>
        You can not access directly...
      </>
    );
  }

  return (
    <BrowserRouter>
      <Header />

      <div className='main'>
        <Routes>

          <Route path="/salary" Component={Salary} />
          <Route path="/signout" Component={SignOut} />
          <Route path='/supplier' Component={Supplier}></Route> 
          <Route path="/sup-orders/:supplierId" element={<OrderList />} />
          <Route path='/customer' Component={Customer}></Route>
          <Route path='/appointment' Component={Appointment}></Route>
          <Route path='/emp_details' Component={Emp_details}></Route>
          <Route path='/emp_attendance' Component={Emp_attendance}></Route>
          <Route path='/emp_salary' Component={Emp_salary}></Route>
          <Route path='/emp_leaves' Component={Emp_leaves}></Route>
          <Route path='/orders' Component={Orders}></Route>
          <Route path='/orders' Component={Orders}></Route>
          <Route path='/emp_add' Component={AddEmp}></Route>
          <Route path='/emp_add:id' Component={AddEmp}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
