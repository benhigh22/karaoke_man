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
module.exports={
  'User':User,
  'LoggedInUser':LoggedInUser,
  'UserCollection':UserCollection
};
