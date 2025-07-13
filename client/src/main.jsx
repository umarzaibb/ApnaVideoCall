import { StrictMode } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import LandingPage from './landingPage/landingPage.jsx';
import SignUpPage from './LoginSignup/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/signup' element={<SignUpPage/>}></Route>
    </Routes>
  </BrowserRouter>
)
