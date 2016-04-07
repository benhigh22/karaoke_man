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
                <div className="col-md-4">
                  <div className="prof-pic-upload">
                    <img src="static/dist/images/UPLOADPLACEHOLDER.svg" alt=""/>
                  </div>
                </div>
                <div className="col-md-8">
                  <form action="" id="user-form" onSubmit={this.addUser}>
                    <input type="text" placeholder="username" name="username" id="username"/>
                    <input type="text" placeholder="password" name="password" id="password"/>
                    <button className="btn btn-primary" type="submit"> Submit User Test</button>
                  </form>
                </div>
              </div>

              <UserProfForm/>

            </div>
          </div>
          <div className="col-md-2">
            <div className="sidebar">
              <h3> Subheading in sidebar</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Vel, dicta, consectetur. Aut vel libero itaque earum quam quia labore iure.
                Et minima quam saepe ratione accusamus.
                Ipsam dignissimos doloremque, deleniti.</p>
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
            <div className="col-md-6">
              <select name="user-type">
                <option value="Business">Business</option>
                <option value="Singer">Individual</option>
              </select>
              <input type="text" name="address" placeholder="address"/>
              <input type="text" name="city" placeholder="city"/>
              <input type="text" name="state" placeholder="state"/>
              <input type="text" name="zip" placeholder="zip"/>
            </div>
            <div className="col-md-6">
              <input type="email" placeholder="email" name="email"/>
              <input type="text" placeholder="extra-1" name="extra-1"/>
              <input type="text" placeholder="extra-2" name="extra-2"/>
            </div>
          </form>
        </div>
      );
    }
});

module.exports=RegistrationFormPage;
