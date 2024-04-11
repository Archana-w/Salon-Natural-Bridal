import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import SignOut from './pages/signout/SignOut';
import Store from './pages/store/Store';
import ProductDetails from './pages/store/ProductDetails';
import AdminLogin from './pages/admin_login/AdminLogin';

function App() {
  
  //<Route path="/" Component={Home} />

  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/signup" Component={SignUp} />
        <Route path="/login" Component={Login} />
        <Route path="/signout" Component={SignOut}/>
        <Route path="/store" Component={Store}/>
        <Route path ="/store/ProductDetails" Component={ProductDetails}/>
        
        <Route path="/admin">
          <Route path=':token' Component={AdminLogin} />
        </Route>


      </Routes>

    </BrowserRouter>
  );

}

export default App;
