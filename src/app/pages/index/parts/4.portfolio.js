import React, {Component} from 'react';
import Deckitem from '../../../../misc/components/deck/deckitem.js';
import '../../main.css';

let params = {
  'displayName': 'Portfolio',
  'blockID': 'Portfolio'
};

/**
 * Portfolio - this is portfolio page
 *
 * @return {DOM block}  whole portfolio page
 */
function Portfolio() {
  return (<div id={params.blockID} key={params.blockID} className="container-fluid text-center p-md-5 pb-sm-5 pt-sm-5">
    <div className="heading top align-self-center">
      <h1 className="pb-5">Portfolio</h1>
    </div>
    <div className="grid-container">
        <Deckitem className="grc-md-6"/>
    </div>

  </div>);
}

/**
 * export later - executed after dom is loaded
 *
 */
function later() {}

export {
  params
}

export default Portfolio;

export {
  later
};
