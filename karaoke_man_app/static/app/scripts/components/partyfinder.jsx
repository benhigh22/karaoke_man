var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

var Header = require('./header.jsx');
var CityCollection = require('../models/citymodel').CityCollection;
var PartyCollection = require('../models/parties').PartyCollection;

var cityCollection = new CityCollection();
var partyCollection = new PartyCollection();

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
        <div className="selection-wrapper">
          <select name="cities" id="cities">
            {cities}
          </select>
          <button onClick={this.renderResults}>Search</button>
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

      render:function(){
        var that=this;
        var parties = this.props.collection.map(function(model){
            return(
              <Party model={model} key={model.get('id')} handleChange={that.props.handleChange} />
            )
          })

        return(
          <div className="panel-wrapper">
            <h3> Available Parties</h3>
            <div className="panel">
              {parties}
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
        return(
          <div>
            <div key={model.get('id')}>
              <h4>{model.get('location').name}</h4>
              <button type="button" onClick={this.handleClick}> See Details </button>
              <span className="event-date">{model.get('date_of_party')}</span>
              <span className="event-time">{model.get('time_of_party')}</span>
            </div>
            { this.state.showPartyDetails ? <PartyDetails handleChange={this.props.handleChange}/> : null}
          </div>
        )
      }
    });
var PartyDetails = React.createClass({
      render:function(){
        return(
          <div>
            <h5>Party Title</h5>
            <p> Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
              weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah
              plickers sifteo edmodo ifttt zimbra.
            </p>
            <button className="btn btn-primary" onClick={this.props.handleChange}>Join This Party</button>
          </div>
        )
      }
    });

//////////////////////////////////////////
/////Components for Containing Page Elements
/////////////////////////////////////////
var SongSelect = React.createClass({
      render:function(){
        return(
          <div className="panel-wrapper">
            <div><span>X</span></div>
            <h4>You Have Selected Bens Bar</h4>
            <div>
              <form action="">
                <div className="form-group">
                  <input type="text" placeholder="Singer's Name"/>
                  <input type="text" placeholder="Song Name"/>
                </div>
                <button type="submit" className="btn btn-primary"> Add to the que </button>
              </form>
            </div>
          </div>
        );
      }
    });
var PartyFinder = React.createClass({
  getInitialState:function(){
      return {'showSongAdd':false};
  },
  handleChange:function(){
    if(this.state.showSongAdd===false){
    this.setState({'showSongAdd':true});
    }
    else{
    this.setState({'showSongAdd':false});
    }
  },
  render:function(){
      return(
        <div className="container">
          <Header />
          <div className="row">
            <div className="col-md-6">
              <h1> Party Finder </h1>
            </div>
            <div className="col-md-6">
              <CitySelect collection={cityCollection} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <PartySelect collection={partyCollection}  handleChange={this.handleChange} />
            </div>
            <div className="col-md-4">
              { this.state.showSongAdd ? <SongSelect /> : null}
            </div>
          </div>
        </div>
      );
    }
  });

module.exports=PartyFinder;
