import React, { Component } from 'react';
import Comment from './Comment';
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
    ).then(response => response.json())
      .catch(error => {
        console.log(error);

        // Return test object
        // Code
      });
    
    // Extract video ids and put them into an array
    const videoIds = latestFiveVideos.items.map(item => item.id.videoId);

    // Create an array of YouTube comment api url including video ids extracted
    const urls = videoIds.map((videoId) => 
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=1&videoId=${videoId}&key=${config.YOUTUBE_API_KEY}`
    );

    // Fetch each comment at the same time using YouTube comment api url including video ids extracted
    const videos = await Promise.all([fetch(urls[0]), fetch(urls[1]), fetch(urls[2]), fetch(urls[3]), fetch(urls[4])]).then(responses => {
      return Promise.all(responses.map(response => {
        return response.json();
      }));
    }).then(json => {
      const videos = json;
      return videos;
    }).catch(error => {
      console.log(error);

      // Return test object if api returns error or exceeds quota per day
      const videos = { // Type is JSON?
        "0": {
          "items": [
            {
              "snippet": {
                "topLevelComment": {
                  "snippet": {
                    "publishedAt": "2024/4/1",
                    "textDisplay": "Visit Australia"
                  }
                }
              }
            }
          ]
        },
        "1": {
          "items": [
            {
              "snippet": {
                "topLevelComment": {
                  "snippet": {
                    "publishedAt": "2024/4/2",
                    "textDisplay": "Wanna meet cockatoos!"
                  }
                }
              }
            }
          ]
        },
      }

      return videos;
    });

    return videos; // Must-use to return the result of _callApi() in _getVideos()
  };

  _renderVideos = () => {
    // Make array to include date and comment only
    const videos = this.state.videos;
    const dateAndComments = videos.filter((video) => video.items[0].snippet.topLevelComment.snippet.authorDisplayName === "앵무새사남매-루몽다로").map((video) => (
      {
        videoId: video.items[0].snippet.topLevelComment.snippet.videoId,
        date: video.items[0].snippet.topLevelComment.snippet.publishedAt,
        comment: video.items[0].snippet.topLevelComment.snippet.textDisplay,
      }
    ));

    // Return Comment components including dates and comments
    return (
      <>
        {dateAndComments.map((dateAndComment) => ( // ForEach vs. map ?
          <Comment
            color="#d3d3d3"
            videoId={dateAndComment.videoId}
            date={dateAndComment.date}
            comment={dateAndComment.comment}
          />      
        ))}  
      </>
    )
  };
  
  scrollToTop = () => {
    // const { scrollHeight, clientHeight } = this.box;
    this.box.scrollTop = 0;
  }

  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    }

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    }

    const { videos } = this.state;

    return (
      <div>
        <p>Video Info Collector</p>
        <div style={style} ref={(ref) => {this.box=ref}}> {/* ScrollBox Component */}
          <div style={innerStyle}>
           {videos ? this._renderVideos() : "Loading..."}
          </div>
        </div>
        <button onClick={() => this.scrollToTop()}>
          Go to Top
        </button>
      </div>
    )
  }
}

export default App;
