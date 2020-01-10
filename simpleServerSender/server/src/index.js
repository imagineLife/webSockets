const app = require("express")();
const server = require("http").createServer(app);
const socket = require("socket.io");
const io = socket(server);

const { mapEventsAndHandlers } =  require('./helpers')
const { evAHandler, evBHandler } = require('./handlers');

const port = 8081 || process.env.PORT;

let events = [
	{evA: evAHandler},
	{evB: evBHandler}
]


io.on("connection", (connectedSocket) => {
  console.info("CONNECTION!!!");
  console.log(connectedSocket)
  console.log('// - - - - - //')

	events.map(e => mapEventsAndHandlers(e, connectedSocket))

});

io.on("disconnect", cnxn => {
	console.log('------DISCONNECTED cnxn------')
	console.log(cnxn)
})

setInterval(() => {
  const temp = Math.floor(Math.random() * 100);
  const topic = "temperature";
  console.info(`TEMP : ${temp}`);
  io.emit(topic, temp);
}, 3000);

const listenCb = () => console.table([["status", "port"], ["started", port]]);

server.listen(port, listenCb);
