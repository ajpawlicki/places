import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Place extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.dropMarker(this.props.place);
  }

  render() {
    return (
      <div onClick={this.handleClick}
        className="place-card">
        <p><b>{this.props.place.name}</b></p>
        <p>{this.props.place.vicinity}</p>
        <p>Type: {this.props.place.types[0].split('_').join(' ')}</p>
      </div>
    );
  }
}

export default Place;