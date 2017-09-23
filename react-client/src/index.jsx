import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from '../src/components/Map.jsx';
import Form from '../src/components/Form.jsx';
import PlacesList from '../src/components/PlacesList.jsx';

import logo from './img/cubs.png';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currLocation: {
        lat: 41.9484,
        lng: -87.6553
      },
      places: []
    }

    this.updatePlaces = this.updatePlaces.bind(this);
    this.setCurrLocation = this.setCurrLocation.bind(this);
    this.setMapAndService = this.setMapAndService.bind(this);
    this.dropMarker = this.dropMarker.bind(this);
  }

  updatePlaces(results) {
    this.setState({places: results});
  }

  setCurrLocation(location) {
    this.setState({currLocation: location});
  }

  setMapAndService({map, service}) {
    this.setState({map: map, service: service});
  }

  dropMarker(place) {
    const icon = new google.maps.MarkerImage(
      logo,
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(50, 50),
    );

    const marker = new google.maps.Marker({
      map: this.state.map,
      icon: icon,
      position: place.geometry.location,
      animation: google.maps.Animation.DROP
    });

    const infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'mouseover', () => {
      this.state.service.getDetails(place, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        infoWindow.setContent(result.name);
        infoWindow.open(this.state.map, marker);
        setTimeout(() => infoWindow.close(), 1000);
      });
    });

    google.maps.event.addListener(marker, 'click', () => {
      this.state.service.getDetails(place, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        marker.setVisible(false);
      });
    });

    // return marker;
  }

  render() {
    return (
      <div className="container">
        <div className="left-container">
          <Map currLocation={this.state.currLocation}
            updatePlaces={this.updatePlaces}
            setMapAndService={this.setMapAndService}
            map={this.state.map}
            service={this.state.service} />
        </div>
        <div className="right-container">
          <Form setCurrLocation={this.setCurrLocation} />
          <h2>Places:</h2>
          <PlacesList
            places={this.state.places} 
            dropMarker={this.dropMarker}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));