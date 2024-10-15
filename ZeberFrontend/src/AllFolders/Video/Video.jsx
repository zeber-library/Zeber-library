import React, {useState} from 'react'
import Navbar from './Components/Navbar'
import Tagline from './Components/Tagline'
import MainContent from './Components/MainContent'
import Pagination from './Components/Pagination'
import PlayVideo from './Components/PlayVideo'
import "./video.css"


const Video = () => {
  //!use state to set the state for playing video 
    const [playVideo, setPlayVideo] = useState(null);
  return (

    //video-container - wrapper element 
    <div className='video-container'>
       <Navbar/>
       <Tagline/>
       <MainContent setPlayVideo={setPlayVideo} />
       <Pagination/>
       <PlayVideo playVideo={playVideo} setPlayVideo={setPlayVideo}/>
    </div>
  )
}

export default Video
