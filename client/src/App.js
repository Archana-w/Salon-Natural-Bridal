import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import SignUp from './pages/signup/SignUp';

function App() {
  
  //<Route path="/" Component={Home} />

  return (
    <BrowserRouter>

      <Header />

      <Routes>
      <Route path="/signup" Component={SignUp} />
      </Routes>

    </BrowserRouter>
  );

}

export default App;
