import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Adminhome from './pages/adminhome/Adminhome';
import Customer from './pages/customer/Customer';
import Appoinment from './pages/appoinment/Appoinment';
import { useAuthToken } from './auth';
import SignOut from './pages/signout/SignOut';

function App() {

  var token = useAuthToken();
  if(token == null){
    return(
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
          <Route path="login/:token" Component={Login} />
          <Route path="/signout" Component={SignOut} />
          <Route path='/adminhome' Component={Adminhome}></Route>
          <Route path='/customer' Component={Customer}></Route>
          <Route path='/appoinment' Component={Appoinment}></Route>
        </Routes>

      </div>

      <Sidebar />

    </BrowserRouter>
  );
}

export default App;
