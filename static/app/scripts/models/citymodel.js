var Backbone = require('backbone');


var CityModel = Backbone.Model.extend({


    });

var CityCollection = Backbone.Collection.extend({
    model:CityModel,
    url:'/api/cities/'
    });

module.exports={'CityCollection':CityCollection,
                'CityModel':CityModel};
