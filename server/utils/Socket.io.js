import { Server } from "socket.io";

export default function socketServer(server) {

  function removeSocketFromRoom(socketId, rooms) {
  for (let i = 0; i < rooms.length; i++) {
    const userIndex = rooms[i].user.indexOf(socketId);
    if (userIndex !== -1) {
      rooms[i].user.splice(userIndex, 1); 
      return true; 
    }
  }
  return false; // Socket not found in any room
  }

  let io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // no trailing slash!
      credentials: true,
    },
  });

  let room = []; //syntax: room=[roomID, user=[], username[] ]

  io.on("connection", (socket) => {
    console.log(`User :${socket.id} connected to socket.io`);


    socket.on("join-meeting", ({ roomID, username }) => {

      let isRoomCreated=room.find((r)=>roomID==r.roomID);
      if (!isRoomCreated) {
        let roomObject = {
          roomID: roomID,
          user: [socket.id],
          username: [username]
        };

        room.push(roomObject);
        console.log(room);
      } else {
        room.filter((obj) => {
          if (obj.roomID == roomID) {
            obj.user.push(socket.id);
            obj.username.push(username);
          }
          console.log(room);
        });
      }

      let toSendUser=room.filter((r)=>roomID===r.roomID)[0];
      toSendUser.user.forEach((r) => {
  io.to(r).emit("Get-Connected-User", { newUsers: toSendUser.user, usernames: toSendUser.username });
});
    });

    socket.on("receive-msg", ({message, username, roomID})=>{
          room.filter((currRoom)=>{
            if(currRoom.roomID==roomID){
               io.to(currRoom.user).emit("receive-msg", {message, sender: username});
            }
          })
    });

    socket.on("disconnect", () => {
      console.log("User disconnected to socket.io!");
      removeSocketFromRoom(socket.id ,room);
      console.log(room);
    });
  });

  return io;
};