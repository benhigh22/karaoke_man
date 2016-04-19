var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var LoggedOutUser = require('../models/usermodel').LoggedOutUser;
var loggedOutUser = new LoggedOutUser();

var Header = React.createClass({
logoutUser:function(){
  loggedOutUser.fetch();
  localStorage.removeItem('user');
  Backbone.history.navigate('',{trigger:true, replace: true});
},
render:function(){
  return(
  <header className="row header-comp">
    <div className="col-md-2">
      <img id="logo" src="/static/dist/images/logo.png" alt=""/>
    </div>
    <div className="col-md-5">
      <ul className="nav">
        <a href=""><li>Home</li></a>
        <li>About Us</li>
        <a href="#user"><li>Profile</li></a>
      </ul>
    </div>
    <div className="col-md-2 col-md-offset-3">
      <div className="logout" onClick={this.logoutUser}>
        <span>Logout</span>
      </div>
    </div>
  </header>
)

}
});

module.exports=Header;
