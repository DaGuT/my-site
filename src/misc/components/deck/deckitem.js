import React, { Component}  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./deck.css";
import "./grid.css";


class Deckitem extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="${this.props.className}">Lol</div>
    );
  };
}

export default Deckitem;
