import p5 from 'p5'
import $ from 'jquery'
import './sketch.css'
import onVisibilityChange from '../../misc/onVisibilityChange'

import Snake from './snake.js'

const sketch = (p5) => {

  window.p5 = p5;
  let snake;

  //basic p5 setup function
  p5.setup = () => {
    //we create canvas
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    //this is handler that should prevent canvas from updating and taking computing power when it's not in viewpoin
    var handler = onVisibilityChange($('#Snake'), function(visibility) {
      if (visibility) {
        p5.loop();
        console.log('visible');
      } else {
        p5.noLoop();
        console.log('invisible');
      }
    });

    //this is will check if visibility is changed upon few events
    //I'm not using intersection API as I want to support some older browsers
    $(window).on('DOMContentLoaded load resize scroll', handler);

    //------------------------------------------------------------------------------ MY SETUP BELOW
    snake=new Snake(100,10,3,20);
  }

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  p5.draw = () => {
    p5.background(100);
    snake.draw();
  }

}

new p5(sketch, 'Snake');
