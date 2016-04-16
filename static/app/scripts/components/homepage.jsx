var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
window.jQuery = $ = require('jquery');
var Login = require('./login.jsx');

var Home = React.createClass({
    openModal:function(){
      ReactDom.render(React.createElement(Login),
      document.getElementById('login'));
    },
    render:function(){
      return(
        <div className="container">
          <header className="row">
            <div className="col-md-3">
              <img src="https://unsplash.it/g/200/200" alt=""/>
            </div>
            <div className="col-md-6">
              <ul className="nav">
                <li>Home</li>
                <li>About Us</li>
                <a href="#user"><li>Profile</li></a>
              </ul>
            </div>
          </header>
          <Login />
          <div className="row">
            <div className="col-md-10">
              <h1> Welcome To Karaoke Man, Your Free Karaoke Management Application!
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <img src="https://unsplash.it/g/1000/200" alt=""/>
            </div>
          </div>
          <div className="row bottom-btns">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <a href="" onClick={this.openModal} data-toggle="modal" data-target="#myModal">
                    <img src="/static/dist/images/LoginGroup.svg" alt=""/>
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="#register">
                    <img src="/static/dist/images/Group.svg" alt=""/>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <h3>Why Karaoke Man is Awesome:</h3>
              <p> Love to Karaoke but never know where in your area
                is having events? Want to have your own parties but can’t
                afford that expensive Karaoke software? Hate showing up a
                few minutes late to the party and having to wait all night to
                sing? These problems are all solved with this free app!
                Interested? Signup or Login now!!!</p>
            </div>
          </div>
        </div>
        )
      }
    });

module.exports=Home;
