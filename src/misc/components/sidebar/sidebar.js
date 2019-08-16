import React, {Component} from './node_modules/react';
import $ from './node_modules/jquery';
import './sidebar.css'
import Slideout from "./node_modules/slideout";
import './node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Sidebar extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    //sideout place
    $('#root').before('<nav class="mobile-fixed"><button class="navbar-toggler navbar-dark" type="button"><span class="navbar-toggler-icon"></span></button></nav><sidebar id="side-menu-mobile"><nav class="sidebar" id="sidebar-nav"></nav></sidebar>');
    //initial sideout
    var slideout = new Slideout({'panel': document.getElementById('root'), 'menu': document.getElementById('side-menu-mobile'), 'padding': 256, 'tolerance': 70, 'side': 'left'});
    //copy top-menu items to side panel
    $('#my-menu').children().children().clone().appendTo("#sidebar-nav");
    $('#side-menu').children().wrapAll("<div class='sidebar-sticky'></div>").wrapAll("<ul class='nav flex-column'></ul>");
    // Toggle button
    document.querySelector('.navbar-toggler').addEventListener('click', function() {
      slideout.toggle();
    });

    var fixed = document.querySelector('.mobile-fixed');
    slideout.on('translate', function(translated) {
      fixed.style.transform = 'translateX(' + translated + 'px)';
    });

    slideout.on('beforeopen', function() {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(256px)';
    });

    slideout.on('beforeclose', function() {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(0px)';
    });

    slideout.on('open', function() {
      fixed.style.transition = '';
    });

    slideout.on('close', function() {
      fixed.style.transition = '';
    });
  }

  render() {

    /**
     * drawList - this function draws list of link for sidebar
     *
     * @param  {Array} list array of objects - link {link: url, name: linkName}
     * @return {type}      <li> list of links
     */
    function drawList(list) {
      var res = [];
      list.forEach(function(el) {
        res.push(<li key={el.link} className="nav-ite">
          <a href={el.link}>{el.name}</a>
        </li>);
      });
      return res;
    }

    return (<nav id={this.props.params.blockID} key={this.props.params.blockID} className="sidebar pc">
      <div className="sidebar-sticky" id="my-menu">
        <ul className="nav flex-column">
          <li className="nav-item brand active">
            <a className="nav-link" href="/">{this.props.brand}</a>
          </li>
          {drawList(this.props.linksList)}
        </ul>
        <ul className="navbar-nav mr-auto" id="blockLinks"></ul>
      </div>
    </nav>);
  }
}
