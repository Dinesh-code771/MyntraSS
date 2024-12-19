import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { Link } from "react-router-dom";
import { setMenuButtonClicked } from "../Redux/navBarSlice";

export default function Msidebar() {
  const isMenuBarOpen = useSelector(
    (state: any) => state.navBarSlice.isMenuButtonClicked
  );

  const dispatch = useDispatch();

  return (
    <>
      {isMenuBarOpen && (
        <aside className="absolute left-0 bottom-0 top-0 w-[75%] z-50 bg-white h-screen shadow-md overflow-scroll">
          <div className="wrapper h-full">
            {/* profile container */}

            <div className="profile wrapper border p-4 bg-gradient-to-r from-cyan-500  to-pink-600 text-white flex  justify-between">
              <img src="sideimg.png"></img>
              {/* <div className="left flex flex-col justify-center gap-5"> */}
              {/* <img
                  src="myntra-logo.png"
                  height={30}
                  width={30}
                  alt="myntra-logo"
                />
                <h3 className="font-bold">Sirisha</h3> */}
              {/* </div> */}

              <div className="right flex flex-col justify-between gap-5">
                <div
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                  className="flex justify-end"
                >
                  <div className="text-white">
                    <IoClose size={30} color="white" />
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
              </div>
            </div>

            {/* menu items */}

            <div className="menuItems p-4 flex  flex-col gap-4">
              <div className="item flex justify-between">
                <Link
                  to="/Men"
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <h3 className="font-semibold text-black text-[1rem]">Mens</h3>
                </Link>

                <div>
                  <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
                </div>
              </div>
            </div>

            <div className="menuItems p-4">
              <div className="item flex justify-between">
                <Link
                  to="/Women"
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <h3 className="font-semibold text-black text-[1rem]">
                    Women
                  </h3>
                </Link>

                <div>
                  <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
                </div>
              </div>
            </div>

            <div className="menuItems p-4">
              <div className="item flex justify-between">
                <Link
                  to="Kids"
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <h3 className="font-semibold text-black text-[1rem]">Kids</h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
                </div>
              </div>
            </div>

            <div className="menuItems p-4  ">
              <div className="item flex justify-between">
                <Link
                  to="Living"
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <h3 className="font-semibold text-black text-[1rem]">
                    Home & Living
                  </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
                </div>
              </div>
            </div>

            <div className="menuItems p-4">
              <div className="item flex justify-between">
                <Link
                  to="/Beauty"
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <h3 className="font-semibold text-black text-[1rem]">
                    Beauty
                  </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
                </div>
              </div>
            </div>

            <div className="menuItems p-4">
              <div className="item flex justify-between">
                <Link
                  to="/accessories"
                  onClick={() => {
                    dispatch(setMenuButtonClicked(false));
                  }}
                >
                  <h3 className="font-semibold text-black text-[1rem]">
                    accessories
                  </h3>
                </Link>
                <div>
                  <MdOutlineKeyboardArrowRight size={22} color="#bebfc6" />
                </div>
              </div>
            </div>

            {/* settings */}
            <div className="settings p-4 flex flex-col gap-5 border">
              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  Myntra Studio
                </h3>
              </div>

              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  Myntra Mall
                </h3>
              </div>

              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  Myntra Insider
                </h3>
              </div>

              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  Gift Cards
                </h3>
              </div>

              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  Contact Us
                </h3>
              </div>

              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  FAQ's
                </h3>
              </div>

              <div className="name">
                <h3 className="font-semibold text-[#858590] text-[0.8rem]">
                  Legal
                </h3>
              </div>
            </div>

            <div className="footer wrapper border p-4 bg-gradient-to-r from-cyan-500 to-pink-300 text-black flex justify-between">
              <img src="sidefooter.png"></img>
              {/* <img
                src="myntra-logo.png"
                height={30}
                width={30}
                alt="myntra-logo"
              /> */}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
