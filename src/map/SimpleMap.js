import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const dotenv = require('dotenv');
dotenv.config();


const AnyReactComponent = ({ text }) => <div>{text.toString()}</div>;
 
class SimpleMap extends Component {


  static defaultProps = {
    center: {
      lat: 59.9,
      lng: 10.67
    },
    zoom: 11
  };
  

  apartmentMarkers(){


    if (!this.state || !this.state.apartments){
      return;
    } else{
      console.log("rendering apartments");
      //return;
      return this.state.apartments.map(apartment => {
        
        return <AnyReactComponent
        key={apartment._id}
        lat={apartment.latitude}
        lng={apartment.longitude}
        text={Math.round(parseFloat(apartment.price) / parseFloat(apartment.size), 2)}
      />
      });

    }
    

  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.apartmentMarkers()}
     
        </GoogleMapReact>
      </div>
    );
  }
componentDidMount() {
  console.log("sending request");
  axios.get('http://localhost:5000/map/')
   .then(response => {
     this.setState({ apartments: response.data });
     var printable = response.data.map(a => JSON.stringify(a));
     console.log("response: " + printable);
     this.setState({apartments:response.data});
     //this.state.apartments = response.data;
   })
   .catch((error) => {
      console.log("error with request: "  + error);
   })
}

}
 



export default SimpleMap;