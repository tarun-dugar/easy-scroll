import React, { Component } from 'react';
import easyScroll from './src';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  componentDidMount() {
    easyScroll({
      'scrollableDomEle': window,
      'direction': 'right',
      'duration': 3000,
      'cubicBezierPoints': {
        'x1': 0,
        'y1': 0.9,
        'x2': 0.9,
        'y2': 1
      },
      'onRefUpdateCallback': () => {
        console.log('lalala');
      },
      'onAnimationCompleteCallback': () => {
        console.log('helo');
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="card" style={{'backgroundColor': 'red'}}></div>
          <div className="card" style={{'backgroundColor': 'yellow'}}></div>
          <div className="card" style={{'backgroundColor': 'orange'}}></div>
          <div className="card" style={{'backgroundColor': 'blue'}}></div>
          <div className="card" style={{'backgroundColor': 'violet'}}></div>
          <div className="card" style={{'backgroundColor': 'green'}}></div>
          <div className="card" style={{'backgroundColor': 'black'}}></div>      
        </div>
      </div>
    );
  }
}

export default App;
