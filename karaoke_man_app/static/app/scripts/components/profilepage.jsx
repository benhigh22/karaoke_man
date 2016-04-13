var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var Header = require('./header.jsx');

var ProfilePage = React.createClass({
      render:function(){
        return(
          <div className="container">
            <Header/>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <h1> Headline </h1>
                <p><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Officia vero consectetur cum corporis iure quo nulla, dolor
                  aliquam quam facilis ipsam delectus unde qui magni commodi
                  adipisci voluptate ea sint.</span></p>
              </div>
            </div>
            <ProfileNav/>
            <div className="row">
              <div className="col-md-6">
                <img src="https://unsplash.it/g/400/200" alt=""/>
              </div>
              <div className="col-md-6 sidebar">
                <h3>Sub Headline</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                   Voluptatum eaque, iste quis alias ipsum exercitationem,
                   ab architecto at qui porro praesentium corporis reiciendis fugiat!
                   Nemo minima sapiente, quos praesentium nisi.</p>
              </div>
            </div>
            <EventInfo/>
          </div>
        );
      }
    });

var ProfileNav = React.createClass({
      render:function(){
        return(
          <div className="row">
            <div className="col-md-4">
              <a href="#create">
                <div className="profile-button">
                  <h3> Create A Party </h3>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="#queue">
                <div className="profile-button">
                  <h3> My Current Events </h3>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a href="#find">
                <div className="profile-button">
                  <h3> Join a Party </h3>
                </div>
              </a>
            </div>
          </div>
        );
      }
    });

var EventInfo = React.createClass({
      render:function(){
        return(
          <div className="row">
            <JoinedEvents/>
            <CreatedEvents/>
          </div>
        );
      }
    });


var JoinedEvents = React.createClass({
      render:function(){
        return(
          <div className="col-md-6">
            <div className="panel-wrapper">
              <h3>Joined Events</h3>
              <div className="joined-panel">
              </div>
            </div>
          </div>
        )
      }
    });
var CreatedEvents = React.createClass({
      render:function(){
        return(
          <div className="col-md-6">
            <div className="panel-wrapper">
              <h3>Created Events</h3>
              <div className="events-panel">
              </div>
            </div>
          </div>
        )
      }
    });

module.exports=ProfilePage;
