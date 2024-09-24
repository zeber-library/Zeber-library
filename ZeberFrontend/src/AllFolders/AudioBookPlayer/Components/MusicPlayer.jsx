import React from "react";

//receiving props from the AudioBookPlayer
const MusicPlayer = ({
  song, // Current song object containing details like coverPath, songName, author, and genre
  onPrev, // Function to handle the previous song action
  onNext, // Function to handle the next song action
  onTogglePlay, // Function to toggle play/pause
  isPlaying, // Boolean indicating if the song is currently playing
  progress, // Current progress of the song as a percentage
  onSeek, // Function to handle seeking through the song
  currentTime, // Current playback time of the song
  duration, // Total duration of the song
}) => (
  <div className="thill-right-section">
    <div className="music-player">
      {/* Top section containing the player header and song information */}
      <div className="top-section">
        <div className="header">
          <h5>Player</h5>
          {/* Icon for playlist, you can attach a click event to this if needed
          */}
          <i className="bx bxs-playlist"></i>
        </div>

        {/* Displaying the current song's cover image and details */}
        <div className="song-info">
          <img src={song.coverPath} alt="Current Song" />
          <div className="description">
            <h3>{song.songName}</h3>
            <h5>{song.author}</h5>
            <p>{song.genre}</p>
          </div>
        </div>
         {/* Section for player controls and timeline */}
        <div className="player-actions">
          {/* Timeline section with a seek bar and time display */}
          <div className="timeline">
            <input
              type="range"
              id="progressBar"
              value={progress}   // Bind progress to the slider value
              max="100"
              step="0.1"
              onChange={onSeek}  // Update progress when the user interacts with the slider
            />

            {/* Display current time and duration */}
            <div id="currentTime">{currentTime}</div> /{" "}
            <div id="duration">{duration}</div>
          </div>

           {/* Control buttons for previous, play/pause, and next */}
          <div className="player-actions">
            <div className="buttons">

              {/**for previous song */}
              <button id="prevBtn" className="control-btn" onClick={onPrev}>
                <i className="bx bx-first-page"></i>
              </button>

              {/**for play and pause */}
              <button
                id="masterPlay"
                className="control-btn"
                onClick={onTogglePlay}
              >
                <i
                  className={`bx ${
                    isPlaying ? "bx-pause-circle" : "bx-play-circle"
                  }`}
                ></i>
              </button>

              {/**for next song  */}
              <button id="nextBtn" className="control-btn" onClick={onNext}>
                <i className="bx bx-last-page"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MusicPlayer;
