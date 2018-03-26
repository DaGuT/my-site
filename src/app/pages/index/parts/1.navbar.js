import React, { Component}  from 'react';
import $ from 'jquery';
import Slideout from "slideout";
import * as spongeGif from '../../../../img/sb.gif';

let params = {
  'displayName': 'Navigation bar',
  'blockID': 'navbar'
};


/**
 * navbar - this is navbar + sidebar for mobile devices
 *
 * @return {DOM block}  whole navigation block
 */
function navbar() {
  return (<nav id={params.blockID} key={params.blockID} className="navbar navbar-expand-md navbar-light bg-light">
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
      <ul className="navbar-nav mr-auto" id="blockLinks">
      </ul>
    </div>
  </nav>);
}

/**
 * later - executed after DOM is loaded
 *
 */
function later() {
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

export {params}
export default navbar;
export {later};
