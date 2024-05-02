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
import IncomeHomepage from './pages/income/Homepage'
import OrderView from './pages/orders/OrderView';
import Inventory from './pages/inventory/Inventory';
import ProductForm from './pages/inventory/ProductForm'
import Service_view from './pages/service/ServiceOut';
import Add_Service from './pages/service/AddService';


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
          
          <Route path='/customer' Component={Customer}></Route>
          <Route path='/appointment' Component={Appointment}></Route>
          <Route path='/emp_details' Component={Emp_details}></Route>
          <Route path='/emp_attendance' Component={Emp_attendance}></Route>
          <Route path='/emp_salary' Component={Emp_salary}></Route>
          <Route path='/emp_leaves' Component={Emp_leaves}></Route>


          <Route path='/orders' Component={Orders}></Route>
<<<<<<< HEAD
          

=======
          <Route path="/income_expenses" Component={IncomeHomepage}/>
          <Route path='/inventory' Component={Inventory}></Route>
          <Route path='/inventory/ProductForm' Component={ProductForm}></Route>
          <Route path='/orders' Component={Orders}></Route>
          <Route path='/order/:id' Component={OrderView}></Route>
          <Route path='/service_view' Component={Service_view}></Route>
          <Route path='/add_service' Component={Add_Service}></Route>
>>>>>>> dev-backup
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
