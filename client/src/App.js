import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Store from './pages/store/Store';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import SignOut from './pages/signout/SignOut';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Profile from './pages/profile/Profile';


function App() {

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/signout" Component={SignOut} />
        <Route path="/store" Component={Store} />
        <Route path="/" Component={Home} />
        <Route path="/cart" Component={Cart}/>
        <Route path="/checkout" Component={Checkout}/>
        <Route path="/profile" Component={Profile} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;
