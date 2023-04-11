import React, { Component } from 'react';
import Comment from './Comment';
// import { config } from './apikeys.js'; // "Use apikeys.js later than App.js"

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
    /* const latestFiveVideos = await fetch(`
      https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCkIu9pkxvDcnBs4Tl4seMFw&maxResults=5&order=date&type=video&key=${config.YOUTUBE_API_KEY}`
    ).then(response => response.json());

    // Extract video ids and put them into an array
    const videoIds = latestFiveVideos.items.map(item => item.id.videoId);

    // Create an array of YouTube comment api url including video ids extracted
    const urls = videoIds.map((videoId) => 
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=1&videoId=${videoId}&key=${config.YOUTUBE_API_KEY}`
    );

    // Fetch each comment at the same time using YouTube comment api url including video ids extracted
    Promise.all([fetch(urls[0]), fetch(urls[1]), fetch(urls[2]), fetch(urls[3]), fetch(urls[4])]).then(responses => {
      return Promise.all(responses.map(response => {
        return response.json();
      }));
    }).then(json => {
      console.log(json); // Successfully fetched
    }).catch(error => {
      console.log(error);
    }); */

    // Fetch a video's comment
    const videos = { // Test data while YouTube api request quota per day is exceeded
      "items": [
        {
          "snippet": {
            "topLevelComment" : {
              "snippet": {
                "publishedAt": "2024/4/1",
                "textDisplay": "I love parrot!"
              }
            }
          }
        },
        {
          "snippet": {
            "topLevelComment" : {
              "snippet": {
                "publishedAt": "2024/4/2",
                "textDisplay": "Rumongdaro has made me love parrot!"
              }
            }
          }
        },          
      ],
    };
    console.log(videos);
    return videos;

    /* return await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=1&videoId=Z9eqBrp_uR0&key=${config.YOUTUBE_API_KEY}`
    ).then(response => response.json()); // If this line is not written, we cannot get correct data.
      // .then(json => json.data)
      // .catch(err => console.log(err)); */
  };

  _renderVideos = () => {
    const items = this.state.videos.items;
    return (
      <>
        {items.map((item) => ( // ForEach vs. map ?
          <Comment
            color="#d3d3d3" 
            date={item.snippet.topLevelComment.snippet.publishedAt}
            comment={item.snippet.topLevelComment.snippet.textDisplay}
          />      
        ))}  
      </>
    )
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
