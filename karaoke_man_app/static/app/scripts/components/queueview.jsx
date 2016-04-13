var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var backboneMixin = require('backbone-react-component');

var partyId = Number(localStorage.getItem('currentParty'));
var sourceUrl;
var QueueItemCollection = require('../models/queuemodel.js').QueueItemCollection;
var queueItemCollection = new QueueItemCollection({'partyId':partyId,id:0});
console.log(partyId);

var QueueViewPage = React.createClass({
    componentWillMount:function(){
      queueItemCollection.fetch();
    },
      render:function(){
        return(
          <div className="container">
            <Header/>
              <div className="row">
                <QueueItems collection={queueItemCollection} />
                <PlayerView />
              </div>
          </div>
        );
      }
    });

var QueueItems = React.createClass({
    mixins:[Backbone.React.Component.mixin],
      render:function(){
        var queueitems = this.props.collection.map(function(model){
          console.log(model);
          console.log(model.get('id'));
          return(
            <QueueItem key={model.get('id')} model={model}/>
          );
        });
        return(
          <div className="col-md-3">
            <div className="panel-wrapper">
              <div className="panel">
                {queueitems}
              </div>
            </div>
          </div>
        );
      }
    });
var QueueItem = React.createClass({
      showVideo:function(){
        var query = this.props.model.get('song_name');
        sourceUrl = $.get('/api/songlookup/?song_name='+ query);
      },
      render:function(){
        return(
          <div className="que-item" onClick={this.showVideo}>
            <h5>{this.props.model.get('song_name')}</h5>
            <span>{this.props.model.get('singer_name')}</span>
          </div>
        );
      }
    });
var PlayerView = React.createClass({
      render:function(){
        var frameStyles = {
            overflow: 'hidden',
            height:'100%',
            width:'100%'
        };
        return(
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="player-wrapper">
                  <div className="videoplayer">
                    <iframe style={frameStyles}
                            width="100%"
                            height="100%"
                            src={sourceUrl}
                            frameBorder="0"
                            allowFullScreen>
                    </iframe>
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
