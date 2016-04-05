var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var Header = React.createClass({

render:function(){
  return(
  <header class="row header-comp">
    <div class="col-md-2">
      <img src="https://unsplash.it/g/100/100" alt="">
    </div>
    <div class="col-md-3">
      <ul class="nav">
        <li>Home</li>
        <li>About Us</li>
      </ul>
    </div>
  </header>
)

}
});

module.exports=Header;
