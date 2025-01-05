import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { setMenuButtonClicked } from '../Redux/navBarSlice';
import { Link } from 'react-router-dom';

export default function MVSideBar() {
  
  const isMenuBarOpen = useSelector(
    (state: any) => state.navBarSlice.isMenuButtonClicked
  );
  const dispatch = useDispatch();

  return (
    <>
      {isMenuBarOpen && (
        <aside className="absolute top-0 w-[75%] z-50 h-screen bg-white  border shadow-md overflow-scroll">
          <div className="wrapper ">
            <div className="profile-wrapper  p-5 bg-[#3f3947]  flex justify-between">
              <div className="left flex flex-col justify-between gap-3">
                <img
                  src="profileImg.png"
                  width={50}
                  height={50}
                  className="bg-white rounded"
                  alt="profile"
                />
                <h3 className="text-white ">
                  <b>Sruthi</b>
                </h3>
              </div>
              <div className="right flex flex-col justify-between gap-5 text-white">
                <div
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <IoClose size={20} />
                </div>
                <div>
                  <MdOutlineKeyboardArrowRight size={20} />
                </div>
              </div>
            </div>
            <div className="menuItemsWrapper  flex flex-col p-5 gap-5">
              <div className="items flex justify-between">
                <Link to={`men`} onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }} >
                  <h3 className="font-semibold text-black text-[0.8rem]">
                    Men
                  </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={20} color="#bebfc6" />
                </div>
              </div>

              <div className="items flex justify-between cursor-pointer">
              <Link to={`women`} onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }} >
                <h3 className="font-semibold text-black text-[0.8rem]">
                  Women
                </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={20} color="#bebfc6" />
                </div>
              </div>
              <div className="items flex justify-between">
              <Link to={`kids`} onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }} >
                <h3 className="font-semibold text-black text-[0.8rem]">Kids</h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={20} color="#bebfc6" />
                </div>
              </div>
              <div className="items flex justify-between">
              <Link to={`home&Living`} onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }} >
                <h3 className="font-semibold text-black text-[0.8rem]">
                  Home & Living
                </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={20} color="#bebfc6" />
                </div>
              </div>
              <div className="items flex justify-between">
              <Link to={`beauty`} onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }} >
                <h3 className="font-semibold text-black text-[0.8rem]">
                  Beauty
                </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={20} color="#bebfc6" />
                </div>
              </div>
            </div>
            <div className="settings  flex flex-col p-5 gap-8 border">
              <div className="">
                <h3 className="text-black text-[0.8rem]">Myntra Studio</h3>
              </div>
              <div className="">
                <h3 className="text-black text-[0.8rem]">Myntra Mall</h3>
              </div>
              <div className="">
                <h3 className="text-black text-[0.8rem]">Myntra Insider</h3>
              </div>
              <div className="">
                <h3 className="text-black text-[0.8rem]">Gift Cards</h3>
              </div>
              <div className="">
                <h3 className="text-black text-[0.8rem]">Contact Us</h3>
              </div>
              <div className="">
                <h3 className="text-black text-[0.8rem]">FAQs</h3>
              </div>
              <div className="">
                <h3 className="text-black text-[0.8rem]">Legal</h3>
              </div>
            </div>
            <div className="footer h-[7rem] content-baseline">
              <img
                src="myntraFooter.png"
                alt="footer"
                className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 ..."
              />
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
