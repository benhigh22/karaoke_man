console.log("Hello World!");
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Home = require('./components/homepage.jsx');

ReactDOM.render(React.createElement(Home),
document.getElementById('app'));
