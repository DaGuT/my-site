import React from 'react';
import Deck from '../../../../misc/components/Deck';
import '../../main.css';
import $ from 'jquery';

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
  return (<div id={params.blockID} key={params.blockID} className="container-fluid text-center p-0 pb-sm-5 pt-sm-5">
    <div className="heading top align-self-center">
      <h1 className="pb-5">Portfolio</h1>
    </div>
    <Deck data={"./portfolio/portfolio.json"}/>

  </div>);
}

/**
 * export later - executed after dom is loaded
 *
 */
function later() {
  $('.changed-pointer a').click(function(event){ //in case if there is a link in the description, it should work. Without this it will just propogate the event and open popup
  console.log('fck');
  event.preventDefault();
    event.stopImmediatePropagation();
});
}

export {
  params
}

export default Portfolio;

export {
  later
};
