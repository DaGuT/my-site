import Segment from './segment';
import Food from './food';

/**
 * this is snake itself that connects segments and make them redraw propely
 * @class
 */
class Snake {

  /**
   * constructor - description
   *
   * @param  {int} segCount     amount of segments that Snake should consist of
   * @param  {float} segLen       segment length
   * @param  {float} minThickness the most thinnest part of snake will have this thickness
   * @param  {float} maxThickness the most fattest part of snake will have this thickness.
   */
  constructor(segCount, segLen, minThickness, maxThickness, maxLength) {
    var p5 = window.p5;

    this.segments = [];

    this.segLen=segLen;
    this.segCount=segCount;
    this.minThickness=minThickness;
    this.maxThickness=maxThickness;
    this.maxLength = maxLength;

    //head is mouse for PC and acceleration sensor for touch
    let head = (typeof window.orientation !== 'undefined')
      ? 'touch'
      : 'mouse';

    //mouse/ball following head
    this.segments.push(new Segment({
      //initial position
      x: p5.width / 2,
      y: p5.height / 2,
      //thickness of that part
      sw: maxThickness,
      //segment length
      len: segLen,
      //what this segment should follow
      next: head
    }));

    //all other segments following each other
    for (let i = 1; i < segCount; ++i) {
      this.grow();
    }
  }

  grow(col) {
    var p5 = window.p5;
    let i=this.segments.length;

    if (i>=this.maxLength) return; //we dont grow if we have reached maximum len

    this.segments.push(new Segment({
      x: p5.width / 2,
      y: p5.height / 2,
      //exactly reversed order, It looks way cooler than normal snake stuff
      sw: p5.map(i, 0, this.maxLength, this.minThickness, this.maxThickness),
      len: this.segLen,
      col: col,
      next: this.segments[i - 1]
    }));
  }

  /**
   * draw - first it updates  segment position  from head to tail and then draws it. And does it with each element
   *
   */
  draw() { //we usually dont pass anything, so it's fine. We only pass argument when we draw other's snakes
    this.segments.forEach((segment) => {
      segment.update();
      segment.draw();
    });
  }


  //for offline we use this function to check if we have ate the food
  eat(food) {
    if (food.eaten) return; //there is a 50ms delay, so you can eat food multiple times. To prevent that we check if we have not ate it to continue
    let p5=window.p5;

    //if we have hit the food, we consume it and grow
    if ((Math.pow((food.pos.x-this.segments[0].b.x),2)+Math.pow((food.pos.y-this.segments[0].b.y),2))<(Math.pow(Math.max(food.r,this.segments[0].sw),2))) { //basic euclidian distance
      this.grow(food.col);
      food.eaten=true;
      if (this.socket && this.socket.connected) {//if we're online
        console.log('ha');
        this.socket.emit('food eaten');
        return;
      } else { //if we're offline then we spawn new food
        let _food = new Food(p5.random(0, p5.width), p5.random(0, p5.height), 20, {r:p5.random(1, 255), g:p5.random(1, 255), b:p5.random(1, 255)});
        [food.pos.x,food.pos.y,food.r,food.col] = [_food.pos.x,_food.pos.y,_food.r,_food.col];
        food.eaten=false;
      }
    }
  }

  //we generate JSON data made of our segments with data necessary for drawing with Segment.draw.bind(segmentData)
  generateJSON() {
    let segJSON = [];
    this.segments.forEach((segment) => {
      segJSON.push({
        a: {
          x: segment.a.x,
          y: segment.a.y
        },
        b: {
          x:segment.b.x,
          y:segment.b.y
        },
        sw: segment.sw,
        col:segment.col
      });
    });
    return segJSON;
  }
}

export default Snake;
