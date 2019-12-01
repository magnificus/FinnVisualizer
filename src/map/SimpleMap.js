import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const dotenv = require('dotenv');
dotenv.config();


const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.9,
      lng: 10.67
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.9}
            lng={10.67}
            text="MarkerMan"
          />
        </GoogleMapReact>
      </div>
    );
  }

componentDidMount() {
  console.log("sending request");
  axios.get('http://localhost:5000/map/')
   .then(response => {
     this.setState({ apartments: response.data });
     console.log("response: " + response.data);
   })
   .catch((error) => {
      console.log(error);
   })
}

}
 



export default SimpleMap;