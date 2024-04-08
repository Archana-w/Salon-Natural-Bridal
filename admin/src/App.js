import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Adminhome from './pages/adminhome/Adminhome';
import Customer from './pages/customer/Customer';
import Appoinment from './pages/appoinment/Appoinment';


function App() {


  return (

    <BrowserRouter>
      <Header />


      <div className='main'>
        <Routes>

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
