import React from 'react';

//**Box container */
//receiving props from the AudioBookPlayer
const BoxContainer = ({ 
  songs,        //the song array 
  onPlaySong  // function to set the index and isPlaying to true when song from the list is clicked 
}) => (
  <div className='box-container'>
    <div className="outer">

      {/*mapping song  */}
      {songs.map((song, index) => (
        <div className="box" key={index}>
          <img src={song.coverPath} alt={song.songName} />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, commodi?</p>
          <button className="btn" onClick={() => onPlaySong(index)}>PLAY NOW</button>
        </div>
      ))}
    </div>
  </div>
);

export default BoxContainer;



