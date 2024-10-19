import React from 'react'

import AIComponent from '../components/AIcomponent/AIComponent';
import BooksList from '../components/BookSection/BooksList';
import BannerCarousel from '../components/BannerCarousel/BannerCarousel';
import BookSaleBanner from '../components/BookSaleBanner/BookSaleBanner';
import SellBuy from '../components/SellBuy/SellBuy';
import Header from './Header/Header';
import Footer from './Footer/Footer';
// import BookItem from '../components/BookSection/BookItem';

const HomeScreen = () => {
  return (
    <div>
        <Header/>
        <BannerCarousel />
        <SellBuy />
        <AIComponent />

<BooksList apiType="buybooks" />



<BooksList apiType="sellbooks" />

        <BookSaleBanner />
     
<BooksList apiType="buybooks" />


<BooksList apiType="sellbooks" />

<Footer/>

    </div>
  )
}

export default HomeScreen