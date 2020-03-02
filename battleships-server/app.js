const Session = require("./src/models/session");
const EventHandlers = require("./src/events/locatingHandlers");
const cors = require("cors");
const http = require("http");
const IoServer = require("socket.io");
const EventListener = require("./src/events/generalListener");
const startLogic = require("./src/ServerMain");

const port = process.env.PORT || 3000;
const app = http.createServer();

const io = new IoServer(app);

new EventListener(io);  // Bind event listeners to the server object

//startLogic(io);  // Call game logic

app.listen(port);  // Start running server
