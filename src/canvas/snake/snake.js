import Segment from './segment'

export default class Snake {
  constructor(segCount,segLen,minThickness, maxThickness) {
    var p5=window.p5;

    this.segments=[];

    //mouse following head
    this.segments.push(new Segment({
      x:p5.width/2,
      y:p5.height/2,
      sw:p5.map(segCount,0,segCount,minThickness,maxThickness),
      len:segLen,
      next:'mouse'
    }));

    //all other segments following each other
    for (let i=1; i<segCount; ++i) {
      this.segments.push(new Segment({
        x:p5.width/2,
        y:p5.height/2,
        //exactly reversed order, It looks way cooler than normal snake stuff
        sw:p5.map(i,0,segCount,minThickness,maxThickness),
        len:segLen,
        next:this.segments[i-1]
      }));
    }
  }

  draw() {
    this.segments.forEach((segment)=>{
      segment.update();
      segment.draw();
    });
  }
}
