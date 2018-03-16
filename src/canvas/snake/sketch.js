import p5 from 'p5'
import 'react'
import 'react-dom'

const sketch = (p5) => {

  window.p5 = p5;

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth,p5.windowHeight);
    p5.background(100);
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

}

new p5(sketch);
