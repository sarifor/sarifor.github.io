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

  _callApi = async () => {
    // Fetch latest infomation of five videos from a YouTube channel
    const latestFiveVideos = await fetch(`
      https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCkIu9pkxvDcnBs4Tl4seMFw&maxResults=5&order=date&type=video&key=${config.YOUTUBE_API_KEY}`
    ).then(response => response.json());

    // Extract video ids and put them into an array
    const videoIds = latestFiveVideos.items.map(item => item.id.videoId);

    // Fetch comments using YouTube api url including video id
    const videos = videoIds.map( async (videoId) => {
      const video = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=1&videoId=${videoId}&key=${config.YOUTUBE_API_KEY}`
      ).then(response => response.json());
      console.log(video); // Success
      return video;
    });
    console.log(videos); // Fail: [Promise, Promise, Promise, Promise, Promise]

    return await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=1&videoId=Z9eqBrp_uR0&key=${config.YOUTUBE_API_KEY}`
    ).then(response => response.json()); // If this line is not written, we cannot get correct data.
      // .then(json => json.data)
      // .catch(err => console.log(err));
  };

  _renderVideos = () => {
    const items = this.state.videos.items.map(item => { // forEach vs. map ?
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
