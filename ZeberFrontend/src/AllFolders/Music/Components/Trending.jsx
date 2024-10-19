import React from 'react';

// The Trending component displays information about a trending audiobook and allows the user to start playback.
const Trending = ({ 
    playSong  //function to play the song (set isPlaying- true and setIndex)
 }) => {
    return (
        <div className="trending">
            <div className="left">
                <h5>Trending Audiobook</h5>
                <div className="info">
                    <h2>The Silent Patient</h2>
                    <h4>Alex Michaelides</h4>
                    <h5>42 Million Plays</h5>
                    <div className="buttons">
                        {/*button to play the trending song  */}
                        <button onClick={playSong}>Listen Now</button>
                        <i className='bx bxs-heart'></i>
                    </div>
                </div>
            </div>
            {/*trending song image  */}
            <img src="/MusicImages/shopping.webp" alt="Trending Audiobook"/>
        </div>
    );
};

export default Trending;

