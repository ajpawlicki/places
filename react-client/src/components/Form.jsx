import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    }

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.onPlaceChange = this.onPlaceChange.bind(this);
  }

  componentDidMount() {
    this.addAutocomplete();
  }

  addAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), {
      types: ['(cities)']
    });

    this.setState({autocomplete: autocomplete});

    autocomplete.addListener('place_changed', this.onPlaceChange);
  }

  onPlaceChange() {
    const place = this.state.autocomplete.getPlace();
    this.setState({query: place});
  }

  handleSubmitForm(event) {
    event.preventDefault();
    const geometry = this.state.query.geometry;
    
    const lat = geometry.location.lat();
    const lng = geometry.location.lng();
    this.props.setCurrLocation({lat,lng});
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={this.handleSubmitForm}>
          <input 
          id="autocomplete"
          type="text"/>
          <input type="submit" value="Search"/>
        </form>
      </div>
    );
  }
}

export default Form;