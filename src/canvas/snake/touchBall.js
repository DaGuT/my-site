class TouchBall {

  constructor(x_,y_,p5_) {
    this.x=x_;
    this.y=y_;
    //to bind it to specific canvas
    this.p5=p5_;
  }

  update() {
      let p5=this.p5;

      this.x+=p5.rotationY/10;
      this.y+=p5.rotationX/10;

      if (this.x>=p5.width) this.x=p5.width;
      if (this.x<=0) this.x=0;
      if (this.y>=p5.height) this.y=p5.height;
      if (this.y<=0) this.y=0;
  }

}

export default TouchBall;
