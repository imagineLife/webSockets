const app = require("express")();
const server = require("http").createServer(app);
const socket = require("socket.io");
const io = socket(server);

const port = 8080 || process.env.PORT;

io.on("connection", (cnxInfo) => {
  console.info("CONNECTION!!!");
  console.log(cnxInfo)
  console.log('// - - - - - //')
});

setInterval(() => {
  const temp = Math.floor(Math.random() * 100);
  const topic = "temperature";
  console.info(`TEMP : ${temp}`);
  io.emit(topic, temp);
}, 3000);

const listenCb = () => console.table([["status", "port"], ["started", port]]);

server.listen(port, listenCb);
