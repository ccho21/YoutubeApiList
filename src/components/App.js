import React, { Component } from "react";

import axios from "axios";
import SearchBar from "./SearchBar";
import Videos from "./Videos";
const KEY = "AIzaSyDlIb0JD3K9hjhICQXcHNCaQ0JtLNtwosM";

// init
//https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=CA&videoCategoryId=17&key={YOUR_API_KEY}

//search
// https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=axiyo&type=video&key=${KEY}
class App extends Component {
  state = {
    videos: [],
    fullVideo: null
  };
  // initially list the most popular videos in Canada
  componentDidMount() {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=9&chart=mostPopular&regionCode=CA&videoCategoryId=17&key=${KEY}`
      )
      .then(res => {
        const videos = [...res.data.items];
        const fullVideo = videos[0];
        const videoList = videos.slice(1);
        this.setState({
          videos: videoList,
          fullVideo: fullVideo
        });
      });
  }

  // request data based on search key word
  searchHandler = keyword => {
    const query = keyword.trim().toLowerCase();
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&order=viewCount&q=${query}&type=video&key=${KEY}`
      )
      .then(res => {
        const videos = [...res.data.items];
        const fullVideo = videos.shift();
        const videoList = videos.slice(1);
        
        this.setState({
          videos: videoList,
          fullVideo: fullVideo
        });
      })
      .catch(error => console.log("something went wrong! : ", error));
  };

  // request data for videos related to clicked video 
  videoClickHandler = (video) => {
    if (video) {
      // find proper id for video
      const id = video.id.hasOwnProperty("videoId")
        ? video.id.videoId
        : video.id;
      // store full videos and find related videos based on full clicked one.
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&relatedToVideoId=${id}&type=video+&key=${KEY}`
        )
        .then(res => {
          this.setState({
            videos: res.data.items,
            fullVideo: video
          });
        });
    }
  }
  render() {
    let videoList = "";
    if (this.state.videos.length > 0) {
      videoList = <Videos
        videos={this.state.videos}
        fullVideo={this.state.fullVideo}
        videoClickHandler={this.videoClickHandler} />;
    }
    return (
      <div className='App'>
        <SearchBar clicked={this.searchHandler} />
        {videoList}
      </div>
    );
  }
}

export default App;
