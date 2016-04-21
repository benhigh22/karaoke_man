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
    <div className="col-md-9">
      <div className="row">
        <ul className="myNav">
          <a href=""><li className="col-xs-12 col-sm-12 col-md-2">Home</li></a>
          <li className="col-xs-12 col-sm-12 col-md-2">About Us</li>
          <a href="#user"><li className="col-xs-12 col-sm-12 col-md-2">Profile</li></a>
          <li onClick={this.logoutUser} className="col-xs-12 col-sm-12 col-md-2">
              <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </header>
)

}
});

module.exports=Header;
