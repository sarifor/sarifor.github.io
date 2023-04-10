import React, { Component } from 'react';
import Comment from './Comment.js';

class App extends Component {
  state = {
    videos: "",
  };

  componentDidMount() {
    //
  }

  _getVideos = () => {
    //
  };

  _renderVideos = () => {
    //
  }
  
  render() {
    const { videos } = this.state;

    return (
      <div>
          <Comment />
      </div>
    )
  }
}

export default App;
