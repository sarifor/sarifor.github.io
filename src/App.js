import React, { Component } from 'react';
import { config } from './apikeys.js'; // "Use apikeys.js later than App.js"

class App extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    this._getVideos();
  }

  _getVideos = async () => { // Why aren't 'const' used?
    const videos = await this._callApi();
    this.setState({
      videos
    });
  };

  _callApi = () => {
    return fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${config.YOUTUBE_API_KEY}&videoId=Z9eqBrp_uR0&maxResults=5`
    ).then(response => response.json()) // If this line is not written, we cannot get correct data.
      // .then(json => json.data)
      // .catch(err => console.log(err));
  };

  _renderVideos = () => {
    const items = this.state.videos.items;
    console.log(items); // Success
    items.map(item => { // Fail
      return (
        <div>
          ${item}
        </div>
      )
    });
  };
  
  render() {
    const { videos } = this.state;

    return (
      <div>
        <p>Test</p>
        {videos ? this._renderVideos() : "Loading..."}
      </div>
    )
  }
}

export default App;
