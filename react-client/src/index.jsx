import React from 'react';
import ReactDOM from 'react-dom';

const {Component} = React;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));