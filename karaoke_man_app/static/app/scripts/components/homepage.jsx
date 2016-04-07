var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var Login = require('./login.jsx');

var Home = React.createClass({
    openModal:function(){
      
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
              </ul>
            </div>
          </header>
          <Login />
          <div className="row">
            <div className="col-md-7">
              <h1> Karaoke Now! </h1>
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
                  <a onClick={this.openModal}>
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
              <h3>Karaoke Subheading!</h3>
              <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Fuga eum, quos magni, esse repellendus facilis magnam dolores dignissimos
                 consequuntur quasi sunt iusto, quas!
                Aperiam corrupti architecto error, sed minima hic?</p>
            </div>
          </div>
        </div>
        )
      }
    });

module.exports=Home;
