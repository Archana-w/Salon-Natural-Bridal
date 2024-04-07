import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Salary from './pages/salary/Salary';
import Leave from './pages/leave/Leave';

function App() {
  
  //<Route path="/" Component={Home} />

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/salary" Component={Salary} />
        <Route path="/leave" Component={Leave} />
      </Routes>

    </BrowserRouter>
  );

}

export default App;
