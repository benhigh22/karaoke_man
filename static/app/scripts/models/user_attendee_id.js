var Backbone = require('backbone');
var curId;
var Attendee = Backbone.Model.extend({
      defaults:{
        user:'user',
        party:'party'
      }
    });

var UserAttendeeCollection = Backbone.Collection.extend({
      initialize: function(id){
        curId=id;
      },
      model:Attendee,

      url:function(){
        var UserId = Number(localStorage.getItem('user'));
        var attendeeUrl = '/api/users/' + UserId + '/parties/' + curId.partyId + '/';
        return(attendeeUrl);
       }
    });

module.exports=UserAttendeeCollection;
