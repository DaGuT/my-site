import Segment from './segment'

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
  constructor(segCount, segLen, minThickness, maxThickness) {
    var p5 = window.p5;

    this.segments = [];

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
      sw: p5.map(segCount, 0, segCount, minThickness, maxThickness),
      //segment length
      len: segLen,
      //what this segment should follow
      next: head
    }));

    //all other segments following each other
    for (let i = 1; i < segCount; ++i) {
      this.segments.push(new Segment({
        x: p5.width / 2,
        y: p5.height / 2,
        //exactly reversed order, It looks way cooler than normal snake stuff
        sw: p5.map(i, 0, segCount, minThickness, maxThickness),
        len: segLen,
        next: this.segments[i - 1]
      }));
    }
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
        sw: segment.sw
      });
    });
    return segJSON;
  }
}

export default Snake;
