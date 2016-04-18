var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var User = require('../models/usermodel').User;
var UserCollection = require('../models/usermodel').UserCollection;
var $ = require('jquery');

var Header = require('./header.jsx');
/*GLOBAL VARIABLES*/
var users = new UserCollection();
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
      console.log(userData);
      users.create(userData, {
        success: function(userData){
          console.log(userData)
        }
      });
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
                <div className="col-md-4 test">
                  <div className="prof-pic-upload">
                    <img src="static/dist/images/UPLOADPLACEHOLDER.svg" alt=""/>
                  </div>
                </div>
                <div className="col-md-8">
                  <form action="" id="user-form" onSubmit={this.addUser}>
                    <input type="text" placeholder="username" name="username" id="username"/>
                    <input type="text" placeholder="password" name="password" id="password"/>
                    <button className="signup_button" type="submit"> Sign Up!</button>
                  </form>
                </div>
              </div>

              <UserProfForm/>

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
