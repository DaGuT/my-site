export default class Food {

  /**
   * constructor - description
   *
   * @param  {type} x     x coord of food
   * @param  {type} y     y coord of food
   * @param  {type} color color that food has and will give to the snake segment
   */
  constructor(x, y, radius, color, p) {
    this.p=p;

    this.pos = p.createVector(x, y); //position vector
    this.col = color;
    this.r = radius;

    this.eaten = false;

  }

  draw() {
    this.p.noStroke();
    this.p.fill(this.p.color(this.col.r, this.col.g, this.col.b));
    this.p.ellipse(this.pos.x, this.pos.y, this.r);
    this.p.fill(255, 255, 255);
  }

}
