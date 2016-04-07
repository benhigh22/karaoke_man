var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');

var Login = React.createClass({

      render:function(){
        return(
          <div className="row">
            <div className="col-md-4">
              <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                    </div>
                    <div class="modal-body">
                      <div className="login-wrapper">
                        <form>
                          <div className="login form-group">
                            <input className="form-control" type="text" placeholder="username" name="username">
                            <input className="form-control" type="text" placeholder="password" name="password">
                            <button type="button" className="btn btn-primary center-block">Login</button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

module.exports=Login;
