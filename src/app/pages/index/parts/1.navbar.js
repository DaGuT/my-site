import React from 'react';
import * as spongeGif from '../../../../img/sb.gif';
import $ from 'jquery';
import Navbar from '../../../../misc/components/Navbar';

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
  return (<Navbar
    key={params.blockID}
    params={params}
    brand='DaGuT.Ru'
    linksList={[
    {
      alink: '#1',
      name: 'Link 1'
    }, {
      alink: '#2',
      name: 'Link 2'
    }
  ]}/>);
}

/**
 * later - executed after DOM is loaded
 *
 */
function later() {
  $('#sidebar-nav').prepend('<img src=' + spongeGif + ' class="img-thumbnail">');
}

export {params}
export default navbar;
export {later};
