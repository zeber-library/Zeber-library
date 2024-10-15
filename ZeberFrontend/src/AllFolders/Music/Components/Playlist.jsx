import React from 'react';

//songs is the array of the songs and the playsong is the function to set the state isPlayin=true and setIndex 
const PlayList = ({ 
    songs,   //song array 
    playSong  // function to play the song 
}) => {
    return (
        <div className="playlist">
            {/* Generes  */}
            <div className="genres">
                <div className="header">
                    <h5>Genres</h5>
                    <a href="#">See all</a>
                </div>

                <div className="items">
                    <div className="item">
                        <a href="thill.html">
                            <p>Thriller<br/>Suspense</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="sci.html">
                            <p>Science<br/>Fiction</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="bus.html">
                            <p>Business<br/>Development</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="person.html">
                            <p>Personality<br/>Development</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="history.html">
                            <p>History<br/>Biography</p>
                        </a>
                    </div>
                    <div className="item">
                        <a href="classic.html">
                            <p>Classics<br/>Literature</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Top AudioBook section  */}
            <div className="music-list">
                <div className="header">
                    <h5>Top Audiobooks</h5>
                    <a href="#">See all</a>
                </div>
                <div className="items">
                    {songs.map((song, index) => (
                        <div className="item" key={index}>
                            <div className="info">
                                <p>{index + 1}</p>
                                <img src={song.coverPath} alt={song.songName}/>
                                <div className="details">
                                    <h5>{song.songName}</h5>
                                    <p>song name</p>
                                </div>
                            </div>
                            <div className="actions">
                                <i
                                    className='bx bx-play-circle icon'
                                    onClick={() => playSong(index)}
                                ></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayList;
