var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
window.jQuery = $ = require('jquery');
var Login = require('./login.jsx');
var Footer = require('./footer.jsx');

var Home = React.createClass({
    openModal:function(){
      ReactDom.render(React.createElement(Login),
      document.getElementById('login'));
    },
    render:function(){
      return(
        <div>
          <div className="container home">
            <header className="row">
              <div className="col-md-3">
                <img id="logo" src="/static/dist/images/logo.png" alt=""/>
              </div>
              <div className="col-md-9">
                <ul>
                  <div className="row myNav">
                    <li className="col-xs-12 col-sm-12 col-md-3">Home</li>
                    <li className="col-xs-12 col-sm-12 col-md-3">About Us</li>
                    {localStorage.getItem('user') ? <a href="#user"><li className="col-xs-12 col-sm-12 col-md-3">Profile</li></a> : null}
                  </div>
                </ul>
              </div>
            </header>
            <Login />
            <div className="row headline">
              <div className="col-md-10">
                <h1> Welcome To Karaoke Man, Your Free Karaoke Management Application!
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <img id="infograph" src="/static/dist/images/infograph.png" alt=""/>
              </div>
            </div>
            <div className="row bottom-btns">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-0">
                    <a href="" onClick={this.openModal} data-toggle="modal" data-target="#myModal">
                      <div className="homepage-btn">
                        Login To Your Account
                      </div>
                    </a>
                  </div>
                  <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-0">
                    <a href="#register">
                      <div className="homepage-btn">
                        SignUp For A New Account!
                      </div>
                    </a>
                  </div>
                  <div id="login-btn">
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
          <Footer />
        </div>
        )
      }
    });

module.exports=Home;
