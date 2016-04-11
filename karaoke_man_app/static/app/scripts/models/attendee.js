var Backbone = require('backbone');
var curId;
var Attendee = Backbone.Model.extend({
      defaults:{
        user:'user',
        party:'party'
      }
    });

var AttendeeCollection = Backbone.Collection.extend({
      initialize: function(id){
        console.log(id);
        curId=id;
      },
      model:Attendee,

      url:function(){
        var attendeeUrl = 'api/parties/' + curId.partyId + '/attendees/';
        return(attendeeUrl);
       }
    });

module.exports={'AttendeeCollection':AttendeeCollection,
                'Attendee':Attendee};
