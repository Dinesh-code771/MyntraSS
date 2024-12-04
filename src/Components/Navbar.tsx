import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoBagOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import {useSelector} from "react-redux";

export default function Navbar() {

  // const [isBurgerMenuOpen, setIsBurgerMenuOpen]=React.useState(false);
const isMenuBarOpen = useSelector((state:any)=>state.navBarSlice.isMenuButtonClicked);

  return (
    <nav className="sticky top-0  bg-white shadow-md w-full">
      <div className="wrapper py-5 md:w-[90%] w-[80%] mx-auto flex justify-between items-center">
        {/* left side */}
        <div className="leftWrapper flex items-center md:gap-10">
          <div className="block md:hidden">
            <GiHamburgerMenu />
          </div>
          <img src="myntra-logo.png" height={30} width={30} alt="myntra-logo" />

          <div className="hidden md:flex">
            <ul className="text-black font-bold gap-5 flex">
              <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                Men
              </li>
              <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                WoMen
              </li>
              <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                kids
              </li>
              <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                accessories
              </li>
            </ul>
          </div>
        </div>

        {/* right side */}
        <div className="rightWrapper md:flex md:items-center md:gap-10 ">
          <div className="search px-3 border hidden bg-[#f5f5f6] md:flex border-gray-300 md:items-center md:gap-5">
            <CiSearch />
            <input
              type="text"
              placeholder="Search for the brands and more"
              className="bg-transparent px-3 py-1 rounded-md w-[600px] focus:outline-none"
            />
          </div>

          <div className="icon flex gap-5">
            <FaRegHeart size={20} />
            <IoBagOutline size={20} />
            <div className="hidden md:inline">
              <FaRegUser size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
