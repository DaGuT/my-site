import React, {Component} from 'react';
import snakeSketch from '../../canvas/snake/sketch';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import p5 from 'p5';
import Slideout from "slideout";
import $ from 'jquery';
import * as spongeGif from  '../../img/sb.gif';

/**
 * This is react class for our index page
 * @class
 */
class IndexPage extends Component {

  //after we rendered our page, we add JS stuff
  componentDidMount() {
    //we spawn our snake in #Snake taking its full size
    let snakeId = 'Snake';
    new p5(snakeSketch(snakeId), snakeId);

    //sideout place
    $('#root').before('<aside id="side-menu" class="bg-light"><nav class="sidebar" id="sidebar-nav"><img src='+spongeGif+' class="img-thumbnail"></nav></aside>');
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
      {navbar()}
      {snakeBlock()}
      {aboutMe()}
      <p className="extraHigh"></p>
    </div>);

    //--------------- BLOCKS DECLARATION----------------------

    /**
     * snakeBlock - this is snakeBlock with heading of my site. It's private scope only
     *
     * @return {DOM block}  whole snake div with canvas
     */
    function snakeBlock() {
      return (<div id="Snake" className="text-center d-flex justify-content-center">
        <div className="heading top align-self-center ">
          <h1>DaGuT.Ru</h1>
          <h2>This site is about me and contains my (mini)projects</h2>
        </div>
      </div>);
    }



    /**
     * navbar - this is navbar + sidebar for mobile devices
     *
     * @return {DOM block}  whole navigation block
     */
    function navbar() {
      return (<nav id="nav-panel" className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">DaGuT.Ru</a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="my-menu">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">DaGuT.Ru</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link 1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link 2</a>
            </li>
          </ul>
        </div>
      </nav>);
    }


    /**
     * aboutMe - this is the block that is describing me :D
     *
     * @return {DOM block}  whole block about me
     */
    function aboutMe(){
      return(
        <div id="about-me" className="container bg-light p-3">
          Hola, test man!
        </div>
      );
    }

  }
}

export default IndexPage;
