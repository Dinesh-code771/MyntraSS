import React, { useState } from 'react';
import { FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
export default function ReviewComponent({
  review,
  rating,
  images,
}: {
  review: string;
  rating: number;
  images: string[];
}) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  return (
    <div className='border-t'>
      <h1 className="font-bold mb-4 text-[#282c3f] text-[20px]">Customer Reviews ( )</h1>
      <div className="container flex  gap-2">
        <div className="ratingStart ">
          <div className="ratingStar bg-teal-400 flex gap-1 px-1 rounded mt-1">
            <p className='text-white font-semibold text-sm'>{rating}</p>
            <FaStar className="text-white pt-1" />
          </div>
        </div>
        <div className="details">
          <div className="review pb-5">
            <p className="text-[#535665] font-light">
            Dear Myntra Team, Thanks for your wonderful efforts for 
            delivering products on time worldwide. This is not a review
             but a appreciation to all the ground staff who is working hard
             secretly. This for those who never get to hear good or those who
              are working at back office 24*7. Thanks for your generous support. 
              Also the quality of clothes you provide is superb and well condition.
               Kudos to all the Team and i am very happy with my purchase. Will surely 
               recommend my colleagues for trying Myntra Shopping Window.
            </p>
          </div>
          <div className="reviewImages py-5">
            <div className="reviewImage flex gap-2">
              {images?.map((image, index) => (
                <div
                  className="reviewImage w-[40px] flex items-center justify-center h-[40px]"
                  key={index}
                >
                  <img src={image} alt="" className='w-[40px] h-[40px]'/>
                </div>
              ))}
            </div>
          </div>
          <div className="reviewer py-5 flex gap-2 items-center justify-between border-b">
            <div className="reviewerName text-[#535665] text-sm font-light flex gap-2 items-center">
              <p>John Doe</p> | <p>2 days ago</p>
            </div>
            <div className="likeComponent flex gap-5 text-[#535665] font-light ">
              <div className="like">
                <div className="likeIcon cursor-pointer flex gap-2 items-center">
                  <FaThumbsUp onClick={() => setLike(like + 1)} />
                  <p className="text-sm">{like}</p>
                </div>
              </div>
              <div className="dislike">
                <div className="dislikeIcon cursor-pointer flex gap-2 items-center">
                  <FaThumbsDown onClick={() => setDislike(dislike + 1)} />
                  <p className="text-sm">{dislike}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
