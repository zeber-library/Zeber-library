//Note - Swiper css and js is linked in index.html 
import React, { useEffect, useRef, useState } from 'react';


const SwiperComponent = ({toggleCommentBox}) => {
  const swiperContainerRef = useRef(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);


  //swiper initializtion and swiper related stuff
  useEffect(() => {
    if (swiperContainerRef.current) {
      const swiperInstance = new Swiper(swiperContainerRef.current, {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        on: {
          slideChange: function () {
            const prevSlide = swiperInstance.slides[swiperInstance.previousIndex];
            const prevVideo = prevSlide.querySelector('video');
            if (prevVideo) prevVideo.pause();
          },
          slideChangeTransitionEnd: function () {
            const currentSlide = swiperInstance.slides[swiperInstance.activeIndex];
            const currentVideo = currentSlide.querySelector('video');
            if (currentVideo) currentVideo.play();
          },
        },
      });
      setSwiperInitialized(true);
    }
  }, [swiperInitialized]);
  

//toggle mute functionality 
  const toggleMute = (event) => {
    const button = event.currentTarget;
    const currentSlide = swiperContainerRef.current.querySelector('.swiper-slide-active');
    const video = currentSlide.querySelector('video');

    if (video) {
      video.muted = !video.muted;

      const icon = button.querySelector('i');
      if (video.muted) {
        icon.classList.replace('uil-volume-up', 'uil-volume-mute');
      } else {
        icon.classList.replace('uil-volume-mute', 'uil-volume-up');
      }
    }
  };


  return (
    <div ref={swiperContainerRef} className="swiper mySwiper" style={{ width: '100%', height: '100vh' }}>
      <div className="swiper-wrapper">

        {/*reel array */}
        {[
          'reel/videos/were-excited-to-announce-that-were-releasing-our-ultimate-swiss-guide-today-1080-ytshorts.savetube.me.mp4',
          'reel/videos/new-edit-style-caredit-rx7-rotor-dog-clean-mazda-1nonly-1nonly-freddiedredd4953-1080-ytshorts.savetube.me.mp4',
          'reel/videos/basketball-z-caredit-caredit-perfectloop-basketball-370z-wizard-1080-ytshorts.savetube.me.mp4',
          'reel/videos/discipline-beats-depression-motivation-quotes-discipline-motivational-shorts-2160-ytshorts.savetube.me.mp4',
          'reel/videos/videoplayback (6).mp4',
          'reel/videos/videoplayback (4).mp4'
        ].map((videoSrc, index) => (
          <div className="swiper-slide" key={index} style={{ width: '100%', height: '100%' }}>
            <div className="slide-content">
              <video className="video" src={videoSrc} controls style={{ width: '100%', height: '100%' }}></video>
            </div>

            {/*Reel actions  buttons  */}
            <div className="slide-actions">
              <button className="action-button like"><i className="uil uil-heart"></i></button>
              <button className="action-button share"><i className="uil uil-share"></i></button>
              <button className="action-button comment"><i className="uil uil-comment" onClick={toggleCommentBox}></i></button>
              <button className="action-button favorite"><i className="uil uil-star"></i></button>
              <button className="action-button mute" onClick={toggleMute}>
                <i className="uil uil-volume-up"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className=".swiper-pagination"></div>
    </div>
  );
};

export default SwiperComponent;
