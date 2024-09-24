//Below is used and linked in index.html  
//<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Trending from './Components/Trending';
import Playlist from './Components/Playlist';
import Profile from './Components/Profile';
import MusicPlayer from './Components/MusicPlayer';
import "./music.css"

const Music = () => {
     // Array of song objects, each containing the song name, file path, and cover image path
     // supposed to be dynamic
    const songs = [
        { songName: "The Silent Patient", filePath: "songs/10.mp3", coverPath: "/MusicImages/shopping.webp" },
        { songName: "Robinson Crusoe", filePath: "songs/1.mp3", coverPath: "/MusicImages/best-novels-of-all-time-3-62c2f5a1643f1__700.jpg" },
        { songName: "Harry Potter", filePath: "songs/2.mp3", coverPath: "/MusicImages/Harry-Potter-and-the-Chamber-of-Secrets-book-cover.webp" },
        { songName: "All the Night We Cannot See", filePath: "songs/3.mp3", coverPath: "/MusicImages/product-jpeg-500x500.webp" },
        { songName: "1984", filePath: "songs/4.mp3", coverPath: "/MusicImages/images.jpg" }
    ];

    // states -------
    //sidebar(open/close)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    //song index 
    const [songIndex, setSongIndex] = useState(0);

    //song playing or not
    const [isPlaying, setIsPlaying] = useState(false);

    //current time while song playing 
    const [currentTime, setCurrentTime] = useState(0);

    //song duration 
    const [duration, setDuration] = useState(0);
    const audioElement = useRef(null);



    //Sidebar toggle function 
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        console.log(isSidebarOpen);
    };


    //function for setting the index of the song 
    const playSong = (index = songIndex) => {
        setSongIndex(index);
        setIsPlaying(true);
    };

   //toggle function play and pause the song 
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    //useEffect for play and pause song on isPlaying and songIndex
    useEffect(() => {
        if (isPlaying) {
            audioElement.current.play();
        } else {
            audioElement.current.pause();
        }
    }, [isPlaying, songIndex]);


    //function to play the next song 
    const playNextSong = () => {
        setSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };


    //function  to play the first song 
    const playPrevSong = () => {
        setSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    };

    const onTimeUpdate = () => {
        setCurrentTime(audioElement.current.currentTime);
        setDuration(audioElement.current.duration);
    };

    const onProgressChange = (value) => {
        audioElement.current.currentTime = (value / 100) * duration;
    };

    return (
        //music-container- wrapper component
        <div className='music-container'>
            {/* Sidebar component with open/close functionality */}
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />


            {/**main section  */}
            <main>
                  {/* Header component with sidebar toggle */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Trending section with a function to play the first song */}
                <Trending playSong={() => playSong(0)} />

                {/* Playlist component to list all available songs */}
                <Playlist songs={songs} playSong={playSong} />
            </main>

            {/*right section */}
            <div className='music-right-section' >
                {/*Profile section  */}
                <Profile />

                 {/* MusicPlayer component to control playback and display current song details */}
                <MusicPlayer
                    song={songs[songIndex]}
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                    playNextSong={playNextSong}
                    playPrevSong={playPrevSong}
                    currentTime={currentTime}
                    duration={duration}
                    onProgressChange={onProgressChange}
                />

                  {/* Audio element for playback */}
                <audio
                    ref={audioElement}
                    src={songs[songIndex].filePath}
                    onTimeUpdate={onTimeUpdate}
                    onEnded={playNextSong}
                />
            </div>
        </div>
    );
};

export default Music;


