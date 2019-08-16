import React, {Component} from 'react';
import './checkbox.css';

class Checkbox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<label className={"labeled"+' '+(this.props.className || ' ')}>
      <input type="checkbox" value={this.props.value} name={this.props.name}/>
      <div className="circle">
        <div className="circle--inner circle--inner__1"></div>
        <div className="circle--inner circle--inner__2"></div>
        <div className="circle--inner circle--inner__3"></div>
        <div className="circle--inner circle--inner__4"></div>
        <div className="circle--inner circle--inner__5"></div>
        <div className="circle--outer"></div>
      </div>
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="3"/>
            <feColorMatrix in="blur" mode="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 18 -7
          " result="gooey"/>
            <feBlend in2="gooey" in="SourceGraphic" result="mix"/>
          </filter>
        </defs>
      </svg>
    <span>{this.props.children}</span>
    </label>);
  }
}

export default Checkbox;
