var Backbone = require('backbone');
var $ = require('jquery');
var createLocationsUrl;

var CreatedLocation = Backbone.Model.extend({


    });

var CreatedLocationCollection = Backbone.Collection.extend({
    model:CreatedLocation,

    url:function(){
      var city = $('#cities').val();
      createLocationsUrl = '/api/cities/' + city + '/locations/';
      return(createLocationsUrl);
      }
    });

module.exports={'CreatedLocationCollection':CreatedLocationCollection,
                'CreatedLocation':CreatedLocation};
