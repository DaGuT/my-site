import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./deck.css";
import "./grid.css";

class Deckitem extends Component {
  render() {
    return (<div href={this.props.item.src} key={this.props.item.key} className={`grr-${this.props.item.rows || 1} grc-${this.props.item.cols || 1} pf-item with-overlay mf-popup`} style={{
      'backgroundImage' : `url(${this.props.item.imgSrc})`
      }}>
      <div className="overlay">
        <div className="center-text">{this.props.item.sitename}<div className="subtext changed-pointer" dangerouslySetInnerHTML={{
        __html: this.props.item.sitedesc || ""
      }}></div>
        </div>
      </div>
    </div>);

  };
}

export default Deckitem;
