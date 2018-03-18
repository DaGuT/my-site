
/**
 * Creates a new segment of a snake
 * @class
 */
export default class Segment {


  /**
   * constructor - description
   * @constructor
   * @param  {object} params parameter of Segment
   * @param  {float} params.x X position of A point
   * @param  {float} params.y Y position of A point
   * @param  {float} params.len segment length
   * @param  {float} params.sw segment thickness
   * @param  {(string|object)} params.next Specifies object that should be followed. It can be string="mouse" or one of other segments
   */
  constructor(params) {
    var p5 = window.p5;
    //start and end points
    this.a = p5.createVector(params.x, params.y);
    this.b = p5.createVector();

    //polar coordinats
    this.angle = 0;
    this.len = params.len;

    //stroke width for making it snake like
    this.sw = params.sw;

    //we calculate end point
    this.calculateB();

    this.next = params.next;
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
    var p5 = window.p5;

    let target;

    //which point to follow
    if (this.next === 'mouse') {
      target = p5.createVector(p5.mouseX, p5.mouseY);
    } else {
      target = p5.createVector(this.next.a.x, this.next.a.y);
    }
    let dir = p5.createVector(target.x - this.a.x, target.y - this.a.y); //p5.Vector.sub(target, this.a);
    this.angle = dir.heading();
    dir.setMag(this.len);
    dir.mult(-1);

    this.a = p5.createVector(target.x + dir.x, target.y + dir.y); //p5.Vector.add(target, dir);

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
    var p5 = window.p5;

    //we draw line
    p5.stroke(255);
    p5.strokeWeight(this.sw);
    p5.line(this.a.x, this.a.y, this.b.x, this.b.y);

  }

}
