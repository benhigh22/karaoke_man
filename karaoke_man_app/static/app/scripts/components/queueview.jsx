var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var Header = require('./header.jsx');
var backboneMixin = require('backbone-react-component');

var QueueItemCollection = require('../models/queuemodel.js').QueueItemCollection;

var queueItemCollection;
var query;
var chosenResult;

//////////////////////////////////////////////////////////
////Top Level Component Governing State
//////////////////////////////////////////////////////////

var QueueViewPage = React.createClass({
    componentWillMount:function(){
      var partyId = Number(localStorage.getItem('currentParty'));
      queueItemCollection = new QueueItemCollection({'partyId':partyId,id:0});
      queueItemCollection.fetch();
    },
    getInitialState(){
      return {
              "sourceUrl":"",
              "searchResults":[]
              }
    },
    setUrl:function(){
      this.setState({sourceUrl:chosenResult})
    },
    showVideo:function(){
      var that = this;
      var sourceUrl = $.getJSON('/api/songlookup/?song_name='+ query, function(response){
        that.setState({"searchResults":response.body})
        var firstResult = response.body[0];
        that.setState({"sourceUrl":firstResult.url})
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
                <PlayerView setUrl={this.setUrl} sourceUrl={this.state.sourceUrl} searchResults={this.state.searchResults}/>
              </div>
          </div>
        );
      }
    });

//////////////////////////////////////////////////////////
////Components For the Song Queue
//////////////////////////////////////////////////////////

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
              <div className="queue-panel">
                {queueitems}
              </div>
            </div>
            < SongAdditionModule />
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
        this.props.model.save('complete',true);
      },
      render:function(){
        return(
          <div className="que-item">
            <a onClick={this.removeItem}><h5>X</h5></a>
            <h4>{this.props.model.get('song_name')}</h4>
            <span>{this.props.model.get('singer_name')}</span>
            <button onClick={this.handleSelect}>Play Song</button>
          </div>
        );
      }
    });
var SongAdditionModule = React.createClass({
      addSong:function(){

      },
      render:function(){
        return(
          <div className="queueform-wrapper">
            <h4>Add A New Song</h4>
            <div>
              <form>
                <div className="form-group">
                  <input type="text" id="singer" className="form-control" placeholder="Singer Name"/>
                  <input type="text" id="song" className="form-control"  placeholder="Song Name"/>
                </div>
                <button type="button"> Add to the que </button>
              </form>
            </div>
          </div>
        );
      }
    });
//////////////////////////////////////////////////////////
////Components For the Video Player and Results
//////////////////////////////////////////////////////////
var PlayerView = React.createClass({
      render:function(){
        var that = this;
        var frameStyles = {
            overflow: 'hidden',
            height:'100%',
            width:'100%'
        };
        var sourceUrl = this.props.sourceUrl;
        var youTubeUrl
          if(sourceUrl===undefined){
            youTubeUrl = null;
          }
          else{
            youTubeUrl = "https://www.youtube.com/embed/" + sourceUrl + "?autoplay=1";
          }
        var searchResults = this.props.searchResults.map(function(result){
            return(
              <Results setUrl={that.props.setUrl} result={result}/>
            )
        });
        return(
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="player-wrapper">
                  <div className="videoplayer">
                    <iframe style={frameStyles}
                            width="100%"
                            height="100%"
                            src={youTubeUrl}
                            frameBorder="0"
                            allowFullScreen>
                    </iframe>
                  </div>
                </div>
                <h3>Results From You-Tube</h3>
                <div className="ytube-results">
                  {searchResults}
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
var Results = React.createClass({
  selectResult:function(){
    chosenResult=this.props.result.url;
    this.props.setUrl()
  },
  render:function(){
    return(
      <div key={this.props.result.url}>
        <div>
          <div onClick={this.selectResult}>
            <h5>{this.props.result.title}</h5>
          </div>
        </div>
    </div>
    )
  }
});
    module.exports=QueueViewPage;
