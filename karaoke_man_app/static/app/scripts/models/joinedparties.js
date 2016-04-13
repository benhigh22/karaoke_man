var Backbone = require('backbone');
var $ = require('jquery');
var joinedPartiesUrl;

var JoinedParty = Backbone.Model.extend({


    });

var JoinedPartyCollection = Backbone.Collection.extend({
    model:JoinedParty,

    url:function(){
      var user = Number(localStorage.getItem('user'));
      joinedPartiesUrl = '/api/users/' + user + '/attendees/';
      return(joinedPartiesUrl);
      }
    });

module.exports={'JoinedPartyCollection': JoinedPartyCollection,
                'JoinedParty': JoinedParty};
