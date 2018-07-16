import React, {Component} from 'react';
import Deckitem from './deckitem.js';
import './grid.css';
import $ from 'jquery';
import "magnific-popup";
import "magnific-popup/dist/magnific-popup.css";

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

  //upon component update we update all portfolio items
  componentDidUpdate() {
    $('.mf-popup').magnificPopup({
      type: 'iframe',
      iframe: {
        patterns: {
          pf: {
            index: '',
            id: function(url) {
              return url;
            },
            src: '%id%'
          }
        }
      },
      gallery: {
        enabled: true, // set to true to enable gallery

        navigateByImgClick: true,

        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button

        tPrev: 'Previous (Left arrow key)', // title for left button
        tNext: 'Next (Right arrow key)', // title for right button
        tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
      }

    });
  }

  render() {
    //may be I should hide functions like this?
    function drawDeck(data) {
      let list = [];
      data.forEach((item) => {
        list.push(<Deckitem item={item}/>);
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
