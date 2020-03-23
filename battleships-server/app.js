'use strict';
const CONFIG = require("./config");
const http = require("http");
const IoServer = require("socket.io");
const initializeBoardsListeners = require("./src/events/initialize-boards-events/initialize-boards-listeners");
const gameMovesListeners = require("./src/events/game-moves-events/game-moves-listeners");
const disconnectionListeners = require("./src/events/disconnection-events/disconnection-listeners");
const sessions = require("./src/states/sessions.js").sessionsManager;

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
        /*
        What does this do..
        how can you get an already subscribed socket ?
        I couldn't reproduce.
        wouldn't you initialize the game twice ?
        maybe i just don't understand.
         */
        isNewUser = false;
        user = sessions.getUserBySocket(socket);
        session = sessions.getSessionBySocket(socket);
    }

    initializeBoardsListeners(socket, session, user, isNewUser, CONFIG.rowsNumber, CONFIG.columnsNumber);
    /*
    You have a useless abstraction with listeners with these two listeners.
    They do nothing..
    I'm sure you can structure it differently.
     */
    gameMovesListeners(sessions.sessions, socket, session, user);
    disconnectionListeners(sessions, socket, user);
});

app.listen(port);
