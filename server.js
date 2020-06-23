var express = require("express");
var app = express();

var server = require("http").createServer(app);

var io = require("socket.io")(server);

app.get("/", function (req, res, next) {
  res.sendfile(__dirname + "/public/index.html");
});
app.use(express.static("public"));

io.on("connection", function (client) {
  console.log("Client is connecting...");
  client.on("join", function (data) {
    console.log(data);
  });
  client.on("message", function (data) {
    client.emit("thread", data);
    client.broadcast.emit("thread", data);
  });
});
server.listen(4200);
