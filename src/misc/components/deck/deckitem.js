import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./deck.css";
import "./grid.css";

class Deckitem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<a  href={this.props.item.src} key={this.props.item.key} className={"grr-md-" + (
      this.props.item.rows || 1) + " grc-md-" + (
      this.props.item.cols || 1) + " pf-item" + " with-overlay mf-popup"} style={{
        'backgroundImage' : "url(" + this.props.item.imgSrc + ")"
      }}>
      <div className="overlay">
        <div className="center-text">{this.props.item.sitename}<div className="subtext">{this.props.item.sitedesc || ""}</div>
        </div>
      </div>
    </a>);
  };
}

export default Deckitem;
