import React from 'react';
import p5 from 'p5';
import snakeSketch from '../../../../canvas/snake/sketch';
import './snakeBlock.css';
import $ from 'jquery';

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
  return (
    <div
      id={params.blockID}
      key={params.blockID}
      className="text-center d-flex justify-content-center">
      <div className="heading top align-self-center ">
        <div className="coolTripletAnimation">
          <div className="triplet-static">
            <h1>DaGuT.Ru</h1>
            <h2>This site is about me and contains my (mini)projects</h2>
            <h5>What you see now will change. It's just a skeleton ATM to test myself</h5>
          </div>
          <div className="triplet-moving green">
            <div className="h1-like">DaGuT.Ru</div>
            <div className="h2-like">This site is about me and contains my (mini)projects</div>
            <div className="h5-like">What you see now will change. It's just a skeleton ATM to test myself</div>
          </div>
          <div className="triplet-moving cyan">
            <div className="h1-like">DaGuT.Ru</div>
            <div className="h2-like">This site is about me and contains my (mini)projects</div>
            <div className="h5-like">What you see now will change. It's just a skeleton ATM to test myself</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * export later - executed after dom is loaded
 *
 */
function later() {
  //we spawn our snake in #Snake taking its full size
  let snakeId = 'Snake';
  new p5(snakeSketch(snakeId, 'https://snake.dagut.ru:8080'), snakeId);
  // new p5(snakeSketch(snakeId,'http://localhost:8080'), snakeId); I want to add
  // nice animation to the text on this block I store an element, so that we dont
  // have to constantly look for it
  let el = $(`#${params.blockID}`);
  let first = $(`.coolTripletAnimation > div:nth-child(2)`);
  let second = $(`.coolTripletAnimation > div:nth-child(3)`);
  //in case if element is found (just in case), we process further
  if (el) {
    // we store it's borders so that we can relatively see our coursor position in
    // it.
    el.on('mousemove', e => {
      let rect = el[0].getBoundingClientRect();

      //we calculate relative position from center to borders
      let relX = ((e.pageX - rect.left) - rect.width / 2) / (rect.width / 2); //e.offsetX instead of (e.pageX-rect.left) makes jumping moves when you hover over text elements
      let relY = ((e.pageY - rect.top) - rect.height / 2) / (rect.height / 2);

      console.log(e);

      //multiplier for the further going element
      let mp = 15;

      first.css('transform', `translate(${relX * mp}px,${relY * mp}px)`);
      second.css('transform', `translate(${relX * mp / 2}px,${relY * mp / 2}px)`);
    });

    //we drop to nothing after mouse has left
    el.on('mouseleave', e => {
      first
        .addClass('transition')
        .css('transform', `translate(0px,0px)`);
      second
        .addClass('transition')
        .css('transform', `translate(0px,0px)`);
    });

    //we drop to nothing after mouse has left
    el.on('mouseenter', e => {
      first
        .removeClass('transition')
      second
        .removeClass('transition')
    });
  }
}

export {params}

export default snakeBlock;

export {later};
