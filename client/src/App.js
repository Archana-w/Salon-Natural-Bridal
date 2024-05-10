import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
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
import Service from './pages/service/Service';
import Nailcare from './pages/service/Nail_care';
import Haircare from './pages/service/Hair_care';
import Skincare from './pages/service/Skin_care';

function App() {

  
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/leave" Component={Leave} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/signout" Component={SignOut} />
        <Route path="/store" Component={Store} />
        <Route path="/" Component={Home} />
        <Route path="/cart" Component={Cart}/>
        <Route path="/checkout" Component={Checkout}/>
        <Route path="/profile" Component={Profile} />
        <Route path="/create-app" Component={Appointment} />
        <Route path="/create-app/:id" Component={Appointment} />
        <Route path="/invoice/:id" Component={OrderDetails}/>
        <Route path="/my-app/AppointmentList" Component={AppointmentList}/>
        <Route path="/service" element={<Service/>} />
        <Route path="/Nail_care" element={<Nailcare />} />
        <Route path="/Hair_care" element={<Haircare/>} />
        <Route path="/Skin_care" element={<Skincare/>} />
        <Route path="/my-app" Component={AppointmentList}/>

      </Routes>

    </BrowserRouter>
  );

}

export default App;
