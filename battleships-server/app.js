const Session = require("./src/models/session");
const EventHandlers = require("./src/events/initializeBoardsEvents/initializeBoardsHandlers");
const cors = require("cors");
const http = require("http");
const IoServer = require("socket.io");
const initializeBoardsListeners = require("./src/events/initializeBoardsEvents/initializeBoardsListeners");
const sessions = require("./src/states/sessions.js").sessionsManager;

const port = process.env.PORT || 3000;
const app = http.createServer();

const io = new IoServer(app);

//new EventListener(io);  // Bind event listeners to the server object

let isNewUser;
let user = undefined;
io.on("connection", (socket) => {
    console.log("is socket already subscribe = " + sessions.isSocketAlreadySubscribe(socket));
    if(!sessions.isSocketAlreadySubscribe(socket)){
        isNewUser = true;
        user = sessions.subscribeUserSocketForAvailableSession(socket);
    }
    else{
        isNewUser = false;
        user = sessions.getUserBySocket(socket);
    }
    console.log(sessions.sessions.length);
    initializeBoardsListeners(socket, user, isNewUser);

    user = undefined;
});


//startLogic(io);  // Call game logic

app.listen(port);  // Start running server
