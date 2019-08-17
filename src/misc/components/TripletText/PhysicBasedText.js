import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import './TripletText.css';
import { timingSafeEqual } from 'crypto';

//Sane as TripletTExt, but it's different for each symbol and is physics based.
export default class PhysicBasedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        pageX:0,
        pageY:0
    }
  }

  componentDidMount() {
      document.addEventListener('mousemove', (e) => {
        this.setState({pageX:e.pageX,pageY:e.pageY});
      });
  }

  render() {
    return (
      <div>
          {this.props.children.split('').map((s,i) => <PhysicsChar key={i} mouseX={this.state.pageX} mouseY={this.state.pageY}>{s}</PhysicsChar>)}
      </div>
    );
  }
}


//helper class for chars contains physics
class PhysicsChar extends React.Component {

  constructor() {
    super();

    //position and speed. Things that will be updated
    this.state = {
      x: 0,
      y: 0
    }

    this.vel = {
      x: 0,
      y: 0
    };
    this.acc = {
      x: 0,
      y: 0
    };
    this.maxSpeed = 15;
    this.maxForce = 0.3;

    this.updateTimer = null;

  }

  componentWillReceiveProps(nextProps) {
    if (!this.updateTimer) { 
        this.update();
        this.updateTimer = setInterval(this.update,50);
    }
  }

  update = () => {
    this.physics();
    this.setState({
      x: this.state.x + this.vel.x,
      y: this.state.y + this.vel.y
    });
    this.vel = {
      x: this.vel.x + this.acc.x,
      y: this.vel.y + this.acc.y
    };
    this.acc = {
      x: 0,
      y: 0
    };
    if (((Math.abs(this.state.x)<0.1) && (Math.abs(this.state.y)<0.1)) || isNaN(this.state.x)) {clearInterval(this.updateTimer); this.updateTimer=null}
  }

  physics = () => {
    let returnForce = this.returnForce();

    let mouse = {
      x: this.props.mouseX,
      y: this.props.mouseY
    };
    let pushForce = this.pushForce(mouse);

    //some force adjusmtents
    let scaleReturn = 0.1;

    this.applyForce({x:returnForce.x*scaleReturn, y:returnForce.y*scaleReturn});
    this.applyForce(pushForce);
  }

  applyForce = (force) => {
    this.acc = {
      x: this.acc.x + force.x,
      y: this.acc.y + force.y
    };
  }

  map = (val, newMin, newMax, valMin, valMax) => {
    let res = (val - valMin) / (valMax - valMin) * (newMax - newMin) + newMin;
    if (res > newMax) 
      res = newMax;
    if (res < newMin) 
      res = newMin;

    return res;
  }
  
  returnForce = () => {
    let d = Math.sqrt(this.state.x * this.state.x + this.state.y * this.state.y);

    let speed = this.maxSpeed;

    if (d < 200) {
        speed = this.map(d, 0, this.maxSpeed, 0, 200);
    }

    let scale = d ===0 ? 0 : speed / d;

    let desired = {
      x: this.state.x*scale,
      y: this.state.y*scale
    };

    return {
      x: -desired.x - this.vel.x,
      y: -desired.y - this.vel.y
    };
  }

  pushForce = (mouse) => {
    let rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    if (rect) {
        let dx = mouse.x-(rect.right+rect.left)/2-this.green.props.x;
        let dy = mouse.y-(rect.bottom+rect.top)/2-this.green.props.y;

        let d = Math.sqrt(dx*dx + dy*dy);

        let desired = {
            x: this.state.x,
            y: this.state.y
        };
        let steer = {x:0,y:0};


        if (d < 100) {
            desired = {
                x: d===0 ? 0 : -dx*(this.maxSpeed / d),
                y: d===0 ? 0 : -dy*(this.maxSpeed / d)
            };
            steer = {
                x: desired.x - this.vel.x,
                y: desired.y - this.vel.y
            };

            let sd = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
            if (sd > this.maxForce) {
                steer = {
                x: steer.x*(this.maxForce / sd),
                y: steer.y*this.maxForce / sd
                };
            }
        }
        return steer;
    }
  }

  render () {
      this.green = (
        <span className="triplet-moving green" x={this.state.x} y={this.state.y} style={{transform: `translate(${this.state.x}px,${this.state.y}px)`}}>
            {this.props.children}
        </span>
      );
      this.cyan = (            
        <span className="triplet-moving cyan" style={{transform: `translate(${this.state.x/2}px,${this.state.y/2}px)`}}>
            {this.props.children}
        </span>
      );
      return (
        <span className="coolTripletAnimation">
            <span className="triplet-static">
                {this.props.children}
            </span>
            {this.green}
            {this.cyan}
      </span>
      );
  }

}