var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var backboneMixin = require('backbone-react-component');
var queueItemCollection;
var query;

var QueueItemCollection = require('../models/queuemodel.js').QueueItemCollection;

var QueueViewPage = React.createClass({
    componentWillMount:function(){
      var partyId = Number(localStorage.getItem('currentParty'));
      queueItemCollection = new QueueItemCollection({'partyId':partyId,id:0});
      queueItemCollection.fetch();
    },
    getInitialState(){
      return {"sourceUrl": ""}
    },
    showVideo:function(){
      var that = this;
      var sourceUrl = $.getJSON('/api/songlookup/?song_name='+ query, function(response){
        that.setState({"sourceUrl":response})
      });
    },
    refreshQueue:function(){
      setInterval(function(){queueItemCollection.fetch()}, 240000);
    },
      render:function(){
        return(
          <div className="container">
            <Header/>
              <div className="row">
                <QueueItems collection={queueItemCollection} showVideo={this.showVideo} refresh={this.refreshQueue()} />
                <PlayerView sourceUrl={this.state.sourceUrl}/>
              </div>
          </div>
        );
      }
    });

var QueueItems = React.createClass({
    mixins:[Backbone.React.Component.mixin],

      render:function(){
        var that = this;
        var queueitems = this.props.collection.map(function(model){
          console.log(model);
          console.log(model.get('id'));
          if(model.get('complete')===false){
            return(
              <QueueItem key={model.get('id')} model={model} showVideo={that.props.showVideo} />
            )
          }
          else{
            return(
              null
            )
          }

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
      handleSelect:function(){
        query = this.props.model.get('song_name');
        this.props.showVideo()
      },
      removeItem:function(){
        // this.props.model.set('complete',true);
        this.props.model.save('complete',true);
      },
      render:function(){
        return(
          <div className="que-item">
            <a onClick={this.removeItem}><h5>X</h5></a>
            <h5>{this.props.model.get('song_name')}</h5>
            <span>{this.props.model.get('singer_name')}</span>
            <button onClick={this.handleSelect}>Play Song</button>
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
        var sourceUrl = this.props.sourceUrl;
        return(
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="player-wrapper">
                  <div className="videoplayer">
                    <iframe style={frameStyles}
                            width="100%"
                            height="100%"
                            src={sourceUrl.body}
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
