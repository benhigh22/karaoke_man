var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var backboneMixin = require('backbone-react-component');

var Header = require('./header.jsx');
var CityCollection = require('../models/citymodel').CityCollection;
var PartyCollection = require('../models/parties').PartyCollection;

var cityCollection = new CityCollection();
var partyCollection = new PartyCollection();

var PartyFinder = React.createClass({
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
                <PartySelect collection={partyCollection} />
              </div>
              <div className="col-md-4">
                <SongSelect />
              </div>
            </div>
          </div>
        );
      }
    });

var CitySelect = React.createClass({
  mixins:[Backbone.React.Component.mixin],

    componentWillMount:function(){
      this.props.collection.fetch();
      console.log('fetched!!');
    },
    renderResults:function(){
      partyCollection.initialize();
      console.log(partyCollection);
    },
    render:function(){
      console.log(this.props.collection);
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




var PartySelect = React.createClass({
      render:function(){
        return(
          <div className="panel-wrapper">
            <h3> Available Parties</h3>
            <div className="panel">
              <div>
                <h4>Bens Bar</h4>
                <button> See Details </button>
                <span className="event-date">Saturday April 10</span>
                <span className="event-time">7:30–8:30</span>
              </div>
            </div>
          </div>
        );
      }
    });

var SongSelect = React.createClass({
      render:function(){
        return(
          <div className="panel-wrapper">
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

module.exports=PartyFinder;
