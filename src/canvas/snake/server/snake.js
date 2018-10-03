// Setup basic express server
var express = require('express');
var port = process.env.PORT || 2999;
var server = require('http').createServer().listen(port, '0.0.0.0');
var io = require('socket.io')(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

//basic server preparation above

//multiplayer snake

var numSnakes = 0; //in case if I would want to show connected users count
var snakes = {}; //for storing all the snakes to broadcast later
var timer = false; // for preventing spam with updates

//for each connection there is its own 'object'
// server works with stringified JSON
io.on('connection', (socket) => {
  var isAdded = false;
  console.log(`${new Date()}
  user connected with sid: ${socket.id}`);

  // if user connects/reconnects he will emit 'add snake'
  socket.on('add snake', (snake) => {
    if (isAdded)
      return; // if snake is already in the list we do nothing
    console.log('Snake was added');
    ++numSnakes; //we increase snake counter
    isAdded = true; //we say that we have added snake for the socket id

    //on add snake user adds snake to the server snake pool

    snakes[socket.id] = snake; //we add this snake to the 'array'.

    // we let everyone know that there is a new snake (to update numUsers displayed)
    socket.broadcast.emit('snake joined', {
      numSnakes //dis nice ES6 syntax
    });
  });

  socket.on('snake update', (snake) => {
    snakes[socket.id] = snake; //we update our snakes array
    timedBroadcast(snakes);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (isAdded) {
      --numSnakes;

      console.log(`snake disconnected. Sid: ${socket.id}`);

      delete snakes[socket.id]; //we delete snake upon disconnect, as I have told at the beggining

      // echo globally that this client has left
      io.emit('snake left', {numSnakes});
    }
  });
});

function timedBroadcast(snakes) { //it will prevent updating snakes more often than 50ms
  //and yes, we loose data in that 50ms if there were a change
  // it's made so that we can save traffic
  let delay=20; //I want it to be like that. so why not?

  if (timer)
    // timer=setTimeout(()=>{io.emit('snake moved', JSON.stringify(snakes));},delay);
    return;
  else {
    timer = true;
    io.emit('snake moved', snakes);
    setTimeout(() => {
      timer = false
    }, delay)
  }
}
//this is nice function that allows us to broadcast snakes only once per 20ms. This way we dont spam a lot with updates
