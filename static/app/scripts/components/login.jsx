var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
window.jQuery = $ = require('jquery');

var LoggedInUserModel = require('../models/usermodel').LoggedInUser;
var loggedInUser = new LoggedInUserModel({username:'',password:''});

var Login = React.createClass({

      logInUser:function(){
        loggedInUser.save({'username':$('#login-username').val(),'password':$('#login-password').val()}).then(function(response){
          console.log(response);
          if(response.success===true){
            console.log('sucessfully logged in')
            localStorage.setItem('user',response.user.id);
            Backbone.history.navigate('user',{trigger:true, replace: true});
            location.reload();
            }
          else{
            alert('Incorrect Username and Password')
            }
          }
        );
      },
      render:function(){
        return(
          <div className="row">
            <div className="col-md-4">
              <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel">Login To Your Account</h4>
                    </div>
                    <div className="modal-body">
                      <div className="login-wrapper">
                        <input className="form-control" id="login-username" type="text" placeholder="username" name="username"/>
                        <input className="form-control" id="login-password" type="password" placeholder="password" name="password"/>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary modal-button" onClick={this.logInUser} data-dismiss="modal">Login</button>
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
