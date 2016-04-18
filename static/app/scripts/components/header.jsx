var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var Header = React.createClass({


render:function(){
  return(
  <header className="row header-comp">
    <div className="col-md-2">
      <img id="logo" src="/static/dist/images/logo.svgz" alt=""/>
    </div>
    <div className="col-md-5">
      <ul className="nav">
        <a href=""><li>Home</li></a>
        <li>About Us</li>
        <a href="#user"><li>Profile</li></a>
      </ul>
    </div>
  </header>
)

}
});

module.exports=Header;
