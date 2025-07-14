import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

function LoginPage() {
     let [open, setOpen]=useState(false);
      let [SnackbarMsg, setSnackBarMsg]=useState("");
    let navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/login", {
            username: formData.username,
            password: formData.password
        }).then((response) => {
            if (response.status === 202) {
                localStorage.setItem("username", formData.username);
                localStorage.setItem("token", response.data.token);
                navigate('/join-meeting');
            }
        }).catch((err) => {
            setOpen(true);
            setSnackBarMsg("Error while login! (Username or Password maybe wrong)");
        });
    };

     const handleClose = () => {
    setOpen(false);
  };

 const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h1>Login Form</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    /><br/>
                    <input 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    /><br/>
                    <button type='submit'>Login</button>
                </form>
            </div>
            <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={SnackbarMsg}
                    action={action}
                  />
        </div>
    );
}

export default LoginPage;
