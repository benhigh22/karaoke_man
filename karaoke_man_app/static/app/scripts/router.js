var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Home = require('./components/homepage.jsx');
var UserReg = require('./components/userReg.jsx');


var Router = Backbone.Router.extend({

routes:{
'':'renderHome',
'register':'renderUserRegistration'
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
