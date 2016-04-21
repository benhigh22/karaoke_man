var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');
var $ = require('jquery');

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

var UserCreatedPartyCollection = require('../models/createdparties.js').UserPartyCollection;
var JoinedPartyCollection = require('../models/joinedparties.js').JoinedPartyCollection;
var QueueItemCollection = require('../models/queuemodel.js').QueueItemCollection;
var AttendeeCollection = require('../models/attendee.js').AttendeeCollection;
var UserAttendeeCollection = require('../models/user_attendee_id');

var userCreatedPartyCollection = new UserCreatedPartyCollection();
var joinedPartyCollection = new JoinedPartyCollection();
var queueItemCollection;
var partyId;

var ProfilePage = React.createClass({
      componentWillMount:function(){
        partyId = Number(localStorage.getItem('currentParty'));
        queueItemCollection = new QueueItemCollection({'partyId':partyId,id:0});
        queueItemCollection.fetch();
      },
      render:function(){
        return(
          <div>
            <div className="container">
              <Header/>
              <div className="prof-headline row">
                <div className="col-md-2 col-md-offset-2">
                  <img id="k-man" className="pull-left" src="/static/dist/images/karaokeman.png"/>
                </div>
                <div className="col-md-7">
                  <h1> Welcome To Your Profile! </h1>
                  <p><span>This is your one stop shop for all of your Karaoke
                    needs! Want to create a party? Do so here! Need to keep up
                    with upcoming parties? Also here! Curious about future parties
                    in your city that you may want to attend? You guessed it,
                    right here!</span></p>
                </div>
              </div>
              <ProfileNav/>
              <div className="row">
                <div className="col-md-6">
                  <img src="https://images.unsplash.com/46/unsplash_52c319226cefb_1.JPG?crop=entropy&dpr=2&fit=crop&fm=jpg&h=650&ixjsv=2.1.0&ixlib=rb-0.3.5&q=50&w=1200" alt=""/>
                </div>
                <div className="col-md-6 sidebar">
                  <h3>Past and Future Events</h3>
                  <p>See below for all Parties you have created or joined at any
                    time, past or future. Thinking back nostalgically about past
                    events?? Create a new party and experience it again!</p>
                </div>
              </div>
              <EventInfo/>
            </div>
            <Footer />
          </div>
        );
      }
    });

var ProfileNav = React.createClass({
      scrollPage:function(){
          $('html, body').animate({
          scrollTop: $("#current-parties").offset().top
        }, 1000);
      },
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
                <div className="profile-button" id="current-event-scroll" onClick={this.scrollPage}>
                  <h3> My Current Events </h3>
                    <div className="arrow-down">
                    </div>
                </div>
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
          <div className="row" >
            <a id="current-parties"></a>
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
          <div className="col-md-12">
            <div className="">
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
              <span className="event-date"><span className="title">Date: </span>{this.props.model.get('date_of_party')}</span>
              <span className="event-time"><span className="title">Time: </span>{this.props.model.get('time_of_party')}</span>
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
        var that = this;
        var joinedParties = this.props.collection.map(function(model){
          return(
            <JoinedParty key={model.get('id')} model={model} />
          )
        });

        return(
          <div className="col-md-12">
            <div className="">
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
  mixins:[Backbone.React.Component.mixin],

      getInitialState:function(){
        return(
          {'showPartyDetails':false,
          }
        )
      },
      togglePartyQueue:function(){
        if(this.state.showPartyDetails===false){
          this.setState({'showPartyDetails':true});
          partyId=this.props.model.get('party');
          console.log(this.props.model);
          console.log(partyId);
          queueItemCollection = new QueueItemCollection({'partyId':partyId,id:0});
          queueItemCollection.comparator = function(model) {
            return -model.get("id"); // Note the minus!
          }
          queueItemCollection.fetch();
          console.log(queueItemCollection);
        }
        else{
          this.setState({'showPartyDetails':false});
        }

      },
      render:function(){
        return(
          <div>
            <div className="party-info" id='party' onClick={this.togglePartyQueue}>
              <h4>{this.props.model.get('party_name')}</h4>
              <span className="event-date"><span className="title">Date: </span>{this.props.model.get('party_date')}</span>
              <span className="event-time"><span className="title">Time: </span>{this.props.model.get('party_time')}</span>
            </div>
            <JoinedPartyDetails partyDetailState={this.state.showPartyDetails}/>
          </div>
        )
      }
    });
var JoinedPartyDetails = React.createClass({
  mixins:[Backbone.React.Component.mixin],

    render:function(){
      return(
        <div className="joined-party-details row">
            {this.props.partyDetailState ? <DetailView collection={queueItemCollection} /> : null}
        </div>
      );
    }
    });
var DetailView = React.createClass({
  mixins:[Backbone.React.Component.mixin],

    render:function(){
      var that = this;
      var queueItems;
      if(this.props.collection.length==0){
          queueItems = function(){
          return(
            <h1> No Songs Are Currently In This Queue </h1>
          );
        }()
      }
      else{
        queueItems = this.props.collection.map(function(model){
          return(
              <div className="detail-view" key={model.get('id')}>
                <h4>{model.get('song_name')}</h4>
                <span>{model.get('singer_name')}</span>
              </div>
          );
        });
      }
        return(
        <div>
          <div className="col-md-6 queue-wrapper">
            <h3>Currently Queued Songs</h3>
            <span>**Songs Shown By Most Recently Added First</span>
            {queueItems}
          </div>
          <div className="col-md-6">
            <SongAdditionModule collection={this.props.collection} />
          </div>
        </div>
        )
    }
    });
var SongAdditionModule = React.createClass({
    addSong:function(){
      var that = this;
      var userAttendeeId;
      var userAttendeeCollection = new UserAttendeeCollection({'partyId':partyId,id:0});
        userAttendeeCollection.fetch({
          success:function(){
            userAttendeeId = userAttendeeCollection.pluck('id')[0];
            console.log(userAttendeeId);
            that.props.collection.create({
              "singer_name":$("#singer").val(),
              "song_name":$("#song").val(),
              "attendees":userAttendeeId
              });
              document.getElementById("song-add").reset();
          }
        });
      },
      render:function(){
        return(
          <div className="queueform-wrapper">
            <h4>Add A New Song</h4>
            <div>
              <form id="song-add">
                <div className="form-group">
                  <input type="text" id="singer" className="form-control" placeholder="Singer Name"/>
                  <input type="text" id="song" className="form-control"  placeholder="Song Name"/>
                </div>
                <button onClick={this.addSong} type="button"> Add To The Queue </button>
              </form>
            </div>
          </div>
        );
      }
    });
module.exports=ProfilePage;
