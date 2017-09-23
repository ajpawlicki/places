import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from '../src/components/Map.jsx';
import Form from '../src/components/Form.jsx';
import PlacesList from '../src/components/PlacesList.jsx';
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
  }

  updatePlaces(results) {
    this.setState({places: results});
  }

  setCurrLocation(location) {
    this.setState({currLocation: location});
  }

  render() {
    return (
      <div className="container">
        <div className="left-container">
          <Map currLocation={this.state.currLocation}
            updatePlaces={this.updatePlaces} />
        </div>
        <div className="right-container">
          <Form setCurrLocation={this.setCurrLocation} />
          <h2>Places:</h2>
          <PlacesList places={this.state.places} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));