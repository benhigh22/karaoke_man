var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Home = require('./components/homepage.jsx');
var RegistrationFormPage = require('./components/userReg.jsx');
var ProfilePage = require('./components/profilepage.jsx');
var PartyFinder = require('./components/partyfinder.jsx');
var QueueViewPage = require('./components/queueview.jsx');
var PartyCreator = require('./components/partycreator.jsx');
var Login = require('./components/login.jsx');


var Router = Backbone.Router.extend({

routes:{
'':'renderHome',
'register':'renderUserRegistration',
'user':'renderProfilePage',
'find':'renderPartyFinder',
'queue':'renderQueueViewPage',
'create':'renderCreatePage'
},

renderHome:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(Home),
  document.getElementById('app'));
},
renderUserRegistration:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(RegistrationFormPage),
  document.getElementById('app'));
},
renderProfilePage:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(ProfilePage),
  document.getElementById('app'));
},
renderPartyFinder:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(PartyFinder),
  document.getElementById('app'));
},
renderQueueViewPage:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(QueueViewPage),
  document.getElementById('app'));
},
renderCreatePage:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(PartyCreator),
  document.getElementById('app'));
}
});

module.exports = new Router();
