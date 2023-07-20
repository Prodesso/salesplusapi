const socket = require("./handlers/socket");
const database = require("./database/database")
const httpServer = require("http").createServer();
const errorHandler = require('./errorHandler')
const session = require('express-session')
errorHandler()
const sessionMiddleware = session({
  secret: "SalesPlusCrm",
  resave: true,
  saveUninitialized: true,
});
const io = require("socket.io")(httpServer, {
	allowRequest: (req, callback) => {
    // with HTTP long-polling, we have access to the HTTP response here, but this is not
    // the case with WebSocket, so we provide a dummy response object
    const fakeRes = {
      getHeader() {
        return [];
      },
      setHeader(key, values) {
        req.cookieHolder = values[0];
      },
      writeHead() {},
    };
    sessionMiddleware(req, fakeRes, () => {
      if (req.session) {
        // trigger the setHeader() above
        fakeRes.writeHead();
        // manually save the session (normally triggered by res.end())
        req.session.save();
      }
      callback(null, true);
    });
  },
	cors: {
		origin: "*",
	},
});
io.engine.on("initial_headers", (headers, req) => {
  if (req.cookieHolder) {
    headers["set-cookie"] = req.cookieHolder;
    delete req.cookieHolder;
  }
});
socket(io);
httpServer.listen(3000, () => {
	console.log("API en linea")
});

