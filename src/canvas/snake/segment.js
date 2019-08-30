import TouchBall from './touchBall'

/**
 * Creates a new segment of a snake
 * @class
 */
class Segment {

  /**
   * constructor - description
   * @constructor
   * @param  {object} params parameter of Segment
   * @param  {float} params.x X position of A point
   * @param  {float} params.y Y position of A point
   * @param  {float} params.len segment length
   * @param  {float} params.sw segment thickness
   * @param  {float} params.col segment H color
   * @param  {(string|object)} params.next Specifies object that should be followed. It can be string="mouse" or one of other segments
   */
  constructor(params,p) {
    //start and end points
    this.a = p.createVector(params.x, params.y);
    this.b = p.createVector();

    this.p = p;

    //polar coordinats
    this.angle = 0;
    this.len = params.len;

    //stroke width for making it snake like
    this.sw = params.sw;

    this.col = params.col || {
      r: 255,
      g: 255,
      b: 255
    };

    //we calculate end point
    this.calculateB();

    //in touch mode we need to create special ball that will react on tilt instead of mouse
    if (params.next === 'touch') {
      this.ball = new TouchBall(params.x, params.y, p);
    }

    this.next = params.next;

    this._draw = this.draw;
  }

  /**
   * calculateB - B point calculator. It takes position of a point and then calculates b based on parameters that were calculated during repositioning of a
   *
   */

  calculateB() {
    let dx = this.len * Math.cos(this.angle);
    let dy = this.len * Math.sin(this.angle);
    this.b.set(this.a.x + dx, this.a.y + dy);
  }

  /**
   * follow - recalculate position of a point based on next element of snake segments
   *
   */
  follow() {
    let target;

    //which point to follow
    switch (this.next) {
      case 'mouse':
        target = this.p.createVector(this.p.mouseX, this.p.mouseY);
        break;
      case 'touch':
        this.ball.update();
        target = this.p.createVector(this.ball.x, this.ball.y);
        break;
      default:
        target = this.p.createVector(this.next.a.x, this.next.a.y);
        break;
    }

    let dir = this.p.createVector(target.x - this.a.x, target.y - this.a.y); //p.Vector.sub(target, this.a);
    this.angle = dir.heading();
    dir.setMag(this.len);
    dir.mult(-1);

    this.a = this.p.createVector(target.x + dir.x, target.y + dir.y); //p.Vector.add(target, dir);

  }

  /**
   * update - we update a and b points
   *
   */
  update() {
    this.follow();
    this.calculateB();
  }

  /**
   * draw - draw functino of segment
   *
   */
  draw() {
    var p = window.p;

    let col= this.col ? this.p.color(this.col.r, this.col.g , this.col.b) : this.p.color(255,255,255);

    //we draw line
    this.p.stroke(col); //it's for campability with old clients
    this.p.strokeWeight(this.sw);
    this.p.line(this.a.x, this.a.y, this.b.x, this.b.y);

  }

}

export default Segment;
