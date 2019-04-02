import React from "react";

const fullVideo = props => {
    const id = props.fullVideo.id.hasOwnProperty('videoId') ? props.fullVideo.id.videoId : props.fullVideo.id;
    const url = `https://www.youtube.com/embed/${id}`
    return (
        <div>
            <iframe src={url} allowFullScreen title={props.title} />
            <div className="full-video__caption">
                <h4>{props.fullVideo.snippet.title}</h4>
                {props.fullVideo.snippet.description}
            </div>
        </div>
    );
};
export default fullVideo;
