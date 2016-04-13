var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var backboneMixin = require('backbone-react-component');

var CityCollection = require('../models/citymodel').CityCollection;
var LocationCollection = require('../models/locations').LocationCollection;
var CreatedLocationCollection = require('../models/createlocations').CreatedLocationCollection;

var Header = require('./header.jsx');

//////////////////////////////////////////
/////Global Variables and Utility Functions
/////////////////////////////////////////

var cityCollection = new CityCollection();
var locationCollection = new LocationCollection();
var createdLocationCollection = new CreatedLocationCollection();

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
//////////////////////////////////////////
/////City Selection Components
/////////////////////////////////////////
var CitySelect = React.createClass({
  mixins:[Backbone.React.Component.mixin],
    componentWillMount:function(){
      this.props.collection.fetch();
      console.log('fetched!!');
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
          <option value={model.get('id')}>{model.get('name')}</option>
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
          <option value={this.props.model.get('id')}>{this.props.model.get('name')}</option>
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
                <div className="col-md-8">
                  <form action="">
                    <div className="form-group">
                      <label htmlFor="">Date of Party</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Time of Party</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Party Name</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Description</label>
                      <input type="text" className="form-control"/>
                    </div>
                  </form>
                </div>
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
