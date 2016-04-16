var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
require('jquery-ui');
var moment = require('moment');
var backboneMixin = require('backbone-react-component');

var CityCollection = require('../models/citymodel').CityCollection;
var LocationCollection = require('../models/locations').LocationCollection;
var CreatedLocationCollection = require('../models/createlocations').CreatedLocationCollection;
var UserPartyCollection = require('../models/createdParties').UserPartyCollection;
var Header = require('./header.jsx');

//////////////////////////////////////////
/////Global Variables and Utility Functions
/////////////////////////////////////////

var cityCollection = new CityCollection();
var locationCollection = new LocationCollection();
var createdLocationCollection = new CreatedLocationCollection();
var userPartyCollection = new UserPartyCollection();
var cityId;

var csrftoken = $("input[name='csrfmiddlewaretoken']").val();
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$.fn.serializeObject = function() {
  return this.serializeArray().reduce(function(acum, i) {
    acum[i.name] = i.value;
    return acum;
  }, {});
};
//////////////////////////////////////////
/////City Selection Components
/////////////////////////////////////////
var CitySelect = React.createClass({
  mixins:[Backbone.React.Component.mixin],
    componentWillMount:function(){
      this.props.collection.fetch();

    },
    render:function(){
      var cities = this.props.collection.map(function(model){
        return(
          <CityItems model={model} key={model.get('id')} />
        );
      });
      return(
        <div className="selection-wrapper">
          <select name="cities" id="cities">
            {cities}
          </select>
        </div>
        );
      }
    });

var CityItems = React.createClass({
      render:function(){
        var model = this.props.model;
        return(
          <option value={model.get('id')} >{model.get('name')}</option>
        );
      }
    });

//////////////////////////////////////////
/////Location Selection Components
/////////////////////////////////////////
var LocationSelect = React.createClass({
mixins:[Backbone.React.Component.mixin],

      componentWillMount:function(){
        this.props.collection.fetch()
        console.log('locationsFetched');
      },
      render:function(){
        var locations = this.props.collection.map(function(model){
          return(
            <LocationItem model={model} key={model.get('id')} />
          );
        });
        return(
          <div className="selection-wrapper">
            <select name="locations" id="locations">
              {locations}
            </select>
          </div>
        );
      }
    });
var LocationItem = React.createClass({
      render:function(){
        return(
          <option value={this.props.model.get('id').toString() + ' ' + this.props.model.get('city').toString()}>{this.props.model.get('name')}</option>
        );
      }
    });
var NewLocationForm = React.createClass({
    addLocation:function(e){
      e.preventDefault();
      this.props.collection.create(
        {
          street_address:$('#address').val(),
          name:$('#locationName').val(),
          city:$('#cities').val(),
          user:Number(localStorage.getItem('user'))
        }
      );
      this.props.showForm();

    },
    render:function(){
      return(
        <form action="" onSubmit={this.addLocation}>
          <CitySelect collection={cityCollection}/>
          <div className="form-group">
            <label htmlFor="">Address of Location</label>
            <input type="text" className="form-control" id='address'/>
          </div>
          <div className="form-group">
            <label htmlFor="">Location Name</label>
            <input type="text" className="form-control" id='locationName'/>
          </div>
          <button type="submit">Add Location</button>
        </form>
      );
    }
    });
var CreatePartyForm = React.createClass({
      componentDidMount:function(){
        $( "#datepicker" ).datepicker({
          changeMonth: true,//this option for allowing user to select month
          changeYear: true //this option for allowing user to select from year range
        });

      },
      handleSubmit:function(e){
        e.preventDefault();
        var date = ($("#datepicker").val());
        var newDate = moment(date).format('YYYY-MM-DD');
        var time = ($("#time").val());
        console.log($("#locations").val());
        var splitValues= $('#locations').val().split(' ');
        console.log(splitValues);

        var createUrl = '/api/locations/'+splitValues[0]+'/parties/';
        $.post(createUrl,{
          "date_of_party":newDate,
          "time_of_party":time,
          "party_name":$("#party_name").val(),
          "description":$("#description").val(),
          "location": splitValues[0],
          "city": splitValues[1],
          "creator": Number(localStorage.getItem('user'))
        },function(){
          alert('successfully posted');
          Backbone.history.navigate('user',{trigger:true, replace: true});
          },"json");
      },
      render:function(){
        return(
          <div className="col-md-8">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="">Date of Party</label>
                <input type="text" name="date_of_party" className="form-control" id="datepicker"/>
              </div>
              <div className="form-group">
                <label htmlFor="">Time of Party</label>
                <input type="text" name="time_of_party"id="time" className="form-control"/>
              </div>
              <div className="form-group">
                <label htmlFor="">Party Name</label>
                <input type="text" name="party_name" className="form-control" id="party_name"/>
              </div>
              <div className="form-group">
                <label htmlFor="">Description</label>
                <input type="text" name="description" className="form-control" id="description"/>
              </div>
              <button type="submit"> Create Your Party </button>
            </form>
          </div>
        )
      }
    });
//////////////////////////////////////////
/////Entire Page Component
/////////////////////////////////////////
var PartyCreatePage = React.createClass({
    getInitialState:function(){
        return {'showLocationForm':false};
    },
    showLocationForm:function(){
        console.log('Add Song Displayed');
        if(this.state.showLocationForm===false){
        this.setState({'showLocationForm':true});
        }
        else{
        this.setState({'showLocationForm':false});
        }
    },
    render:function(){
      return(
        <div className='container'>
          <Header />
            <div className="row">
              <h1> Create a New  Karaoke Party</h1>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <CreatePartyForm collection={userPartyCollection}/>
                  <div className="col-md-4">
                    <h4>Choose From an existing Location</h4>
                    <LocationSelect collection={locationCollection}/>
                    <h4>Create New Location</h4>
                    <button className="btn btn-primary" onClick={this.showLocationForm}>NEW</button>
                    {this.state.showLocationForm ? <NewLocationForm collection={createdLocationCollection} showForm={this.showLocationForm}/> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });

  module.exports=PartyCreatePage;
