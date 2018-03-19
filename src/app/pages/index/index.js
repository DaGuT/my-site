import React, {Component} from 'react';
import snakeSketch from '../../../canvas/snake/sketch';
import '../main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import Slideout from "slideout";
import $ from 'jquery';
import * as spongeGif from '../../../img/sb.gif';
import drawBlocks from '../../../misc/drawBlocks'

/**
 * This is react class for our index page
 * @class
 */
class IndexPage extends Component {

  //we fetch every single block from parts folder and then make a great thing drawing it
  constructor() {
    super();

    //we save each block that we have in that folder to later draw it with drawBlocks();
    this.req = require.context("./parts", true, /^\.\/.*\.js/);
  }

  //after we rendered our page, we add JS stuff
  componentDidMount() {

    if (this.req['./2.snakeBlock.js']) {
      //we spawn our snake in #Snake taking its full size
      let snakeId = 'Snake';
      new p5(snakeSketch(snakeId), snakeId);
    }
    //sideout place
    $('#root').before('<sidebar id="side-menu" class="bg-light"><nav class="sidebar" id="sidebar-nav"><img src=' + spongeGif + ' class="img-thumbnail"></nav></sidebar>');
    //initial sideout
    var slideout = new Slideout({'panel': document.getElementById('root'), 'menu': document.getElementById('side-menu'), 'padding': 256, 'tolerance': 70, 'side': 'right'});
    //copy top-menu items to side panel
    $('#my-menu').children().children().clone().appendTo("#sidebar-nav");
    $('#side-menu').children().wrapAll("<div class='sidebar-sticky'></div>").wrapAll("<ul class='nav flex-column'></ul>");
    // Toggle button
    document.querySelector('.navbar-toggler').addEventListener('click', function() {
      slideout.toggle();
    });

  }

  render() {

    return (<div>
      {drawBlocks(this)}
      <p className="extraHigh"></p>
    </div>);
  }
}

export default IndexPage;
