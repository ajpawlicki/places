import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Map from '../src/components/Map.jsx';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currLocation: {
        lat: 41.9484,
        lng: -87.6553
      }
    }
  }

  render() {
    return (
      <div>
        <Map currLocation={this.state.currLocation} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));