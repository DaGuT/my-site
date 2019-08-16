import React from 'react';
import $ from 'jquery';
import propTypes from 'prop-types';
import './TripletText.css';

// this is nice component that will add effect to the text block of splitting
// into different color upon move (it's better to check out on dagut.ru)
class TripletText extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // nice animation to the text on this block I store an element, so that we dont
    // have to constantly look for it
    let el = $(this.props.readMouseFrom);
    let first = $(`#${this.props.id}.coolTripletAnimation > div:nth-child(2)`);
    let second = $(`#${this.props.id}.coolTripletAnimation > div:nth-child(3)`);
    //in case if element is found (just in case), we process further
    if (el) {
      // we store it's borders so that we can relatively see our coursor position in
      // it.
      el.on('mousemove', e => {
        let rect = el[0].getBoundingClientRect();

        //refault stretch is 0
        let relX = 0,
          relY = 0;
        switch (this.props.relativeTo) {
          case "center":
            //we calculate relative position from center to borders
            relX = ((e.pageX - rect.left) - rect.width / 2) / (rect.width / 2); //e.offsetX instead of (e.pageX-rect.left) makes jumping moves when you hover over text elements
            relY = ((e.pageY - rect.top) - rect.height / 2) / (rect.height / 2);
            break;
          case "top-left":
            relX = (e.pageX - rect.left) / rect.width;
            relY = (e.pageY - rect.top) / rect.height;
            break;
          case "top-right":
            relX = (e.pageX - rect.right) / rect.width;
            relY = (e.pageY - rect.top) / rect.height;
            break;
          case "bottom-left":
            relX = (e.pageX - rect.left) / rect.width;
            relY = (e.pageY - rect.bottom) / rect.height;
            break;
          case "bottom-right":
            relX = (e.pageX - rect.right) / rect.width;
            relY = (e.pageY - rect.bottom) / rect.height;
            break;
          default:
            break;
        }

        //renaming. Description is in propTypes
        let mp = this.props.maxDistance;

        first.css('transform', `translate(${relX * mp}px,${relY * mp}px)`);
        second.css('transform', `translate(${relX * mp / 2}px,${relY * mp / 2}px)`);
      });

      //we drop to nothing after mouse has left
      el.on('mouseleave', e => {
        first
          .addClass('transition')
          .css('transform', `translate(0px,0px)`);
        second
          .addClass('transition')
          .css('transform', `translate(0px,0px)`);
      });

      //we drop to nothing after mouse has left
      el.on('mouseenter', e => {
        first.removeClass('transition')
        second.removeClass('transition')
      });
    }
  };

  render() {
    return (
      <div id={this.props.id} className="coolTripletAnimation">
        <div className="triplet-static">
          {this.props.children}
        </div>
        <div className="triplet-moving green">
          {this.props.children}
        </div>
        <div className="triplet-moving cyan">
          {this.props.children}
        </div>
      </div>
    );
  };
}

TripletText.propTypes = {
  "readMouseFrom": propTypes.string.isRequired, //readMouseFrom - selector for element that mouse position will be read from
  "id": propTypes.string.isRequired, //id - block id
  "relativeTo": propTypes.oneOf(['center', 'bottom-left','bottom-right','top-left','top-right']), //what's position that relative distance will be calculated from (in element with selector readMouseFrom)
  "maxDistance": propTypes.number //how far maximum text can go from its initial position, in px
}

TripletText.defaultProps = {
  "relativeTo": 'center',
  "maxDistance": 15
}

export default TripletText;
