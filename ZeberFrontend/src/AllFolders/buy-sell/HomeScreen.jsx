import React from 'react'

import AIComponent from '../buy-sell/AIcomponent/AIComponent';
import BooksList from '../buy-sell/BookSection/BooksList';
import BannerCarousel from '../buy-sell/BannerCarousel/BannerCarousel';
import BookSaleBanner from '../buy-sell/BookSaleBanner/BookSaleBanner';
import SellBuy from '../buy-sell/SellBuy/SellBuy';
// import BookItem from '../components/BookSection/BookItem';

const HomeScreen = () => {
  return (
    <div>
        
        <BannerCarousel />
        <SellBuy />
        <AIComponent />
       
<BooksList apiType="buybooks" />



<BooksList apiType="sellbooks" />

        <BookSaleBanner />
       
<BooksList apiType="buybooks" />


<BooksList apiType="sellbooks" />

    </div>
  )
}

export default HomeScreen