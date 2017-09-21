import React from 'react';
import ReactDOM from 'react-dom';

const {Component} = React;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('test');
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));