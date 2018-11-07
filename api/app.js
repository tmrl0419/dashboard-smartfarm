const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const http = require("http");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "456123",
  database: "smartfarm",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB is Connected!");
});

var app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app).listen(port, () => {
  console.log("Https server listening on port " + port);
});

app.get("/", (req, res) => {
  res.send("Are you MinSik?");
});

app.post("/findalltag", (req, res) => {
  const postbody = req.body;
  console.log(postbody);
  var sql = mysql.format(
    "select * from usersensor where userId= ?",
    postbody.userId
  );
  con.query(sql, function(err, result) {
    if (err) throw err;
    result = JSON.stringify(result);
    console.log(result);
    res.send(result);
  });
});

app.post("/puttag", req => {
  const postbody = req.body;
  console.log(postbody);
  var sql = mysql.format(
    "INSERT INTO usersensor (userId,sensorId) VALUES (?,?)",
    [postbody.userId, postbody.sensorId]
  );
  con.query(sql, function(err) {
    if (err) throw err;
    console.log("Success");
  });
});

app.post("/putdata", (req, res) => {
  const postbody = req.body;
  console.log(postbody);
  var sql = mysql.format(
    "INSERT INTO sensordata (DeviceID,DeviceName,WhenCreated,AmbientTemp,Humidity,Lux) VALUES (?,?,?,?,?,?)",
    [
      postbody.DeviceID,
      postbody.DeviceName,
      postbody.WhenCreated,
      postbody.AmbientTemp,
      postbody.Humidity,
      postbody.Lux
    ]
  );
  con.query(sql, function(err) {
    if (err) throw err;
    res.send("200");
  });
});

app.post("/getdata", (req, res1) => {
  const postbody = req.body;
  console.log(postbody);
  findData(postbody.deviceID, (err, res) => {
    res1.send(res);
  });
});

const io = require("socket.io")(server);

io.on("connect", socket => {
  socket.on("requestData", data => {
    console.log("requestData");
    getLatestData(data.deviceID, function(err, res) {
      if (err) throw err;
      // console.log(res);
      io.to(socket.id).emit("getData", res);
    });
  });

  socket.on("requestDevice", data => {
    console.log("socketIDasdfasdf: ", socket.id);
    getDevices(data.UserID, function(err, res) {
      if (err) throw err;
      io.to(socket.id).emit("getDevices", res);
    });
  });
});

function getLatestData(ID, callback) {
  var sql = mysql.format(
    "SELECT * FROM sensordata WHERE DeviceID= ? ORDER BY WhenCreated DESC LIMIT 1",
    ID
  );
  con.query(sql, function(err, result) {
    if (err) throw err;
    return callback(null, result[0]); // 한개의 Object들을 보냄
  });
}

function getDevices(UserID, callback) {
  var sql = mysql.format("SELECT * FROM usersensor WHERE UserID= ?", UserID);
  con.query(sql, function(err, result) {
    if (err) throw err;
    return callback(null, result); // 한개의 Object들을 보냄
  });
}

function findData(ID, callback) {
  console.log("ID:", ID);
  var sql = mysql.format("select * from sensordata where DeviceID= ?", ID);
  con.query(sql, function(err, result) {
    if (err) throw err;
    return callback(null, result); // 여러개의 Object들을 보냄
  });
}
