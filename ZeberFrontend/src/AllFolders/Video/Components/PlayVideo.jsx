import React from 'react';

const PlayVideo =({ playVideo, setPlayVideo }) =>{

  //if no video to play return null 
  if (!playVideo) return null;

  //function to close the current video playing 
  const closeVideo = () => {
    setPlayVideo(null);
  };

  return (
    <div className="playVideo" style={{ top: '0' }}>
      {/**close button */}
      <span className="closeBtn" onClick={closeVideo}>
        <i className="fa fa-xmark"></i>
      </span>

      {/*iframe tag for playing the video  */}
      <iframe
        src={playVideo.replace('watch?v=', 'embed/')}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default PlayVideo;

