import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Register from './pages/suppier_signup/Register';
import SupplierDashboard from './pages/SupplierDashboard/SupplierDashboard';

function App() {
  return (
    <BrowserRouter>
      <Header />
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
        <Route path="/register" element={<Register />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
