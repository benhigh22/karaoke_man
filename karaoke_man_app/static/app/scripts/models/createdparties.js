var Backbone = require('backbone');
var $ = require('jquery');
var MyPartiesUrl;

var UserCreatedParty = Backbone.Model.extend({


    });

var UserCreatedPartyCollection = Backbone.Collection.extend({
    model:UserCreatedParty,

    url:function(){
      var user = Number(localStorage.getItem('user'));
      MyPartiesUrl = '/api/users/' + user + '/parties/';
      return(MyPartiesUrl);
      }
    });

module.exports={'UserPartyCollection':UserCreatedPartyCollection,
                'UserParty':UserCreatedParty};
