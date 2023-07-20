import React, { Component } from 'react';
import ScrollBox from './ScrollBox';
import Comment from './Comment';

class App extends Component {
  state = { // Do not write 'videos: [],' inside, or error occurs.
  };

  testData = [
    {
      "items": [
        {
          "snippet": {
            "topLevelComment": {
              "snippet": {
                "publishedAt": "2024/4/1 (test data from client)",
                "textDisplay": "Visit Australia (test data from client)",
                "authorDisplayName": "앵무새사남매-루몽다로"
              }
            }
          }
        }
      ]
    },
    {
      "items": [
        {
          "snippet": {
            "topLevelComment": {
              "snippet": {
                "publishedAt": "2024/4/2 (test data from client)",
                "textDisplay": "Wanna meet cockatoos! (test data from client)",
                "authorDisplayName": "앵무새사남매-루몽다로"
              }
            }
          }
        }
      ]
    },
  ];

  componentDidMount() {
    this._getVideos();
  }

  _getVideos = async () => { // Why aren't 'const' used?
    try {
      const videos = await this._callApi();
      this.setState({
        videos
      });      
    } catch (e) {    
      const videos = this.testData; 
      this.setState({
        videos
      });      
    }
  };

  _callApi = async () => {
    const response = await fetch("https://sariforapps.net")
    const videos = response.json(); // Response must be converted to json
    return videos;
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
        <ScrollBox ref={(ref) => this.scrollBox=ref}>
          {dateAndComments.map((dateAndComment) => ( // ForEach vs. map ?
            <Comment
              color="#d3d3d3"
              videoId={dateAndComment.videoId}
              date={dateAndComment.date}
              comment={dateAndComment.comment}
            />      
          ))}
        </ScrollBox>
      </>
    )
  };
  
  render() {
    const { videos } = this.state;

    return (
      <div>
        <p>Video Info Collector</p>
        {videos ? this._renderVideos() : "Loading..."}
        <button onClick={() => this.scrollBox.scrollToTop()}>
          Go to Top
        </button>
      </div>
    )
  }
}

export default App;
