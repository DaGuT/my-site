import React from 'react';
import dustBG from '../../../../img/dust_scratches.png';
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
function aboutMe() {
  return (<div id={params.blockID} key={params.blockID} className="container-fluid aboutme bg-light text-center p-md-5 pb-sm-5 pt-sm-5" style={{'backgroundImage':`url(${dustBG})`}}>
    <h1 className="col-md-6 offset-md-3 mb-5">Dont like the order of blocks? Re-order!</h1>
    <div className="row">


      <div className="offset-md-2 col-md-8 offset-lg-3 col-lg-6 offset-xl-4 col-xl-4">
        <div className="col-12 mb-3 bg-light helper nice-card pt-3">
          {printList()}
          <button className="btn mt-5 mb-3 btn-light" id="resortButton">Resort and click ME!</button>
        </div>
      </div>


    </div>
  </div>);
}

function later(resort) {
  var el = document.getElementById('sortableList');

  Sortable.create(el, {
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

  return window.indexBlocks.map((elem) => {
    let temp = elem.params.displayName;
    return <div className='col btn btn-light m-1' key={temp}>{temp}</div>;
  });
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
