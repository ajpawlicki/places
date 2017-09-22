import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from '../src/components/Map.jsx';
import Form from '../src/components/Form.jsx';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currLocation: {
        lat: 41.9484,
        lng: -87.6553
      },
      searchResults: []
    }

    this.saveSearchResults = this.saveSearchResults.bind(this);
    this.setCurrLocation = this.setCurrLocation.bind(this);
  }

  saveSearchResults(results) {
    this.setState({searchResults: results});
  }

  setCurrLocation(location) {
    this.setState({currLocation: location});
  }

  render() {
    return (
      <div>
        <Form setCurrLocation={this.setCurrLocation}/>
        <Map currLocation={this.state.currLocation} saveSearchResults={this.saveSearchResults} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));