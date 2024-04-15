import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Store from './pages/store/Store';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import SignOut from './pages/signout/SignOut';
import AdminLogin from './pages/admin_login/AdminLogin';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Appointment from './pages/appointment/Appointment';

function App() {

  //<Route path="/" Component={Home} />

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/signout" Component={SignOut} />
        <Route path="/store" Component={Store} />
        <Route path="/" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/create-app" Component={Appointment} />
        <Route path="/admin">
          <Route path=':token' Component={AdminLogin} />
        </Route>

      </Routes>

    </BrowserRouter>
  );

}

export default App;
