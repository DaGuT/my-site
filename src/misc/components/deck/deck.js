import React, {Component} from 'react';
import Deckitem from './deckitem.js';
import './grid.css';
import $ from 'jquery';

class Deck extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  //we first draw some empy blocks, then we parse data in this function and replace empty blocks with normal portfolio items
  componentDidMount() {
    this.parseJSON(this.props.data);
  }

  render() {
    //may be I should hide functions like this?
    function drawDeck(data) {
      let list = [];
      data.forEach((item) => {
        list.push(<Deckitem className={"grr-md-" + (item.rows || 1) + " grc-md-" + (item.cols || 1)+" pf-item"} key={item.imgSrc} style={{'background-image':"url("+item.imgSrc+")"}}>asd</Deckitem>);
      });
      return list;
    }

    return (<div className="grid-container">{drawDeck(this.state.data)}</div>);
  }

  //Additional functions
  /**
 * parseJSON - this function just dls json file with portfolio
 *
 * @param  {type} link url to json
 * @return {type}      nothing. It will execute function parsed() after json is loaded
 */
  parseJSON(link) {
    $.get(link).done((data) => {
      console.log('json loaded');
      this.setState({'data': data});
      console.log(this.state.data);
    }).fail((jqxhr, textStatus, error) => {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
    console.log('json is being loaded');
  }

}

export default Deck;
