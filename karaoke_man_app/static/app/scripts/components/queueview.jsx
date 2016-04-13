var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');

var QueueViewPage = React.createClass({
      render:function(){
        return(
          <div className="container">
            <Header/>
              <div className="row">
                <QueueView />
                <PlayerView />
              </div>
          </div>
        );
      }
    });

var QueueView = React.createClass({
      render:function(){
        return(
          <div className="col-md-3">
            <div className="panel-wrapper">
              <div className="panel">
                <div>
                  <h5>Song Name</h5>
                  <span>Singer Name</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

var PlayerView = React.createClass({
      render:function(){
        return(
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="player-wrapper">
                  <div className="videoplayer">
                    
                  </div>
                </div>
                <h3>Results From You-Tube</h3>
                <div className="ytube-results">
                  <div>
                    <h5>Result #1</h5>
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

    module.exports=QueueViewPage;
