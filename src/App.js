import React, { Component } from 'react';
import { config } from './apikeys.js'; // "Use apikeys.js later than App.js"

class App extends Component {
  state = { // Do not write 'videos: [],' inside, or error occurs.
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
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=1&videoId=Z9eqBrp_uR0&key=${config.YOUTUBE_API_KEY}`
    ).then(response => response.json()) // If this line is not written, we cannot get correct data.
      // .then(json => json.data)
      // .catch(err => console.log(err));
  };

  _renderVideos = () => {
    const items = this.state.videos.items.map(item => {
      return (
        <div>
          <div>
            Date: {item.snippet.topLevelComment.snippet.publishedAt}
          </div>
          <div>
            Comment: {item.snippet.topLevelComment.snippet.textDisplay}
          </div>
        </div>
      )
    });
    return items;
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
