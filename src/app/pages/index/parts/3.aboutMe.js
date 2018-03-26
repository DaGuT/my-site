import React, {Component} from 'react';
import firefallPic from '../../../../img/firefall.png';
import '../../main.css';
import Sortable from 'sortablejs';
import $ from 'jquery';

let params = {
  'displayName': 'About me',
  'blockID': 'aboutMe'
};

/**
 * aboutMe - this is the block that is describing me :D
 *
 * @return {DOM block}  whole block about me
 */
function aboutMe(resort) {
  return (<div id={params.blockID} key={params.blockID} className="container-fluid bg-light text-center p-md-5 pb-sm-5 pt-sm-5">
    <h1 className="col-md-6 offset-md-3 mb-5">Hola, test man!</h1>
    <div className="row">

      <div className="col-lg-4 row no-margin">
        <div className="col-md-6 offset-md-3 box mb-3">
          <img className="rounded-circle box-content" src={firefallPic}/>
        </div>
        <div className="col-12">
          <h3>Omg,It's FIREFALL!!!!</h3>
        </div>
      </div>

      <div className="col-lg-4 row no-margin">
        <div className="col-md-6 offset-md-3 mb-3 nice-card pt-3">
          {printList()}
          <button className="btn mt-5 mb-3 btn-danger" id="resortButton">Resort and click ME!</button>
        </div>
      </div>

      <div className="col-lg-4 row no-margin">
        <div className="col-md-6 offset-md-3 box mb-3">
          <img className="rounded-circle box-content" src={firefallPic}/>
        </div>
        <div className="col-12">
          <h3>Omg,It's FIREFALL!!!!</h3>
        </div>
      </div>

    </div>
  </div>);
}

function later(resort) {
  var el = document.getElementById('sortableList');

  var sortable = Sortable.create(el, {
    animation: 150,
    onEnd: function(evt) { //typical blocks resort
      let blocks = window.indexBlocks;
      let temp = blocks[evt.oldIndex]; //we memorize deleted element to later put it back
      blocks.splice(evt.oldIndex, 1); //we remove it from array

      //we add it to new position
      if (evt.newIndex === blocks.length) {
        blocks.push(temp)
      } else {
        blocks.splice(evt.newIndex, 0, temp);
      }
    }
  });

  $('#resortButton').click(() => {
    resort();
    console.log('resorted');
  });
}

//---------Misc functions-----

/**
 * makeList - generates list of dom elements that look like buttons and can be sorted. Also it creates new window.blockOrder where order of blocks is stored.
 *
 * @param  {function} keyList requre.context
 * @return {div list}         list of divs that can be sorted
 */
function makeList(keyList) {
  let list = [];

  window.indexBlocks.forEach((elem) => {
    let temp = elem.params.displayName;
    list.push(<div className='col btn btn-info m-1' key={temp}>{temp}</div>);
  });
  return list;
}

function printList() {
  return (<div id="sortableList">
    {makeList(window.indexBlocks)}
  </div>);
}

export {
  params
};

export default aboutMe;

export {
  later
};
