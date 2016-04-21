var React = require('react');
var ReactDom = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

var AboutUs = React.createClass({
      render:function(){
        return(
          <div>
              <div className="container">
                <Header />
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="our_names">About The Karaoke Man</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="about_us">Get to know the developers behind The Karaoke Man, as well as what inspired this free application!</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 pics">
                    <img src="/static/dist/images/Ben Headshot.jpg" className="img-rounded" alt="Responsive image"/>
                    <h4 className="our_names">Benjamin High</h4>
                    <p>Ben is a BackEnd Software Developer and Karaoke connoisseur. However, due to the outrageous price of
                    Karaoke software, parties he hosted often ended up with a sticky note queue and youtube searches.
                    Unorganization of that process left Ben thinking there had to be a better way, and The Karaoke Man was
                    born.</p>
                  </div>
                  <div className="col-md-4 pics">
                      <img src="/static/dist/images/karaokeman.png" className="img-rounded" alt="Responsive image"/>
                  </div>
                  <div className="col-md-4 pics">
                      <img src="/static/dist/images/austin.jpeg" className="img-rounded" alt="Responsive image"/>
                      <h4 className="our_names">Austin Williams</h4>
                      <p>Austin is a FrontEnd Software Developer and Graphic Designer. After hearing about the idea of The Karaoke Man,
                        offered his services to the development of the app. He created The Karaoke Man logo, and designed the
                        majority of the site, while also using Javascript to make components dynamic.</p>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
        );
      }
    });
module.exports = AboutUs;
