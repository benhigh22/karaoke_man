var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var Header = require('./header.jsx');
var backboneMixin = require('backbone-react-component');

var UserCreatedPartyCollection = require('../models/createdparties.js').UserPartyCollection;
var JoinedPartyCollection = require('../models/joinedparties.js').JoinedPartyCollection;

var userCreatedPartyCollection = new UserCreatedPartyCollection();
var joinedPartyCollection = new JoinedPartyCollection();

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
            <CreatedParties collection={userCreatedPartyCollection}/>
            <JoinedParties collection={joinedPartyCollection}/>
          </div>
        );
      }
    });


var CreatedParties = React.createClass({
    mixins:[Backbone.React.Component.mixin],
      componentWillMount:function(){
        this.props.collection.fetch();
      },
      render:function(){
        var userParties=this.props.collection.map(function(model){
          return(
            <CreatedParty key={model.get('id')} model={model}/>
          );
        });
        return(
          <div className="col-md-6">
            <div className="panel-wrapper">
              <h3>Created Parties</h3>
              <div className="joined-panel">
                  {userParties}
              </div>
            </div>
          </div>
        );
      }
    });

var CreatedParty = React.createClass({
      showPartyQueue:function(){
        var currentParty = this.props.model.get('id');
        localStorage.setItem('currentParty',currentParty);
        Backbone.history.navigate('queue',{trigger:true, replace: true});
      },
      render:function(){
        return(
          <div className="party-info" id='party' onClick={this.showPartyQueue}>
            <h4>{this.props.model.get('party_name')}</h4>
            <span>{this.props.model.get('date_of_party')}</span>
            <span>{this.props.model.get('time_of_party')}</span>
          </div>
        );
      }
    });

var JoinedParties = React.createClass({
    mixins:[Backbone.React.Component.mixin],
      componentWillMount:function(){
        this.props.collection.fetch();

      },
      render:function(){
        var joinedParties = this.props.collection.map(function(model){
          console.log(model);
          return(
            <JoinedParty key={model.get('id')} model={model} />
          )
        });

        return(
          <div className="col-md-6">
            <div className="panel-wrapper">
              <h3>Joined Parties</h3>
              <div className="joined-panel">
                {joinedParties}
              </div>
            </div>
          </div>
        )
      }
    });
var JoinedParty = React.createClass({
      showPartyQueue:function(){
      console.log(this.props.model.get('id'));

      },
      render:function(){
        return(
          <div className="party-info" id='party' onClick={this.showPartyQueue}>
            <h4>{this.props.model.get('party_name')}</h4>
            <span>{this.props.model.get('party_date')}</span>
            <span>{this.props.model.get('party_time')}</span>
          </div>
        )
      }
    });

module.exports=ProfilePage;
