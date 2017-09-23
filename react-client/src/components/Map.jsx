import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import logo from '../img/cubs.png';

class Map extends Component {
  constructor(props) {
    super(props);

    this.nearbySearchCallback = this.nearbySearchCallback.bind(this);
    this.addMarker = this.addMarker.bind(this);
  }

  initMap (location) {
    const map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 16
    });
    
    const service = new google.maps.places.PlacesService(map);
    
    this.setState({
      map: map,
      // infoWindow: new google.maps.InfoWindow()
      service: service
    });

    service.nearbySearch({
      location: location,
      radius: 500,
      type: ['restaurant']
    }, this.nearbySearchCallback)
  }

  nearbySearchCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        place.marker = this.addMarker(place);
        // createMarker(results[i]);
      }
      
      this.props.updatePlaces(results);
      console.log('results:', results);
    }
  }

  addMarker(place) {
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
      position: place.geometry.location
    });

    const infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', () => {
      this.state.service.getDetails(place, (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }
        infoWindow.setContent(result.name);
        infoWindow.open(this.state.map, marker);
        setTimeout(() => infoWindow.close(), 2000);
      });
    });

    return marker;
  } 

  componentDidMount() {
    this.initMap(this.props.currLocation);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null && (nextProps.currLocation.lat !== this.props.currLocation.lat || nextProps.currLocation.lng !== this.props.currLocation.lng)) {
      this.state.map.setCenter(nextProps.currLocation);
      
      this.state.service.nearbySearch({
        location: nextProps.currLocation,
        radius: 500,
        type: ['store']
      }, this.nearbySearchCallback);
    }
  }

  render() {
    return (
      <div ref="map" className="map">
      </div>
    );
  }
}

export default Map;