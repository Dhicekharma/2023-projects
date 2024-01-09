const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://192.168.238.207:4000/",
  },
});
const bcrypt = require("bcrypt"); // Import bcrypt
const axios = require("axios");



function createUniqueId() {
  return crypto.randomBytes(16).toString("hex");
}


const PORT = 4000;
const crypto = require("crypto");


const encryptionKey="6ecdd3de4a27eeaa990c2b550482364395303fdfc869857a6413fdea60db61d6"

const chatgroups = [];
const Users = [];
const Allusers = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ...
socketIO.on("connection", (socket) => {

  console.log(`${socket.id} user is just connected`);


  socket.on("register", async (userData) => {
    const { username, password } = userData;


    //out put of unhashed password
   Allusers.push(username,password,socket.id)
      console.log(Allusers)

    if (Users.some((user) => user.username === username)) {
      socket.emit("registrationFailed", "Username already exists");
      return;
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error(err);
        socket.emit("registrationFailed", "Error hashing password");
      } else {
        const userId = socket.id; // Generate a unique user ID

        // Check if the user already exists based on their socket ID
        const existingUser = Users.find((user) => user.socketId === socket.id);

        if (existingUser) {
          // Update the existing user object with the new username and hashed password
          existingUser.username = username;
          existingUser.password = hashedPassword;
          existingUser.userId = userId;
        } else {
          // Add a new user object to the array
          Users.push({ username, password: hashedPassword, userId, socketId: socket.id });
         
        }
        // const Allusers = Users.map((User) => ({
        //   UserName: User.username,
        //   UserId: User.userId,
        //   messages: [],
        //   time: `${new Date().getHours()}:${new Date().getMinutes()}`, // Example time data
        //   recipient: "",
        // }));
        
       socket.emit("UpdatedUsersList", Users);
        socket.emit("registrationSuccess", "Registration successful", userId); // Send user ID to the client
      }
    });

  });console.log(Users);
  socket.on("login", (userData) => {
    const { username, password } = userData;

    const user = Users.find((user) => user.username === username);
    console.log(Users);
    if (!user) {
      socket.emit("loginFailed", "User not found");
      return;
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        socket.emit("loginFailed", "Invalid username or password");
      } else {
        socket.emit("loginSuccess", "Login successful");
      }
    });
    socket.emit("UpdatedUsersList", Users);
  });

 

  console.log(Users);
  
  socket.on("disconnect", () => {
    const userIndex = Users.findIndex((user) => user.socketId === socket.id);
    if (userIndex !== -1) {
      Users.splice(userIndex, 1);
    }
    console.log(`${socket.id} user disconnected`);
  });
});

socketIO.of("/groups").on("connection", (socket) => {

socket.on("getAllGroups", () => {
  socket.emit("groupList", chatgroups);

});

socket.on("createNewGroup", (currentGroupName) => {
  console.log(currentGroupName);
  chatgroups.unshift({
    id: chatgroups.length + 1,
    currentGroupName,
    messages: [],
  });
  socket.emit("groupList", chatgroups);
});

socket.on("findGroup", (id) => {
  const filteredGroup = chatgroups.filter((item) => item.id === id);
  socket.emit("foundGroup", filteredGroup[0].messages);
});

socket.on("newChatMessage", (data) => {
  const { currentChatMesage, groupIdentifier, currentUser, timeData } = data;
  const filteredGroup = chatgroups.filter(
    (item) => item.id === groupIdentifier
  );
  const newMessage = {
    id: createUniqueId(),
    text: currentChatMesage,
    currentUser,
    time: `${timeData.hr}:${timeData.mins}`,
  };

  socket.to(filteredGroup[0].currentGroupName)
    .emit("groupMessage", newMessage);
  filteredGroup[0].messages.push(newMessage);
  socket.emit("groupList", chatgroups);
  socket.emit("foundGroup", filteredGroup[0].messages);
});
}
)

socketIO.of("/private").on("connection", (socket) => {
  // Create an array to hold Allusers data
  const Allusers = Users.map((User) => ({
    UserName: User.username,
    UserId: User.userId,
    messages: [],
    time: `${new Date().getHours()}:${new Date().getMinutes()}`, // Example time data
    recipient: "",
  }));


  // Emit the Allusers data to the frontend
  socket.emit("userlist", Allusers);
});


app.get("/api", (req, res) => {
  res.json(chatgroups);
});

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

const users=[
  {
    username: 'Ant',
    password: '$2b$10$wy8Hw9bokTvbiPumj3a9sOiaJlGpepmPLAhrPu.TyH/xy11gW0H0y',
    userId: 'rnVzFMfia9_D42OEAAAC',
    socketId: 'rnVzFMfia9_D42OEAAAC',
    key:encryptionKey,
  }
]


console.log(users);