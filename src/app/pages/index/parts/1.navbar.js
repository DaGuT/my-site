import React, { Component}  from 'react';
/**
 * navbar - this is navbar + sidebar for mobile devices
 *
 * @return {DOM block}  whole navigation block
 */
function navbar() {
  return (<nav id="nav-panel" className="navbar navbar-expand-md navbar-light bg-light">
    <a className="navbar-brand" href="#">DaGuT.Ru</a>
    <button className="navbar-toggler" type="button">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="my-menu">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">DaGuT.Ru</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link 1</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link 2</a>
        </li>
      </ul>
    </div>
  </nav>);
}

export default navbar;
