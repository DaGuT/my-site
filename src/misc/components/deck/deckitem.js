import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./deck.css";
import "./grid.css";

class Deckitem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div key={this.props.key} className={this.props.className + " with-overlay"} style={this.props.style}>
      <div className="overlay">
        <div className="center-text">{this.props.sitename}<div className="subtext">{this.props.sitedesc || ""}</div>
        </div>
      </div>
    </div>);
  };
}

export default Deckitem;
