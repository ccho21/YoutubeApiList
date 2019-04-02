import React, { Component } from 'react';
import Video from './Video';
import FullVideo from './FullVideo';
class Videos extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let videos = this.props.videos;
        if (videos) {
            videos = videos.map((video, i) => {
                return (
                    <Video
                        video={video}
                        key={video.id+i}
                        videoClickHandler={() => this.props.videoClickHandler(video)}
                    />
                );
            });
        }
        return (
            <div className="container text-center">
                <div className="grid-container m-auto">
                    <FullVideo
                        fullVideo={this.props.fullVideo}
                    />
                    {videos}
                </div>
            </div>
        );
    }
}
export default Videos;