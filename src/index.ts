import * as express from 'express';
import WsServer from "./wsServer";
var compression = require('compression');
const bodyParser = require('body-parser');

const app = express();
const jsonFileSizeLimit = '50mb';
let PORT = process.env.PORT || "4002";
let WSPORT = process.env.WSPORT || "4000";
let HOST = process.env.HOST || "http://localhost";
let WSHOST = process.env.WSHOST || "ws://localhost";

//look at compression for response later
app.use(compression())
app.use(bodyParser.json({ limit: jsonFileSizeLimit, extended: true }))

app.use('/static', express.static('public')).listen( PORT );

console.log(`Webapp running at ${HOST}:${PORT}/`);
const wsServer = new WsServer();
wsServer.start(WSPORT);
console.log(`Websocket running at ${WSHOST}:${WSPORT}/`);

