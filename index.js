const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("conectado", socket.id)
  socket.on("emite", (args) => {
    console.log(args)
  })
});

httpServer.listen(3000);