import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Leave from './pages/leave/Leave';
import Store from './pages/store/Store';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import SignOut from './pages/signout/SignOut';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Profile from './pages/profile/Profile';
import Appointment from './pages/appointment/Appointment';
import OrderDetails from './pages/order_details/OrderDetails';
import AppointmentList from './pages/appointment/AppointmentList';
import SupplierDashboard from './pages/SupplierDashboard/SupplierDashboard';
import SupplierOrder from './pages/SupplierOrder/SupplierOrder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LayoutWithHeader />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        <Route path="/supplier-order" element={<SupplierOrder />} /> 
      </Routes>
    </BrowserRouter>
  );
}

function LayoutWithHeader() {
  const location = useLocation();
  const showHeader = location.pathname !== "/supplier-dashboard";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/leave" element={<Leave />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/store" element={<Store />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-app" element={<Appointment />} />
        <Route path="/invoice/:id" element={<OrderDetails />} />
        <Route path="/my-app" element={<AppointmentList />} />
        
      </Routes>
    </>
  );
}

export default App;