import React, { useState, useEffect } from "react";

//Main componenr for displaying the video sections
const MainContent = ({ setPlayVideo }) =>{
  const [contentData, setContentData] = useState([]);

  useEffect(() => {

    //data array of the videos --- supposed to be dynamic
    const data = [
      {
        bg: "/VideoImages/mainContent/insane-by-mehul-choudhary.jpg",
        logo: "/VideoImages/profileImage/mehul-choudhary.jpg",
        title: "Insane",
        authorName: "Mehul Choudhary",
        genre1: "Dance & Electronic",
        genre2: "Inspiration",
        class: "fullWidth",
        link: "https://www.youtube.com/watch?v=swJki1KGypM",
      },
      {
        bg: "/VideoImages/mainContent/up-in-the-air-ft-belingo-and-agusalvarez-by-luke-bergs.jpg",
        logo: "/VideoImages/profileImage/luke-bergs.jpg",
        title: "Up In The Air (Ft. Belingo & AgusAlvarez)",
        authorName: "Luke Bergs",
        genre1: "Dance & Electronic",
        genre2: "Calm",
        class: "",
        link: "https://www.youtube.com/watch?v=5V_UC0r4Uc4",
      },
      {
        bg: "/VideoImages/mainContent/volcano-by-scandinavianz.jpg",
        logo: "/VideoImages/profileImage/scandinavianz.jpg",
        title: "Volcano",
        authorName: "Scandinavianz",
        genre1: "Dance & Electronic",
        genre2: "Happy",
        class: "",
        link: "https://www.youtube.com/watch?v=SVLTbU3O9hk",
      },
      {
        bg: "/VideoImages/mainContent/ocean-drive-by-luke-bergs.jpg",
        logo: "/VideoImages/profileImage/luke-bergs.jpg",
        title: "OceanDrive",
        authorName: "Luke Bergs",
        genre1: "Dance & Electronic",
        genre2: "Calm",
        class: "fullWidth",
        link: "https://www.youtube.com/watch?v=R9pXbNz6Vbw",
      },
      {
        bg: "/VideoImages/mainContent/bali-by-ashutosh.jpg",
        logo: "/VideoImages/profileImage/ashutosh.jpg",
        title: "Bali",
        authorName: "ASHUTOSH",
        genre1: "Dance & Electronic",
        genre2: "Bright",
        class: "",
        link: "https://www.youtube.com/watch?v=O_A8HdCDaWM",
      },
      {
        bg: "/VideoImages/mainContent/arctic-by-mehul-choudhary.jpg",
        logo: "/VideoImages/profileImage/mehul-choudhary.jpg",
        title: "Arctic",
        authorName: "Mehul Choudhary",
        genre1: "Dance & Electronic",
        genre2: "Bright",
        class: "",
        link: "https://www.youtube.com/watch?v=I8gFw4-2RBM",
      },
      {
        bg: "/VideoImages/mainContent/retro-by-declan-dp.jpg",
        logo: "/VideoImages/profileImage/declan-dp.jpg",
        title: "Retro",
        authorName: "Declan DP",
        genre1: "Dance & Electronic",
        genre2: "Happy",
        class: "fullWidth",
        link: "https://www.youtube.com/watch?v=Epec0RYI49k",
      },
      {
        bg: "/VideoImages/mainContent/summer-wind-by-roa-music.jpg",
        logo: "/VideoImages/profileImage/roa-music.jpg",
        title: "Summer Wind",
        authorName: "Roa Musid",
        genre1: "Dance & Electronic",
        genre2: "Happy",
        class: "",
        link: "https://www.youtube.com/watch?v=QjqT68Mx6kA",
      },
      {
        bg: "/VideoImages/mainContent/cosy-dreaming-by-snoozybeats.jpg",
        logo: "/VideoImages/profileImage/snoozybeats.jpg",
        title: "cosy dreaming",
        authorName: "Snoozybeats",
        genre1: "Hip Hop & Rap",
        genre2: "Calm",
        class: "",
        link: "https://www.youtube.com/watch?v=AClfhmJYyNc",
      },
    ];
    setContentData(data);
  }, []);


  //function to set the video playing 
  const handlePlayClick = (link) => {
    setPlayVideo(link);
  };

  return (
    <div className="mainContainer">

      {/**mapping data to index and displaying the data*/}
      {contentData.map((data, index) => (
        <div
          key={index}
          className={`content ${data.class}`}
          style={{ backgroundImage: `url(${data.bg})` }}
        >
          <div className="heading">
            <div className="imgContent">
              <img src={data.logo} alt={data.authorName} />
            </div>
            <div className="headingContent">
              <h2>{data.title}</h2>
              <span>
                <h4>{data.authorName}</h4>
                <a href="#">. {data.genre1}</a>
                <a href="#">/ {data.genre2}</a>
              </span>
            </div>
          </div>
          <div className="playDownload">

            {/*button to play the video  */}
            <span
              className="playBtn"
              onClick={() => handlePlayClick(data.link)}
            >

              <i className="fa fa-play"></i>
            </span>
            <span>
              <i className="fa fa-cloud-arrow-down"></i>
            </span>
          </div>


          {/**social icons shown on hover  */}
          <div className="socialContent">
            <span>
              <a href="">
                <i className="fa-brands fa-spotify"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i className="fa-brands fa-soundcloud"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i className="fa-brands fa-apple"></i>
              </a>
            </span>
            <span>
              <a href="">
                <i className="fa-brands fa-google-play"></i>
              </a>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainContent;
