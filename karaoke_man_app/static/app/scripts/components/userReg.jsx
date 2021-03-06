var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var User = require('../models/usermodel').User;
var UserCollection = require('../models/usermodel').UserCollection;
var $ = require('jquery');

var Header = require('./header.jsx');
/*GLOBAL VARIABLES*/
var users = new UserCollection();
var LoggedInUserModel = require('../models/usermodel').LoggedInUser;
var loggedInUser = new LoggedInUserModel({username:'',password:''});
var csrftoken = $("input[name='csrfmiddlewaretoken']").val();


/*UTILITY FUNCTIONS*/
$.fn.serializeObject = function() {
  return this.serializeArray().reduce(function(acum, i) {
    acum[i.name] = i.value;
    return acum;
  }, {});
};

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
/*COMPONENTS*/

var RegistrationFormPage = React.createClass({
    render:function(){
      return(
        <div className="container">
          <Header/>
          <UserRegForm/>
        </div>
      );
    }
    });
var UserRegForm = React.createClass({
    addUser:function(e){
      e.preventDefault();
      var userData = $('#user-form').serializeObject();
      users.create(userData, {
        success: function(response){
          loggedInUser.save({'username':userData.username,'password':userData.password}).then(function(response){
            console.log(response);
            console.log('sucessfully logged in')
            localStorage.setItem('user',response.user.id);
            Backbone.history.navigate('user',{trigger:true, replace: true});
            location.reload();
          });
        }
      });
    },
    logInUser:function(){
      loggedInUser.save({'username':$(),'password':$()}).then(function(response){
        console.log(response);
        if(response.success===true){
          console.log('sucessfully logged in')
          localStorage.setItem('user',response.user.id);
          Backbone.history.navigate('user',{trigger:true, replace: true});
          location.reload();
          }
        else{
            $('#login-btn').html('<h4 className="error-message"> Incorrect Username or Password </h4>');
          }
        }
      );
    },
    addUserProfile:function(e){
      e.preventDefault();
      var userProfileData = $('profile-form').serializeObject();
      console.log(userProfileData)
    },

    render:function(){

      return(
        <div className="row user-reg-form">
          <div className="col-md-10">
            <div className="user-formwrapper">
              <div className="row">
                <div className="col-md-4 col-md-offset-2 test hidden">
                  <div className="prof-pic-upload hidden">
                    <img src="static/dist/images/UPLOADPLACEHOLDER.svg" alt=""/>
                  </div>
                </div>
                <div className="col-md-6 col-md-offset-2">
                  <h3>Create Your Account</h3>
                  <form className="form-group" id="user-form" onSubmit={this.addUser}>
                    <input className="form-control" type="text" placeholder="username" name="username" id="username"/>
                    <input className="form-control" type="password" placeholder="password" name="password" id="password"/>
                    <input className="form-control" type="email" placeholder="email" name="email"/>
                    <button className="signup_button" type="submit"> Sign Up!</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="sidebar">
            <h3>Your Profile</h3>
            <p>Thanks for joining The Karaoke Man! After completing this step, you will be ready to see parties
            in your City, or start your own! You can also use your profile to keep up with your upcoming
            parties and see past ones you've thrown or attended!</p>
          </div>
        </div>
      </div>
        )
      }
    });

var UserProfForm = React.createClass({
    render:function(){
      return(
        <div className="row">
          <form id="profile-form">
            <div className="col-md-8">
              <input type="email" placeholder="email" name="email"/>
            </div>
          </form>
        </div>
      );
    }
});

module.exports=RegistrationFormPage;
