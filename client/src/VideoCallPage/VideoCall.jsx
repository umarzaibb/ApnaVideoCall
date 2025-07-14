import React, { useState,useRef, useEffect } from 'react';
import './VideoCall.css';
import {io} from 'socket.io-client';

const VideoCall = () => {
  let socket=useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [message, setMessage] = useState("");
  let [ConnectedUser,setConnectedUser]= useState([]);


  //socket-io connection
  useEffect(()=>{
    socket.current=io.connect("http://localhost:8000");
    socket.current.emit("join-meeting", {roomID: localStorage.getItem("roomID"), username: localStorage.getItem("username")});
    socket.current.on("Get-Connected-User", ({ newUsers, usernames }) => {
        let newConnectedUsers=newUsers.map((r,i)=>{
            return {ID: r, username: usernames[i]}
        })
      setConnectedUser([...newConnectedUsers]);
    });
  },[]);

  //main

  const chatMessages = [
    {
      id: 1,
      name: 'Sarah Wilson',
      time: '2:30 PM',
      message: 'Good afternoon everyone! Thanks for joining the meeting.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: 'John Smith',
      time: '2:31 PM',
      message: 'Hello! Ready to discuss the project updates.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      time: '2:32 PM',
      message: 'Can everyone see the screen share properly?',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 4,
      name: 'You',
      time: '2:33 PM',
      message: 'Yes, looks clear on my end!',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isCurrentUser: true
    },
    {
      id: 5,
      name: 'Emma Davis',
      time: '2:34 PM',
      message: "Perfect! Let's start with the agenda items.",
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const participants = [
    {
      id: 1,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 2,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: 3,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-video"></i>
            </div>
            <span className="logo-text">MeetSpace</span>
          </div>
          <div className="meeting-id">
            Meeting ID: {localStorage.getItem("roomID")}
          </div>
        </div>
        
        <div className="header-right">
          <button className="header-btn">
            <i className="fas fa-cog"></i>
          </button>
          <button className="header-btn">
            <i className="fas fa-moon"></i>
          </button>
          <button className="leave-btn">
            Leave Meeting
          </button>
        </div>
      </header>

 <div className="meeting-container">
      {/* Main Video Area */}
      <div className="video-section">
        {/* Meeting Info */}
        <div className="meeting-info">
          <h2>Team Meeting</h2>
          <p>4 participants • 23:45</p>
        </div>

        {/* Participant Grid */}
        <div className="participant-grid">
          {ConnectedUser.map((participant) => (
            <div key={participant.ID} className="participant-tile  main-speaker">
              <i className="fas fa-user users-grid-icon"></i>
              <p style={{fontSize: "x-small", marginTop: "5px"}}>@{participant.username}</p>
            </div>
          ))}
          {/* <div className="participant-tile main-speaker">
            <i className="fas fa-user"></i>
          </div> */}
        </div>

        {/* Main Speaker */}
        <div className="main-speaker-area">
          <div className="speaker-avatar">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
              alt="John Smith" 
            />
          </div>
          <div className="speaker-info">
            <h3>John Smith</h3>
            <p>Speaking...</p>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-header">
          <h3>Meeting Chat</h3>
          <div className="chat-actions">
            <i className="fas fa-users"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>

        <div className="chat-messages">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`message ${msg.isCurrentUser ? 'current-user' : ''}`}>
              <img src={msg.avatar} alt={msg.name} className="message-avatar" />
              <div className="message-content">
                <div className="message-header">
                  <span className="message-name">{msg.name}</span>
                  <span className="message-time">{msg.time}</span>
                </div>
                <p className="message-text">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button type="submit" className="send-button">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>

      {/* Controls */}
      <div className="controls">
        <button 
          className={`control-btn ${isMuted ? 'muted' : ''}`}
          onClick={() => setIsMuted(!isMuted)}
        >
          <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
        </button>
        <button 
          className={`control-btn ${isVideoOff ? 'video-off' : ''}`}
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'}`}></i>
        </button>
        <button className="control-btn">
          <i className="fas fa-desktop"></i>
        </button>
        <button className="control-btn">
          <i className="fas fa-hand-paper"></i>
        </button>
        <button className="control-btn active">
          <i className="fa-solid fa-message"></i>
        </button>
        <button className="control-btn">
          <i className="fas fa-ellipsis-h"></i>
        </button>
        <button className="control-btn end-call">
          <i className="fas fa-phone-slash"></i>
        </button>
      </div>
    </div>
  );
};

export default VideoCall;