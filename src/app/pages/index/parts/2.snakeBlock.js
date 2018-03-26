import React, { Component}  from 'react';
import p5 from 'p5';
import snakeSketch from '../../../../canvas/snake/sketch';

let params = {
  'displayName': 'Snake',
  'blockID': 'Snake'
};


/**
 * snakeBlock - this is snakeBlock with heading of my site. It's private scope only
 *
 * @return {DOM block}  whole snake div with canvas
 */
function snakeBlock() {
  return (<div id={params.blockID} key={params.blockID} className="text-center d-flex justify-content-center">
    <div className="heading top align-self-center ">
      <h1>DaGuT.Ru</h1>
      <h2>This site is about me and contains my (mini)projects</h2>
    </div>
  </div>);
}

/**
 * export later - executed after dom is loaded
 *
 */
 function later() {
  //we spawn our snake in #Snake taking its full size
  let snakeId = 'Snake';
  new p5(snakeSketch(snakeId), snakeId);
}


export {params}

export default snakeBlock;

export {later};
