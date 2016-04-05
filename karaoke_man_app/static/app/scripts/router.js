var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Home = require('./components/homepage.jsx');
var Header = require('./components/UserReg.jsx');


var Router = Backbone.Router.extend({

routes:{
'':'home',
'userLanding':''
},

renderHome:function(){
  ReactDOM.render(React.createElement(Home),
  document.getElementById('app'));
},
renderUserRegistration:function(){
  ReactDOM.render(React.createElement(UserReg),
  document.getElementById('app'));
}
});

module.exports = new Router();
