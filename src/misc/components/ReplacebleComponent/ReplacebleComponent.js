import React from 'react';
import PropTypes from 'prop-types';

//components example:
/*
const components = [
    {
      component: 'div',
      props: {
        eventName: 'onClick'
      }
    }, {
      component: TripletText,
      props: {
        eventName: 'none',
        readMouseFrom: "#" + params.blockID,
        relativeTo: "center",
        id: "coolTripletTextInCenter"
      }
    }
  ]
*/

// ----------------And now component itself this class is used to create
// Component that will change its component upon click with a new one that is
// passed as props
export default class ReplacableComponent extends React.Component {
  constructor(props) {
    super(props);

    this.currentComponent = 0; // this is internal counter

    this.state = {
      Component: this.props.components[0].component,
      props: this.makeProperProps(props)
    }
  }

  makeProperProps = (props, oldEvent) => {
    // destructuring so that we can take eventName and put it as prop name
    // instead of prop value
    let {
      eventName,
      ...restProps
    } = this.props.components[this.currentComponent].props;

    return {
      //we delete oldEvent if it exists
      [oldEvent || '']: undefined,
      //then we set new event for changing component
      [eventName || 'onClick']: this.changeComponent,
      //and we pass all other props
      ...restProps
    }
  }

  changeComponent = () => {
    let oldEvent = this.props.components[this.currentComponent].props.eventName; //I store it so that I can delete it
    this.currentComponent = (this.currentComponent + 1) % this.props.components.length; //it's for looping thhrough all components that we've passed
    //whoops, code repetition

    this.setState({
      Component: this.props.components[this.currentComponent].component,
      props: this.makeProperProps(this.props.components[this.currentComponent].props,oldEvent)
    });
  }

  render() {
    let Component = this.state.Component;
    return (
      <Component {...this.state.props}>{this.props.children}</Component>
    );
  }
};

ReplacableComponent.propTypes = {
  components: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.any.isRequired, //it's just string or ReactComponent, I cant make it work with oneOfType
    props: PropTypes.shape({eventName: PropTypes.string})
  }))
}