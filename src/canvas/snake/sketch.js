import p5 from 'p5'
import $ from 'jquery'
import './sketch.css'
import onVisibilityChange from '../../misc/onVisibilityChange'

import Snake from './snake.js'

/**
 * snakeSketch - This is sketch that is returned by this function with keeping full size of its parent element, you then can spawn it anywhere by just calling. E.g.  if you want to spawn snake canvas in <div id="Snake"></div>, then add "let snakeId='Snake'; new p5(snakeSketch(snakeId),snakeId);"
 *
 * @param  {string} snakeElementId_ ID of element that snake sketch should be inserted to
 * @return {function}                 p5 sketch
 */
function snakeSketch(snakeElementId_) {

  return (p5) => {

    window.p5 = p5;
    let snake;

    //We make it locally available so that it works properly in returned function
    let snakeElementId = snakeElementId_;

    /**
     * basic p5 setup function
     */

    p5.setup = () => {
      //we create canvas
      //and make its size occupy parents element
      p5.createCanvas($('#' + snakeElementId)[0].clientWidth, $('#' + snakeElementId)[0].clientHeight);

      //this is handler that should prevent canvas from updating and taking computing power when it's not in viewpoin
      var handler = onVisibilityChange($('#' + snakeElementId), function(visibility) {
        if (visibility) {
          p5.loop();
        } else {
          p5.noLoop();
        }
      });

      //this is will check if visibility is changed upon few events
      //I'm not using intersection API as I want to support some older browsers
      $(window).on('DOMContentLoaded load resize scroll', handler);

      //------------------------------------------------------------------------------ MY SETUP BELOW
      snake = new Snake(100, 10, 3, 20);
    }


    /**
     * on window resize we resize canvas
     */
    p5.windowResized = () => {
      p5.resizeCanvas($('#' + snakeElementId)[0].clientWidth, $('#' + snakeElementId)[0].clientHeight);
    }


    /**
     * basic animation loop of p5
     */
    p5.draw = () => {
      p5.clear();
      //p5.background('rgba(0,0,0,0)');
      snake.draw();
    }

  }
}

export default snakeSketch;
