var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');

var Header = require('./header.jsx');

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
                <CitySelect />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <PartySelect />
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
      render:function(){
        return(
          <div className="selection-wrapper">
            <select name="" id="">
              <option value="Greenville,SC">Greenville,SC</option>
              <option value="Chicago,IL">Chicago,IL</option>
              <option value="Charlotte,NC">Charlotte,NC</option>
            </select>
          </div>
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
