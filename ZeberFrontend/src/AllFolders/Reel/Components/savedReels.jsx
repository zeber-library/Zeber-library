//Note - Swiper css and js is linked in index.html
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShareModal from "./ReelShare";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
const socket = io("http://localhost:8080", {
  reconnection: true,
});
const SavedReelDisplay = ({ toggleCommentBox }) => {
  const swiperContainerRef = useRef(null);
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const [savedReels, setSavedReels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReelUrl, setCurrentReelUrl] = useState("");
  const reelRefs = useRef({});
  const location = useLocation();
  const userId = "66ddfda258de85a04f9880fb";
  const params = new URLSearchParams(location.search);
  const reelId = params.get("reelId");
  // fetch all reels
  useEffect(() => {
    const fetchSavedReels = async () => {
      const response = await fetch("http://localhost:8080/api/reels");
      const data = await response.json();
      const filteredSavedReels = data.filter(
        (Savedreel) => Savedreel.isSave === true
      );
      setSavedReels(filteredSavedReels);
    };
    fetchSavedReels();
  }, []);
  // add like
  const AddReelLike = async (reelId) => {
    try {
      await axios.put(`http://localhost:8080/api/reels/${reelId}/Addlike`, {
        userId,
      });
    } catch (err) {
      console.log("Add reel like error", err.message);
    }
  };
  const RemoveReelLike = async (reelId) => {
    try {
      await axios.put(`http://localhost:8080/api/reels/${reelId}/Removelike`, {
        userId,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSaveReel = async (reelId) => {
    try {
      await axios.post(`http://localhost:8080/api/reels/${reelId}/saveReel`);
    } catch (err) {
      console.log("Error in saving reel", err.message);
    }
  };
  // Scroll to the specific reel if reelId exists
  useEffect(() => {
    if (reelId && reelRefs.current[reelId]) {
      reelRefs.current[reelId].scrollIntoView({ behavior: "smooth" });
    }
  }, [reelId, savedReels]);

  // Open share modal
  const openShareModal = (reelId) => {
    const url = `http://localhost:5173/reels?reelId=${reelId}`;
    navigator.clipboard.writeText(url);
    alert("Reel URL copied to clipboard!");

    setCurrentReelUrl(url);
    setModalOpen(true);
  };

  //swiper initializtion and swiper related stuff
  useEffect(() => {
    if (swiperContainerRef.current) {
      const swiperInstance = new Swiper(swiperContainerRef.current, {
        direction: "vertical",
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          slideChange: function () {
            const prevSlide =
              swiperInstance.slides[swiperInstance.previousIndex];
            const prevVideo = prevSlide.querySelector("video");
            setModalOpen(false);
            if (prevVideo) prevVideo.pause();
          },
          slideChangeTransitionEnd: function () {
            const currentSlide =
              swiperInstance.slides[swiperInstance.activeIndex];
            const currentVideo = currentSlide.querySelector("video");
            if (currentVideo) currentVideo.play();
          },
        },
      });
      setSwiperInitialized(true);
    }
  }, [savedReels, swiperInitialized]);

  //toggle mute functionality
  const toggleMute = (event) => {
    const button = event.currentTarget;
    const currentSlide = swiperContainerRef.current.querySelector(
      ".swiper-slide-active"
    );
    const video = currentSlide.querySelector("video");

    if (video) {
      video.muted = !video.muted;

      const icon = button.querySelector("i");
      if (video.muted) {
        icon.classList.replace("uil-volume-up", "uil-volume-mute");
      } else {
        icon.classList.replace("uil-volume-mute", "uil-volume-up");
      }
    }
  };
  useEffect(() => {
    socket.on("add-like", (newReels) => {
      const savedReels = newReels.filter((a) => a.isSave === true);
      setSavedReels(savedReels);
    });

    socket.on("remove-like", (newReels) => {
      const savedReels = newReels.filter((a) => a.isSave === true);
      setSavedReels(savedReels);
    });
  }, []);

  useEffect(() => {
    socket.on("save-reel", (newReels) => {
      const savedReels = newReels.filter((a) => a.isSave === true);
      setSavedReels(savedReels);
    });
  }, []);

  return (
    <>
   
      <div
        ref={swiperContainerRef}
        className="swiper mySwiper"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="swiper-wrapper">
        <div style={{position:'relative',zIndex:"1000"}}> 
               {/* Share Modal */}
      {modalOpen ?(
        <ShareModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          url={currentReelUrl}
        />
      ):''}
          </div>
          {/*reel array */}
          {savedReels.map((reel, index) => (
            <div
              className="swiper-slide"
              key={index}
              ref={(el) => (reelRefs.current[reel._id] = el)}
              style={{ width: "100%", height: "100%" }}
            >
              <div className="slide-content">
                <video
                  className="video"
                  src={reel.videoUrl}
                  controls
                  style={{ width: "100%", height: "100%" }}
                ></video>
                   <div style={{position:'absolute',bottom:'15%',left:'5%',color:'white',fontWeight:500}}>{reel.description}</div>
              </div>

              {/*Reel actions  buttons  */}
              <div className="slide-actions">
                {reel.likes.includes(userId) ? (
                  <button
                    className="action-button like"
                    onClick={() => RemoveReelLike(reel._id)}
                  >
                    <FavoriteIcon style={{ color: "red" }} />
                  </button>
                ) : (
                  <button
                    className="action-button like"
                    onClick={() => AddReelLike(reel._id)}
                  >
                    <i className="uil uil-heart"></i>
                  </button>
                )}

                <button
                  className="action-button share"
                  onClick={() => openShareModal(reel._id)}
                >
                  <i className="uil uil-share"></i>
                </button>
                <button className="action-button comment">
                  <i
                    className="uil uil-comment"
                    onClick={() => toggleCommentBox(reel._id)}
                  ></i>
                </button>
                {reel.isSave ? (
                  <button
                    className="action-button favorite"
                    onClick={() => handleSaveReel(reel._id)}
                  >
                    <StarIcon style={{ color: "gold" }} />
                  </button>
                ) : (
                  <button
                    className="action-button favorite"
                    onClick={() => handleSaveReel(reel._id)}
                  >
                    <i className="uil uil-star"></i>
                  </button>
                )}
                <button className="action-button mute" onClick={toggleMute}>
                  <i className="uil uil-volume-up"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className=".swiper-pagination"></div>
      </div>
    </>
  );
};

export default SavedReelDisplay;
