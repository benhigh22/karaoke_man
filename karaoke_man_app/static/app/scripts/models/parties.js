var Backbone = require('backbone');
var $ = require('jquery');
var cityPartiesUrl;

var Party = Backbone.Model.extend({


    });

var PartyCollection = Backbone.Collection.extend({
    model:Party,

    url:function(){
      var city = $('#cities').val();
      cityPartiesUrl = '/api/cities/' + city + '/parties/';
      return(cityPartiesUrl);
      }
    });

module.exports={'PartyCollection':PartyCollection,
                'Party':Party};
