import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaRegHeart } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
//import { IoSearch } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuButtonClicked, setGlobalSearch } from '../Redux/navBarSlice.js';
import SearchBar from './SearchBar';
import { Link , useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { useAuth0 } from '@auth0/auth0-react';

//const NavBar: React.FC  = () => {
export default function NavBar() {
  // We are taking logout method from useAuth0 hook
  const { logout } = useAuth0();

  const navigate = useNavigate();

  const isMenuBarOpen = useSelector(
    (state: any) => state.navBarSlice.isMenuButtonClicked
  );

  const globalSearchValue = useSelector(
    (state: any) => state.navBarSlice.globalSearchValue
  );

  const dispatch = useDispatch();
  //console.log(isMenuBarOpen, 'adf');

  function onGlobalSearchChange(e: any) {
    dispatch(setGlobalSearch(e.target.value));
  }

  return (
    <nav className="sticky top-0 bg-white shadow-md w-full z-50">
      <div className="wrapper py-4 w-[85%] md:w-[90%] mx-auto flex justify-between items-center">
        <div className="leftWrapper flex-1 flex items-center gap-5 md:gap-10">
          <div
            onClick={() => {
              dispatch(setMenuButtonClicked(!isMenuBarOpen)); //button toggle using dispatch
            }}
            className="block md:hidden"
          >
            <RxHamburgerMenu size={30} />
          </div>

          <Link to={`/`}>
            <img
              className="cursor-pointer"
              src="/MyntraLogo.png"
              width={50}
              height={50}
              alt="Myntra Logo"
            />
          </Link>
          <div className="elements hidden md:flex">
            <ul className="text-black font-extrabold text-[0.8rem] flex gap-3 ">
              <Link to={`men`}>
                <li className="inline-block px-3 py-1  text-gray-700 cursor-pointer">
                  MEN
                </li>
              </Link>
              <Link to={`women`}>
                <li className="inline-block px-3 py-1  text-gray-700 cursor-pointer">
                  WOMEN
                </li>
              </Link>
              <Link to={`kids`}>
                <li className="inline-block px-3 py-1  text-gray-700 cursor-pointer">
                  KIDS
                </li>
              </Link>
              <Link to={`home&living`}>
                <li className="inline-block px-3 py-1  text-gray-700 cursor-pointer">
                  HOME & LIVING
                </li>
              </Link>
              <Link to={`beauty`}>
                <li className="inline-block px-3 py-1  text-gray-700 cursor-pointer">
                  BEAUTY
                </li>
              </Link>
              <Link to={`studio`}>
                <li className="inline-block px-3 py-1  text-gray-700 cursor-pointer">
                  STUDIO
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="rightWrapper flex-1 md:flex md:items-center md:gap-10 justify-end">
          <SearchBar
            className="rounded  hidden md:flex   md:w-[60%] lg:w-[80%] xl:w-[35rem] bg-[#f5f5f5]  md:items-center gap-3 px-3 py-1"
            placeholder="Search for products, brands and more"
            onChange={onGlobalSearchChange}
            value={globalSearchValue}
          />

          <div className="icons flex items-center justify-end gap-5">
            <div className="hidden md:inline flex-col items-center">
              <FaRegUser size={20} style={{ marginLeft: '0.5rem' }} />
              <p className="hidden md:inline font-bold text-xs mt-[0.2rem]">
                Profile
              </p>
            </div>
            <div className="flex-col  cursor-pointer items-center">
              <FaRegHeart onClick={() => navigate("/wishlist")} size={20} style={{ marginLeft: '0.5rem' }} />
              <p className="hidden md:inline font-bold text-xs mt-[0.2rem]">
                Wishlist
              </p>
            </div>
            <div className="flex-col  cursor-pointer items-center">
              <LiaShoppingBagSolid size={20} />
              <p className="hidden md:inline font-bold text-xs mt-[0.2rem]">
                Bag
              </p>
            </div>
            <MdLogout
              onClick={() => logout()}
              size={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

//export default NavBar;
