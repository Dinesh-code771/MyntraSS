import React from 'react'
import CategoryCard from './CategoryCard'

//cards in sm:(phone)
export default function Categories() {

    let categories = [
        {
            src:"KidsShoopingImg.png",
            title:"Kids",
        },
        {
            src:"WomenShoopingImg.png",
            title:"Women",
        },
        {
            src:"MenShoopingImg.png",
            title:"Men",
        },
        {
            src:"ElectronicsImg.png",
            title:"Electronics",
        },
        {
            src:"WatchesImg.png",
            title:"Watches",
        },
        {
            src:"ShoesImg.png",
            title:"Shoes",
        },
        {
            src:"gold1.png",
            title:"Jewelery",
        },
        {
            src:"bags1.png",
            title:"Bags",
        },
    ]

  return (
    <div className='w-full overflow-x-auto flex gap-3 md:hidden'>
        {
            categories.map((category,index)=>{
                return(
                    <>
                    <CategoryCard
                     key={index}
                     src={category?.src}
                     title={category.title}
                     />
                    </>
                );
            })
        }
    </div>
  );
}
