var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');


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

module.exports=SongAdditionModule;
