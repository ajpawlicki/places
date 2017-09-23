import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import logo from '../img/cubs.png';

class Map extends Component {
  constructor(props) {
    super(props);

    this.nearbySearchCallback = this.nearbySearchCallback.bind(this);
  }

  initMap (location) {
    const map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 16
    });
    
    const service = new google.maps.places.PlacesService(map);
    
    this.props.setMapAndService({map, service});

    service.nearbySearch({
      location: location,
      radius: 500,
      type: ['restaurant']
    }, this.nearbySearchCallback)
  }

  nearbySearchCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.props.updatePlaces(results);
      console.log('results:', results);
    }
  }

  componentDidMount() {
    this.initMap(this.props.currLocation);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== null && (nextProps.currLocation.lat !== this.props.currLocation.lat || nextProps.currLocation.lng !== this.props.currLocation.lng)) {
      this.props.map.setCenter(nextProps.currLocation);
      
      this.props.service.nearbySearch({
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