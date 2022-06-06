import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginUser/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Managers from './components/Managers/Managers';
import Products from './components/Products/Products';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <div className='main'>
        <SideBar />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/products" element={<Products />} />
  </Routes> 
      </div>
    </div>
    <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
