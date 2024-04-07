import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Salary from './pages/salary/Salary';

function App() {
  
  //<Route path="/" Component={Home} />

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/salary" Component={Salary} />
      </Routes>

    </BrowserRouter>
  );

}

export default App;
