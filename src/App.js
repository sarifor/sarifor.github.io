import React, { Component } from 'react';
import { config } from './apikeys.js'; // "Use apikeys.js later than App.js"

class App extends Component {
  state = {
    videos: "",
  };

  componentDidMount() {
    this._getVideos();
  }

  _getVideos = async () => { // Why aren't 'const' used?
    const response = await(
      await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${config.YOUTUBE_API_KEY}&videoId=Z9eqBrp_uR0&maxResults=5`
      )
    ).json();

    console.log(response);
  };

  _renderVideos = () => {
    //
  };
  
  render() {
    // const { videos } = this.state;

    return (
      <div>
        <p>Test</p>
        {/*{videos ? this._renderVideos() : "Loading..."}*/}
      </div>
    )
  }
}

export default App;
