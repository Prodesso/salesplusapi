const socket = require("./handlers/socket");
const database = require("./database/database")
const httpServer = require("http").createServer();
const errorHandler = require('./errorHandler')
const session = require('express-session')
const serialize = require('cookie')

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
});


io.engine.on("initial_headers", (headers, req) => {
  if (req.cookieHolder) {
    headers["set-cookie"] = req.cookieHolder;
    delete req.cookieHolder;
  }
});

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));

// only allow authenticated users
io.use((socket, next) => {
	console.log(socket.request.sessionID)
	next()
});
socket(io);
httpServer.listen(3000, () => {
	console.log("API en linea")
});

