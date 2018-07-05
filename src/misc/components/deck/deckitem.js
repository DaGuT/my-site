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
      <div key={this.props.key} className={this.props.className} style={this.props.style}>{this.props.children}</div>
    );
  };
}

export default Deckitem;
