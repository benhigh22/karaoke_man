var Backbone = require('backbone');
var curId;
var QueueItem = Backbone.Model.extend({


    });

var QueueItemCollection = Backbone.Collection.extend({
      initialize: function(id){
        console.log(id);
        curId=id;
        
      },
      model:QueueItem,

      url:function(){
        var queueUrl = '/api/parties/' + curId.partyId + '/songqueues/';
        return(queueUrl);
       }
    });

module.exports={'QueueItemCollection':QueueItemCollection,
                'QueueItem':QueueItem};
