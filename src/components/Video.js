import React from 'react'

const video = (props) => {
    return (
        <div>
          <img src={props.video.snippet.thumbnails.medium.url}  alt={props.video.snippet.title}
            onClick={props.videoClickHandler}/>
        </div>
    );
}
export default video;

