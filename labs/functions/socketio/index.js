const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.WEBRTC_PORT;

//const users = [];
const players = [];


server.listen(port, () => {
  console.log(`Server socket.io running at ${port}`);
});

io.on('connection', function (socket) {


  socket.on('connection', (data) => {
    if (players.length == 0) {
      console.log("Host Connected!");
      console.log(data.id);
      players[0] = data.id;
    }
    else {
      console.log("P2 Connected")
      socket.broadcast.emit("getP2", { id: players.length });
    }
  })

  socket.on('movement', (data) => {
    console.log(data)
    players.forEach(player => {
      if (player == data.id) socket.emit('playerMoved', data);
    })
  })


  /*

  TODO: Retocar els disconects:  
  He fet un petit disconnect mes endevant, esta super mal fet ho hem de retocar
  
  
  socket.on('disconnectPlayer', (data) => {
    console.log("Player disconnected");
    for(i = 0; i <= players.length; i++){
      if(data.id==players[i]){
        players.splice(data.id , 1);
        if(players.length){
        for(i=0;i<=players.length; i++){
          Console.log("Current players"+players.length)
        }}
      }
    }
  })*/

  socket.on('disconnect', function () {
    console.log("Deleting playerInfo")
    players.splice(0, players.length);
  })


});
