var Backbone = require('backbone');
var $ = require('jquery');
var cityPartiesUrl;
var Party = Backbone.Model.extend({


    });

var PartyCollection = Backbone.Collection.extend({
    model:Party,
    initialize:function(){
      var city = $('#cities').val();
      console.log(city);
      var cityPartiesUrl = '/api/' + city + '/parties'
    },
    url:cityPartiesUrl
    });

module.exports={'PartyCollection':PartyCollection,
                'Party':Party};
