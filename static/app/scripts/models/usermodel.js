var Backbone = require('backbone');

var User = Backbone.Model.extend({
  defaults:{
    username:'johndoe',
    password:'safepass'
  },

});
var UserCollection =Backbone.Collection.extend({
  model:User,
  url:'/api/users/'

});
var LoggedInUser =Backbone.Model.extend({
  urlRoot:'/api/login/'

});
var LoggedOutUser =Backbone.Model.extend({
  urlRoot:'/api/logout/'

});
module.exports={
  'User':User,
  'LoggedInUser':LoggedInUser,
  'UserCollection':UserCollection,
  'LoggedOutUser':LoggedOutUser
};
