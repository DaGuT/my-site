import './sketch.css'
import onVisibilityChange from '../../misc/onVisibilityChange'
import io from 'socket.io-client';
import Snake from './snake.js';
import Food from './food.js';

/**
 * snakeSketch - This is sketch that is returned by this function with keeping full size of its parent element, you then can spawn it anywhere by just calling. E.g.  if you want to spawn snake canvas in <div id="Snake"></div>, then add "let snakeId='Snake'; new p(snakeSketch(snakeId),snakeId);"
 *
 * @param  {string} snakeElementId_ ID of element that snake sketch should be inserted to
 * @return {function}                 p sketch
 */
function snakeSketch(snakeElementId_, server) {

  return(p) => {

    let snake; //our snake
    let snakes = []; //others' snakes segments
    let food; //this is our future food (we store only 1)
    let curOnline = -1;
    let socket; //for socket storing in case of multiplayer snake

    //We make it locally available so that it works properly in returned function
    let snakeElementId = snakeElementId_;

    /**
     * basic p setup function
     */

    p.setup = () => {
      //we create canvas
      //and make its size occupy parents element
      p.createCanvas(document.querySelector('#' + snakeElementId).clientWidth, document.querySelector('#' + snakeElementId).clientHeight);

      //this is handler that should prevent canvas from updating and taking computing power when it's not in viewpoin
      if (onVisibilityChange) { //we only do this if we have this function included
        var handler = onVisibilityChange(document.querySelector('#' + snakeElementId), function(visibility) {
          if (visibility) {
            p.loop();
          } else {
            p.noLoop();
          }
        });

        //this is will check if visibility is changed upon few events
        //I'm not using intersection API as I want to support some older browsers
        window.addEventListener('DOMContentLoaded load resize scroll', handler);
      }

      //------------------------------------------------------------------------------ MY SETUP BELOW
      // mobile phones are not that powerful, so we make different snake size
      if ((typeof window.orientation !== 'undefined')) {
        snake = new Snake(3, 10, 3, 20, 30, p);
      } else {
        snake = new Snake(3, 10, 3, 20, 150, p);
      }

      //if we want to work is multiplayer snake, everything (sockets) is inside of this if
      if (server) {

        food = new Food(-1000, -1000, 20, {r:0,g:0,b:0}, p); //this is outside of field, but it prevents the game from falling down
        //we're trying to go online, so we'll wait for server to spawn new food

        socket = io(server); //we connect to the server

        socket.on('connect', () => {
          console.log('connected');
          socket.emit('add snake', snake.generateJSON()); //we send our snake when we connected
          snake.socket = socket; //so that we can do cool stuff inside of snake
          console.log('snake sent');
        });

        socket.on('snake moved', (_snakes) => {
          snakes = _snakes;
        })

        socket.on('snake joined', (data) => {
          console.log('snakes updated');
          curOnline = data.numSnakes;
        })

        socket.on('snake left', (data) => {
          curOnline = data.numSnakes;
        })

        socket.on('disconnnect', () => {
          curOnline = -1;
          snake.socket = undefined;
        })

        socket.on('spawn food',(_food)=>{
          food = new Food(_food.x,_food.y,_food.r,{r:_food.color.r,g:_food.color.g,b:_food.color.b},p);
        })

        socket.on('connect_error', ()=> {
          food = new Food(p.random(0, p.width), p.random(0, p.height), 20, {r:p.random(1, 255), g:p.random(1, 255), b:p.random(1, 255)},p);
        })

      } else { //offline only mode
        food = new Food(p.random(0, p.width), p.random(0, p.height), 20, {r:p.random(1, 255), g:p.random(1, 255), b:p.random(1, 255)},p);
      }
    }

    /**
     * on window resize we resize canvas
     */
    p.windowResized = () => {
      p.resizeCanvas(document.querySelector('#' + snakeElementId).clientWidth, document.querySelector('#' + snakeElementId).clientHeight);
    }

    /**
     * basic animation loop of p
     */
    p.draw = () => {
      p.clear();
      //p.background('rgba(0,0,0,0)');
      snake.draw(); //we draw our own snake
      snake.eat(food);

      food.draw();

      if (socket) { //if we have muplitlayer snake, we shoud send our snake to the server and draw other snakes

        //we draw online players
        p.textSize(32);
        p.noStroke();
        p.text(
          curOnline === -1
          ? 'Snake server is down'
          : `${curOnline} snakes online`,
        10,
        30);

        socket.emit('snake update', snake.generateJSON()); //we send our updated snake. Needs to be changed so that we dont send the data if we are not active
        //now we draw other snakes

        //We'll be drowing snake by snake
        for (let snk in snakes) {
          if (snk !== socket.id) {
            snakes[snk].forEach((segment) => {
              snake.segments[0].draw.call(segment);
            });
          }
        }
      }
    }

  }
}

export default snakeSketch;
