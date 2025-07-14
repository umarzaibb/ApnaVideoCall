import { StrictMode } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import LandingPage from './landingPage/landingPage.jsx';
import SignUpPage from './LoginSignup/SignUp.jsx';
import LoginPage from './LoginSignup/LoginPage.jsx';
import JoinMeeting from './JoinMeetingPage/JoinMeeting.jsx';
import AuthCheck from '../utils/AuthCheck.jsx';
import VideoCall from './VideoCallPage/VideoCall.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/signup' element={<SignUpPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/join-meeting' element={<AuthCheck><JoinMeeting/></AuthCheck>}></Route>
      <Route path='/meeting/*' element={<AuthCheck><VideoCall/></AuthCheck>}></Route>
    </Routes>
  </BrowserRouter>
)
