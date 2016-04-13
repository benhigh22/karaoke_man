var Backbone = require('backbone');
var $ = require('jquery');
var locationsUrl;

var Location = Backbone.Model.extend({


    });

var LocationCollection = Backbone.Collection.extend({
    model:Location,

    url:function(){
      var user = Number(localStorage.getItem('user'));
      locationsUrl = '/api/users/' + user + '/locations/';
      return(locationsUrl);
      }
    });

module.exports={'LocationCollection':LocationCollection,
                'Location':Location};
