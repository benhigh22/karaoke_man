var Backbone = require('backbone');

var User = Backbone.Model.extend({
  defaults:{
    username:'johndoe',
    password:'safepass'
  },

});
var UserCollection =Backbone.Collection.extend({
  model:User,
  url:'http://127.0.0.1:8000/api/users/'

});

module.exports={
  'User':User,
  'UserCollection':UserCollection
};
