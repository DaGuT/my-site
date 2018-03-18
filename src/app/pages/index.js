import React, {Component} from 'react';
import snakeSketch from '../../canvas/snake/sketch';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5'


/**
 * This is react class for our index page
 * @class
 */
class IndexPage extends Component {
  render() {

    //we spawn our snake in #Snake taking its full size
    let snakeId='Snake';
    new p5(snakeSketch(snakeId),snakeId);

    return (<div>
      <div id="Snake">
        <div className="container top align-middle text-center">FCK</div>
      </div>
      <p className="extraHigh"></p>
  </div>);
  }
}

export default IndexPage;
