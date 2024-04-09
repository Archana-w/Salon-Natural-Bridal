import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Store from './pages/store/Store';
import ProductDetails from './pages/store/ProductDetails';


function App() {
  
  //<Route path="/" Component={Home} />

  return (
    <BrowserRouter>

      <Header />

      <Routes>
      <Route path="/store" Component={Store}/>
      <Route path ="/store/ProductDetails" Component={ProductDetails}/>
 
      </Routes>

    </BrowserRouter>
  );

}

export default App;
