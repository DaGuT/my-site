import React from 'react';
import p5 from 'p5';
import snakeSketch from '../../../../canvas/snake/sketch';
import TripletText from '../../../../misc/components/TripletText';
import ReplacebleComponent from '../../../../misc/components/ReplacebleComponent';
import './snakeBlock.css';

let params = {
  'displayName': 'Snake',
  'blockID': 'Snake'
};

// Div from example in ReplacableComponent desc array of components that I've
// describer above for replacablecomponent
const components = [
  {
    component: 'div',
    props: {
      eventName: 'onClick'
    }
  }, {
    component: TripletText,
    props: {
      eventName: 'none',
      readMouseFrom: "#" + params.blockID,
      relativeTo: "center",
      id: "coolTripletTextInCenter"
    }
  }
]

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
      <div className="heading top align-self-center">
        <ReplacebleComponent components={components}>
          <div>
            <h2>This site is about me and contains my (mini)projects</h2>
            <h5>What you see now will change.It 's just a skeleton ATM to test myself</h5>
          </div>
        </ReplacebleComponent>
      </div>
      <div className="top-right-text">
        <TripletText
          readMouseFrom={"#" + params.blockID}
          relativeTo="top-right"
          id="coolTripletText">
          <h2>DaGuT.Ru</h2>
        </TripletText>
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
  // just for fun. Upon clicking we replace it it triplettext
};

export {params};
export default snakeBlock;
export {later}