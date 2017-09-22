import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      infoWindow: null
    };

    this.nearbySearchCallback = this.nearbySearchCallback.bind(this);
  }

  initMap (location) {
    const map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 13
    });

    this.setState({
      map: map,
      // infoWindow: new google.maps.InfoWindow()
      // service: new google.maps.places.PlacesService(map)
    });

    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch({
      location: location,
      radius: 500,
      type: ['restaurant']
    }, this.nearbySearchCallback)
  }

  nearbySearchCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        // createMarker(results[i]);
      }
      
      this.props.saveSearchResults(results);
      console.log('results:', results);
    }
  }

  componentDidMount() {
    this.initMap(this.props.currLocation);
  }

  render() {
    return (
      <div ref="map" className="map">
      </div>
    );
  }
}

export default Map;