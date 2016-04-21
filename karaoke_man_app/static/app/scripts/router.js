var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var Home = require('./components/homepage.jsx');
var RegistrationFormPage = require('./components/userReg.jsx');
var ProfilePage = require('./components/profilepage.jsx');
var PartyFinder = require('./components/partyfinder.jsx');
var QueueViewPage = require('./components/queueview.jsx').QueueViewPage;
var PartyCreator = require('./components/partycreator.jsx');
var Login = require('./components/login.jsx');
var AboutPage = require('./components/aboutpage.jsx');

var Router = Backbone.Router.extend({

routes:{
'':'renderHome',
'register':'renderUserRegistration',
'user':'renderProfilePage',
'find':'renderPartyFinder',
'queue':'renderQueueViewPage',
'create':'renderCreatePage',
'about':'renderAboutUs'
},
validateLogin:function(){
  if(localStorage.getItem('user')===null){
    Backbone.history.navigate('',{trigger:true, replace: true});
    ReactDom.render(React.createElement(Login),
    document.getElementById('login'));
  }
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
  this.validateLogin();
},
renderPartyFinder:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(PartyFinder),
  document.getElementById('app'));
  this.validateLogin();
},
renderQueueViewPage:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(QueueViewPage),
  document.getElementById('app'));
  this.validateLogin();
},
renderCreatePage:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(PartyCreator),
  document.getElementById('app'));
  this.validateLogin();
},
renderAboutUs:function(){
  ReactDOM.unmountComponentAtNode(document.getElementById('app'));
  ReactDOM.render(React.createElement(AboutPage),
  document.getElementById('app'));
}
});

module.exports = new Router();
