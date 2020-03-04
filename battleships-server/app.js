const Session = require("./src/models/session");
const EventHandlers = require("./src/events/initializeBoardsEvents/initializeBoardsHandlers");
const cors = require("cors");
const http = require("http");
const IoServer = require("socket.io");
const initializeBoardsListeners = require("./src/events/initializeBoardsEvents/initializeBoardsListeners");

const port = process.env.PORT || 3000;
const app = http.createServer();

const io = new IoServer(app);

//new EventListener(io);  // Bind event listeners to the server object
io.on("connection", (socket) => {
    initializeBoardsListeners(socket);
});


//startLogic(io);  // Call game logic

app.listen(port);  // Start running server
