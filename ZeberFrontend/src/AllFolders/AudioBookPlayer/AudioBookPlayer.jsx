import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import BoxContainer from './Components/BoxContainer';
import MusicPlayer from './Components/MusicPlayer';
import "./thill.css"

//songs array ---- will be dynamic
const songs = [
  { songName: "The Silent Patient", filePath: "/songs/10.mp3", coverPath: "/AudioBookPlayer/images/shopping.webp", author: "Author 1", genre: "Genre 1" },
  { songName: "Robinson Crusoe", filePath: "/songs/3.mp3", coverPath: "/AudioBookPlayer/images/best-novels-of-all-time-3-62c2f5a1643f1__700.jpg", author: "Author 2", genre: "Genre 2" },
  { songName: "Harry Potter", filePath: "/songs/6.mp3", coverPath: "/AudioBookPlayer/images/Harry-Potter-and-the-Chamber-of-Secrets-book-cover.webp", author: "Author 3", genre: "Genre 3" },
  { songName: "All the Night We Cannot See", filePath: "/songs/3.mp3", coverPath: "/AudioBookPlayer/images/product-jpeg-500x500.webp", author: "Author 4", genre: "Genre 4" },
  { songName: "1984", filePath: "/songs/8.mp3", coverPath: "/AudioBookPlayer/images/images.jpg", author: "Author 5", genre: "Genre 5" },
  { songName: "Soul", filePath: "/songs/5.mp3", coverPath: "/AudioBookPlayer/images/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg", author: "Author 6", genre: "Genre 6" }
];

const AudioBookPlayer = () => {

  //!use state 
  //for sidebar open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //for setting the song index
  const [songIndex, setSongIndex] = useState(0);
  //for isPlaying 
  const [isPlaying, setIsPlaying] = useState(false);
  //for progress of song while playing 
  const [progress, setProgress] = useState(0);

//reference to the audio element being clicked for playing
const audioElement = useRef(new Audio(songs[0].filePath));

  //for song time 
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");




   //!function to toggle the sidebar 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };


  //!useEffect for 
  useEffect(() => {
    // Function to update the progress of the audio playback
    const updateProgress = () => {
      // Calculate the progress percentage based on the current time and total duration
      if (audioElement.current.duration) {
        const progressPercent = (audioElement.current.currentTime / audioElement.current.duration) * 100;
        setProgress(progressPercent);

        // Calculate and format the current time in minutes and seconds
        const currentMinutes = Math.floor(audioElement.current.currentTime / 60);
        const currentSeconds = Math.floor(audioElement.current.currentTime % 60).toString().padStart(2, '0');

        // Calculate and format the total duration in minutes andseconds
        const durationMinutes = Math.floor(audioElement.current.duration / 60);
        const durationSeconds = Math.floor(audioElement.current.duration % 60).toString().padStart(2, '0');
        setCurrentTime(`${currentMinutes}:${currentSeconds}`);
        setDuration(`${durationMinutes}:${durationSeconds}`);
      }
    };
    // Add event listener to update progress as the audio plays
    audioElement.current.addEventListener('timeupdate', updateProgress);
    // Add event listener to handle the end of the song and play thenextsong
    audioElement.current.addEventListener('ended', playNextSong);

     // Cleanup function to remove the event listeners when the component unmounts or songIndex changes
    return () => {
      audioElement.current.removeEventListener('timeupdate', updateProgress);
      audioElement.current.removeEventListener('ended', playNextSong);
    };
  }, [songIndex]);


  //function to play song and setplaying to true 
  const playSong = () => {
    audioElement.current.src = songs[songIndex].filePath;
    audioElement.current.currentTime = 0;
    audioElement.current.play();
    setIsPlaying(true);
  };

  //for toglling between play and pause 
  const togglePlay = () => {
    if (isPlaying) {
      audioElement.current.pause();
    } else {
      playSong();
    }
    setIsPlaying(!isPlaying);
  };


  //for playing the next song 
  const playNextSong = () => {
    setSongIndex((songIndex + 1) % songs.length);
    playSong();
  };

  //for playing the previous song 
  const playPrevSong = () => {
    setSongIndex((songIndex - 1 + songs.length) % songs.length);
    playSong();
  };


  //for the slider input tag in the music player 
  const seek = (event) => {
    // Calculate the new time to seek to, based on the slider's value and the total duration of the audio
    const seekTime = (audioElement.current.duration * (event.target.value / 100));
     // Update the current time of the audio to the calculated seek time
    audioElement.current.currentTime = seekTime;
  };


  //audioBook-container - wrapper 
  return (
    <div className="audioBook-container">
      {/*Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/*main section  */}
      <main>
        {/**header  */}
        <Header toggleSidebar={toggleSidebar} />

        {/**box-container containing the song list  */}
        <BoxContainer songs={songs} onPlaySong={(index) => { setSongIndex(index); playSong(); }} />

        {/**Music Player component  */}
        <MusicPlayer
          song={songs[songIndex]}
          onPrev={playPrevSong}
          onNext={playNextSong}
          onTogglePlay={togglePlay}
          isPlaying={isPlaying}
          progress={progress}
          onSeek={seek}
          currentTime={currentTime}
          duration={duration}
        />
      </main>
    </div>
  );
};

export default AudioBookPlayer;
