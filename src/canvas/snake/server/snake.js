// Setup basic express server
var express = require('express');
var fs = require('fs');

var port = process.env.PORT || 8080;

//sert loading
var options = {
  key: fs.readFileSync('./sslforfree/private.key'),
  cert: fs.readFileSync('./sslforfree/certificate.crt'),
};

var server = require('https').createServer(options).listen(port, '0.0.0.0');

var io = require('socket.io')(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

//basic server preparation above

//multiplayer snake

var numSnakes = 0; //in case if I would want to show connected users count
var snakes = {}; //for storing all the snakes to broadcast later
var timer = false; // for preventing spam with updates
var foodTimer; //this timer will be used in case if noone ate food which means it's out of screen

let maxX = 1920;
let maxY = 700;
var food;
makeFood(); //this will asign food real food info and alsso attach a interval to respawn food every 10 secs

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

    socket.emit('spawn food', food);

    ++numSnakes; //we increase snake counter
    isAdded = true; //we say that we have added snake for the socket id

    //on add snake user adds snake to the server snake pool

    snakes[socket.id] = snake; //we add this snake to the 'array'.

    // we let everyone know that there is a new snake (to update numUsers displayed)
    io.emit('snake joined', {
      numSnakes //dis nice ES6 syntax
    });
  });

  socket.on('snake update', (snake) => {
    snakes[socket.id] = snake; //we update our snakes array
    timedBroadcast(snakes);
  });

  socket.on('food eaten', () => {
    clearInterval(foodTimer);
    makeFood();
    console.log('new food: ', food);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (isAdded) {
      --numSnakes;

      console.log(`snake disconnected. Sid: ${socket.id}`);

      delete snakes[socket.id]; //we delete snake upon disconnect, as I have told at the beggining

      // echo globally that this client has left
      io.emit('snake left', {
        numSnakes
      });
    }
    //in case if some snake is stuck, we clear it after every1 left
    if (numSnakes===0) {
      snakes = {}
    }
  });
});

function timedBroadcast(snakes) { //it will prevent updating snakes more often than 50ms
  //and yes, we loose data in that 50ms if there were a change
  // it's made so that we can save traffic
  let delay = 20; //I want it to be like that. so why not?

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

function getRandomFood() {
  return food = {
    x: rand(0, maxX),
    y: rand(0, maxY),
    r: 20,
    color: {
      r: rand(0, 255),
      g: rand(0, 255),
      b: rand(0, 255)
    }
  };
}

function makeFood() {
  food = getRandomFood();
  io.emit('spawn food', food);
  foodTimer = setInterval(() => {
    food = getRandomFood();
    io.emit('spawn food', food);
  }, 10000);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}