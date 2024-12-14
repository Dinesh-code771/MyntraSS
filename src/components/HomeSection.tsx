import React from 'react';
import SearchBar from './SearchBar';
import Categories from './Categories';
import Banners from './Banners';
import useWindowSize from '../hooks/useWindowSize';
import Brands from './Brands';
import ShopByCategory from './ShopByCategory';
import BannerImg from './BannerImg';

export default function HomeSection() {
  const { width, height } = useWindowSize();

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className='bg-white sticky top-[70px] p-2 '>
      <SearchBar
        className=" rounded-full shadow-lg border overflow-hidden px-2 md:hidden "
        placeholder={'Search for brands and products'}
      />
      </div>
      <Categories />
      <Banners
        banner={
          width > 880
            ? [
                { src: 'tabBanner.png', alt: '' },
                { src: 'myntraBanner2.jpg', alt: '' },
                { src: 'myntraBanner4.jpg', alt: '' },
                { src: 'myntraBanner3.jpg', alt: '' },
              ]
            : [
                {src: "phoneBanner.png",alt:""},
                { src: 'Myntra1.jpg', alt: '' },
                { src: 'Myntra2.jpg', alt: '' },
                { src: 'Myntra4.jpg', alt: '' },
              ]
        }
      />
      <BannerImg/>
      <Brands
        title="First time on discount"
        sections={[
          {
            src: [
              'brand1.jpg',
              'brand2.jpg',
              'brand1.jpg',
              'brand2.jpg',
              'brand1.jpg',
              'brand2.jpg',
            ],
            alt: [
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
            ],
          },
          {
            src: [
              'brand3.jpg',
              'brand4.jpg',
              'brand3.jpg',
              'brand4.jpg',
              'brand3.jpg',
              'brand4.jpg',
            ],
            alt: [
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
            ],
          },
          {
            src: [
              'brand5.jpg',
              'brand6.jpg',
              'brand5.jpg',
              'brand6.jpg',
              'brand5.jpg',
              'brand6.jpg',
            ],
            alt: [
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
              'brandImages',
            ],
          },
        ]}
      />

      <ShopByCategory
        title="Shop By Category"
        images={[
          {
            categoryName: "mens-clothing",
            src:"cloths1.png",
          },
          {
            categoryName: "women-clothing",
            src:"cloths1.png",
          },
          {
            categoryName: "kids-clothing",
            src:"cloths1.png",
          },
          {
            categoryName: "electronics",
            src:"electronics1.png",
          },
          {
            categoryName: "jewelry",
            src:"jewelry1.png",
          },
          {
            categoryName: "watches",
            src:"watches1.png",
          },
        ]}
      />
    </div>
  );
}
