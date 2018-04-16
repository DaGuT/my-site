import $ from 'jquery';
import React, { Component}  from 'react';
import Slideout from "slideout";

class Navbar extends Component {

  constructor(props) {
     super(props);

   }


   componentDidMount() {

     //sideout place
     $('#root').before('<sidebar id="side-menu" class="bg-light"><nav class="sidebar" id="sidebar-nav"></nav></sidebar>');
     //initial sideout
     var slideout = new Slideout({'panel': document.getElementById('root'), 'menu': document.getElementById('side-menu'), 'padding': 256, 'tolerance': 70, 'side': 'right'});
     //copy top-menu items to side panel
     $('#my-menu').children().children().clone().appendTo("#sidebar-nav");
     $('#side-menu').children().wrapAll("<div class='sidebar-sticky'></div>").wrapAll("<ul class='nav flex-column'></ul>");
     // Toggle button
     document.querySelector('.navbar-toggler').addEventListener('click', function() {
       slideout.toggle();
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
         res.push(<li key={el.link} className="nav-item">
           <a href={el.link} className="nav-link">{el.name}</a>
         </li>);
       });
       return res;
     }

     return (<nav id={this.props.params.blockID} key={this.props.params.blockID} className="navbar navbar-expand-md navbar-light bg-light">
       <a className="navbar-brand" href="#">DaGuT.Ru</a>
       <button className="navbar-toggler" type="button">
         <span className="navbar-toggler-icon"></span>
       </button>

       <div className="collapse navbar-collapse" id="my-menu">
         <ul className="navbar-nav mr-auto">
           <li className="nav-item brand active">
             <a className="nav-link" href="#">{this.props.brand}</a>
           </li>
            {drawList(this.props.linksList)}
         </ul>
         <ul className="navbar-nav mr-auto" id="blockLinks">
         </ul>
       </div>
     </nav>);
   }
 }

 export default Navbar;