import React from 'react';

const MusicPlayer = ({
    song,
    isPlaying,          // Boolean indicating whether the song is currently playing
    togglePlayPause,    // Function to toggle play/pause state
    playNextSong,       // Function to play the next song in the playlist
    playPrevSong,       // Function to play the previous song in the playlist
    currentTime,        // Current playback time of the song in seconds
    duration,           // Total duration of the song in seconds
    onProgressChange,   // Function to handle changes in the playback progress
}) => {

        // If no song is provided, render nothing
    if (!song) return null;

    // Calculate the progress percentage of the current song
    const progress = (currentTime / duration) * 100 || 0;

    return (
        <div className="music-player">
             {/* Container for the top section of the music player */}
            <div className="top-section">
                <div className="header">
                    <h5>Player</h5>
                    <i className='bx bxs-playlist'></i>
                </div>

                  {/* Container for the song information */}
                <div className="song-info">
                    <img src={song.coverPath} alt={song.songName} />
                    <div className="description">
                        <h3>{song.songName}</h3>
                        <h5>Paulo Coelho</h5>
                        <p>Classic Fiction</p>
                    </div>

                     {/* Container for player controls */}
                    <div className="player-actions">
                        <div className="timeline">

                             {/* Range input for controlling the progress of the song */}
                            <input
                                type="range"
                                id="progressBar"
                                value={progress}
                                max="100"
                                step="0.1"
                                onChange={(e) => onProgressChange(e.target.value)}
                            />

                                 {/* Display the current time and duration of the song */}
                            <div id="currentTime">{formatTime(currentTime)}</div> / <div id="duration">{formatTime(duration)}</div>
                        </div>


                          {/**control button actions  */}
                        <div className="player-actions">
                            <div className="buttons">
                                <button id="prevBtn" className="control-btn" onClick={playPrevSong}>
                                    <i className="bx bx-first-page"></i>
                                </button>
                                <button id="masterPlay" className="control-btn" onClick={togglePlayPause}>
                                    <i className={isPlaying ? 'bx bx-pause-circle' : 'bx bx-play-circle'}></i>
                                </button>
                                <button id="nextBtn" className="control-btn" onClick={playNextSong}>
                                    <i className="bx bx-last-page"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Utility function to format time in MM:SS format
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export default MusicPlayer;
