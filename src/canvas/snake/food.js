export default class Food {

  /**
   * constructor - description
   *
   * @param  {type} x     x coord of food
   * @param  {type} y     y coord of food
   * @param  {type} color color that food has and will give to the snake segment
   */
  constructor(x, y, radius, color) {
    let p5 = window.p5; //p5 init

    this.pos = p5.createVector(x, y); //position vector
    this.col = color;
    this.r = radius;

    this.eaten = false;

  }

  draw() {
    let p5 = window.p5;
    p5.noStroke();
    p5.fill(p5.color(this.col.r, this.col.g, this.col.b));
    p5.ellipse(this.pos.x, this.pos.y, this.r);
    p5.fill(255, 255, 255);
  }

}
