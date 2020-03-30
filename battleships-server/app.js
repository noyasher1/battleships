'use strict';
const CONFIG = require("./config");
const http = require("http");
const IoServer = require("socket.io");
const initializeBoardsListeners = require("./src/events/initialize-boards-events/initialize-boards-listeners");
const gameMovesListeners = require("./src/events/game-moves-events/game-moves-listeners");
const disconnectionListeners = require("./src/events/disconnection-events/disconnection-listeners");
const sessions = require("./src/states/sessions.js");

const port = process.env.PORT || CONFIG.port;
const app = http.createServer();

const io = new IoServer(app);


io.on("connection", (socket) => {
    console.log("new connection");
    let session;
    let user;
    let isNewUser;
    if(!sessions.isSocketAlreadySubscribe(socket)){
        isNewUser = true;
        let {session: usedSession, user: newUser} = sessions.subscribeUserSocketForAvailableSession(socket);
        session = usedSession;
        user = newUser;
    }
    else{
        isNewUser = false;
        user = sessions.getUserBySocket(socket);
        session = sessions.getSessionBySocket(socket);
    }

    initializeBoardsListeners(socket, session, user, isNewUser, CONFIG.rowsNumber, CONFIG.columnsNumber);
    gameMovesListeners(sessions, socket, session, user);
    disconnectionListeners(sessions, socket, user);
});

app.listen(port);
