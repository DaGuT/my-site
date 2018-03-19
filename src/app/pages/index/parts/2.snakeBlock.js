import React, { Component}  from 'react';
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

export default snakeBlock;
