// the swiper min.css and the its js is linked in the index.html file 
import React, { useEffect } from 'react';

const SwiperComponent = () => {

  //Congratulation part swiper component -------------------
  useEffect(() => {
    const swiper = new Swiper('.mySwiper', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    });
  }, []);

  return (
    <div className="swiper mySwiper">
      <div className="swiper-wrapper">
        {/*SLide1 */}
        <div className="swiper-slide">
          <img src="/library/image/1-removebg-preview (1).png" alt="Slide 1 Image" />
        </div>

        {/*Slide 2 */}
        <div className="swiper-slide">
          <img src="/library/image/2-removebg-preview (1).png" alt="Slide 2 Image" />
        </div>

        {/*SLide 3 */}
        <div className="swiper-slide">
          <img src="/library/image/3-removebg-preview (1).png" alt="Slide 3 Image" />
        </div>

        {/*Slide 4 */}
        <div className="swiper-slide">
          <img src="/library/image/4-removebg-preview (1).png" alt="Slide 4 Image" />
        </div>

        {/*slide 5 */}
        <div className="swiper-slide">
          <img src="/library/image/5-removebg-preview (1).png" alt="Slide 5 Image" />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default SwiperComponent;
