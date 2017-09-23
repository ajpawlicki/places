import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Place from '../components/Place.jsx';

class PlacesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list">
          {this.props.places.map(place => <Place
            key={place.id} 
            place={place}
            dropMarker={this.props.dropMarker} />)}
      </div>
    );
  }
}

export default PlacesList;