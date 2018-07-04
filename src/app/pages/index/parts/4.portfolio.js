import React, {Component} from 'react';
import Deckitem from '../../../../misc/components/deck/deckitem.js';
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
  return (<div id={params.blockID} key={params.blockID} className="container-fluid text-center p-md-5 pb-sm-5 pt-sm-5">
    <div className="heading top align-self-center">
      <h1 className="pb-5">Portfolio</h1>
    </div>
    <div className="grid-container">
      <Deckitem className="grc-md-1 grr-md-2" style={{
          background: '#00FF00'
        }}>
        1
      </Deckitem>
    </div>

  </div>);
}

/**
 * parseJSON - this function just dls json file with portfolio
 *
 * @param  {type} link url to json
 * @return {type}      nothing. It will execute function parsed() after json is loaded
 */
function parseJSON(link) {
  $.get(link, processParsed).fail((jqxhr, textStatus, error) => {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
  });
  console.log(link);
  console.log('json is being loaded');
}

function processParsed(data) {
  console.log('json loaded');
  console.log(data);
}

/**
 * export later - executed after dom is loaded
 *
 */
function later() {
  parseJSON("./portfolio/portfolio.json");
}

export {
  params
}

export default Portfolio;

export {
  later
};
