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

module.exports={
  'User':User,
  'UserCollection':UserCollection
};
