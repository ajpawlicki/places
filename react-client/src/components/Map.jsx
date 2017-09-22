import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      infoWindow: null
    };
  }

  initMap (location) {
    const map = new google.maps.Map(this.refs.map, {
      center: location,
      zoom: 13
    });

    this.setState({
      map: map,
      // infoWindow: new google.maps.InfoWindow()
    });
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