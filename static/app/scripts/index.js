console.log("Hello World!");
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Home = require('./components/homepage.jsx');
var Router = require('./router.js');

Backbone.history.start();
