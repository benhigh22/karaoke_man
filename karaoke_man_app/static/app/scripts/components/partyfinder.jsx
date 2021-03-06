var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var backboneMixin = require('backbone-react-component');

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

var CityCollection = require('../models/citymodel').CityCollection;
var PartyCollection = require('../models/parties').PartyCollection;
var AttendeeCollection = require('../models/attendee').AttendeeCollection;
var QueueItemCollection = require('../models/queuemodel.js').QueueItemCollection;
//////////////////////////////////////////
/////Global Variables and Utility Functions
/////////////////////////////////////////
var cityCollection = new CityCollection();
var partyCollection = new PartyCollection();
var partyId;
var attendee;
var attendeeId;

var csrftoken = $("input[name='csrfmiddlewaretoken']").val();
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
//////////////////////////////////////////
/////City Selection Components
/////////////////////////////////////////

var CitySelect = React.createClass({
  mixins:[Backbone.React.Component.mixin],
    componentWillMount:function(){
      this.props.collection.fetch();
      console.log('fetched!!');
    },
    renderResults:function(){
      partyCollection.fetch();
      console.log(partyCollection);
      console.log('parties fetched!!');
    },
    render:function(){
      var cities = this.props.collection.map(function(model){
        return(
          <CityItems model={model} key={model.get('id')} />
        );
      });
      return(
        <div className="selection-wrapper search-bar">
          <select name="cities" id="cities">
            {cities}
          </select>
          <button className="search-button" onClick={this.renderResults}>Search</button>
        </div>
        );
      }
    });

var CityItems = React.createClass({
    render:function(){
      var model = this.props.model;
      return(
        <option value={model.get('id')}>{model.get('name')}</option>
      );
    }
});

//////////////////////////////////////////
/////Party Selection and Details Components
/////////////////////////////////////////

var PartySelect = React.createClass({
      mixins:[Backbone.React.Component.mixin],
      componentWillMount(){

      },

      render:function(){
        var that=this;
        var parties = this.props.collection.map(function(model){
            return(
              <Party model={model} key={model.get('id')} showQueue={that.props.showQueue} />
            )
          })

        return(
          <div className="panel-wrapper">
            <h3> Available Parties</h3>
            <div className="panel">
              {this.props.collection.length>0 ? parties:<h3>Select Your City to Find Available Parties</h3>}
            </div>
          </div>
        );
      }
    });
var Party = React.createClass({
      getInitialState:function(){
        return({'showPartyDetails':false});
      },
      handleClick:function(){
        if(this.state.showPartyDetails===false){
        this.setState({'showPartyDetails':true});
        }
        else{
        this.setState({'showPartyDetails':false});
        }
      },
      render:function(){
        var model=this.props.model;
        var that = this;
        return(
          <div>
            <div key={model.get('id')}>
              <h4>{model.get('location_name')}</h4>
              <span className="event-date"><span className="title">Date: </span>{model.get('date_of_party')}</span>
              <span className="event-time"><span className="title">Time: </span>{model.get('time_of_party')}</span>
              <button type="button" onClick={this.handleClick}> See Details </button>
            </div>
            { this.state.showPartyDetails ? <PartyDetails showQueue={this.props.showQueue} PartyModel={model}/> : null}
          </div>
        )
      }
    });
var PartyDetails = React.createClass({
      addAttendee:function(){

        partyId = this.props.PartyModel.get('id');
        var attendeeCollection = new AttendeeCollection({'partyId':partyId});
        console.log(partyId);

        attendee = attendeeCollection.create({
          'user':Number(localStorage.getItem('user')),
          'party':partyId
        });

        this.props.showQueue();
      },

      render:function(){
        var PartyModel = this.props.PartyModel;
        var that=this;
        return(
          <div>
            <h5>{PartyModel.get('party_name')}</h5>
            <p> {PartyModel.get('description')}</p>
            <button onClick={this.addAttendee}>Join This Party</button>
          </div>
        )
      }
    });

//////////////////////////////////////////
/////Components for Containing Page Elements
/////////////////////////////////////////
var SongSelect = React.createClass({
      returnToProfile:function(){
        Backbone.history.navigate('user',{trigger:true, replace: true});
      },
      render:function(){
        return(
          <div className="panel-wrapper">
            <h3>Add Your First Song to The Queue!</h3>
            <div>
              <form>
                <div className="form-group">
                  <input type="text" id="singer" className="form-control" placeholder="Singer's Name"/>
                  <input type="text" id="song" className="form-control"  placeholder="Song Name"/>
                </div>
                <button type="button" className="btn" onClick={this.props.addToQueue}> Add New Song </button>
              </form>
              <h3>Or</h3>
              <button onClick={this.returnToProfile}> Return to Your Profile</button>
            </div>
          </div>
        );
      }
    });
var PartyFinder = React.createClass({
  getInitialState:function(){
      return {'showSongAdd':false};
  },
  showQueue:function(){
      console.log('Add Song Displayed');
      if(this.state.showSongAdd===false){
      this.setState({'showSongAdd':true});
      }
      else{
      this.setState({'showSongAdd':false});
      }
  },
  addToQueue:function(){
    var setAttendeeId = function(){
          console.log(attendee);
          attendeeId = attendee.get('id');
          console.log(attendeeId);
        }
        setAttendeeId();
     var selectedQueue = new QueueItemCollection({'partyId':partyId});
      console.log(selectedQueue);
         selectedQueue.create({
           'singer_name':$('#singer').val(),
           'song_name':$('#song').val(),
           'party':partyId,
           'attendees':attendeeId,
         });
         Backbone.history.navigate('user',{trigger:true, replace: true});
  },
  render:function(){
      return(
        <div>
          <div className="container">
            <Header />
            <div className="row">
              <div className="col-md-8 party-finder">
                <h1> Party Finder </h1>
                <CitySelect collection={cityCollection} />
              </div>
              <div className="col-md-4">
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <PartySelect collection={partyCollection}  showQueue={this.showQueue} />
              </div>
              <div className="col-md-4">
                { this.state.showSongAdd ? <SongSelect addToQueue={this.addToQueue} /> : null}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  });

module.exports=PartyFinder;
