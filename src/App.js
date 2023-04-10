import React, { Component } from 'react';
import ScrollBox from './ScrollBox.js';

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => this.scrollBox=ref}/>
        <button onClick={() => this.scrollBox.scrollToBottom()}>
            Go to Bottom
        </button>
      </div>
    )
  }
}

export default App;
