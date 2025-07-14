import React, { useState } from "react";
import "./JoinMeeting.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { 
  Users, 
  Plus, 
  LogOut, 
  User, 
  VideoIcon, 
  ArrowRight,
  Sparkles
} from "lucide-react";

function JoinMeeting() {
    let [open, setOpen]=useState(false);
      let [SnackbarMsg, setSnackBarMsg]=useState("");
  const [meetingId, setMeetingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const LogoutUser  = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  function meetingIDchangeFunc(event) {
    setMeetingId(event.target.value);
  }

  function CreateMeeting() {
    if (meetingId) {
      setIsLoading(true);
      axios.post("http://localhost:8000/meeting", {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
        meetingID: meetingId
      }).then((response) => {
        if (response.data.Created) {
          localStorage.setItem("roomID", meetingId);
          navigate(`/meeting/${meetingId}`, { state: { from: "/skype" } });
        } else {
          setSnackBarMsg("Some error occurred! (Check your internet connection)");
          setOpen(true);
          setMeetingId("");
        }
      }).catch((err) => {
        setSnackBarMsg(err.message);
          setOpen(true);
        setMeetingId("");
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }

  function JoinMeetingBtn() {
    if (meetingId) {
      setIsLoading(true);
      axios.post("http://localhost:8000/join-meeting", {
        meetingID: meetingId
      }).then((response) => {
        if (response.data.isAllowed) {
          localStorage.setItem("roomID", meetingId);
          navigate(`/meeting/${meetingId}`, { state: { from: "/skype" } });
        } else {
          setSnackBarMsg("Meeting ID unable to found!");
          setOpen(true);
          setMeetingId("");
        }
      }).catch((err) => {
        setSnackBarMsg(err.message);
        setOpen(true);
        setMeetingId("");
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }

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
    <div className="join-meeting-container">
      <div className="background-pattern"></div>
      
      <nav className="navigation">
        <div className="nav-brand">
          <VideoIcon className="brand-icon" />
          <h1>Apna Video Call</h1>
        </div>
        
        <div className="nav-user">
          <div className="user-info">
            <User  className="user-icon" />
            <span>{localStorage.getItem("username")}</span>
          </div>
          <button onClick={LogoutUser } className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="welcome-section">
          <h2>Join or Create Meeting</h2>
          <p>Connect with others instantly</p>
        </div>

        <div className="meeting-card">
          <div className="input-section">
            <label htmlFor="meetingId">Meeting ID</label>
            <input
              type="text"
              id="meetingId"
              placeholder="Enter meeting ID"
              value={meetingId}
              onChange={meetingIDchangeFunc}
            />
            <p className="input-help">Share this ID with others to join your session</p>
          </div>

          <div className="button-section">
            <button 
              onClick={CreateMeeting}
              className="btn btn-create"
              disabled={!meetingId || isLoading}
            >
              <Plus size={18} />
              Create Meeting
              {isLoading && <div className="spinner"></div>}
            </button>
            
            <button 
              onClick={JoinMeetingBtn}
              className="btn btn-join"
              disabled={!meetingId || isLoading}
            >
              Join Meeting
              <ArrowRight size={18} />
              {isLoading && <div className="spinner"></div>}
            </button>
          </div>
        </div>
         <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={SnackbarMsg}
                    action={action}
                  />
      </main>
    </div>
  );
}

export default JoinMeeting;
