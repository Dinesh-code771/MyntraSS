import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoBagOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSearch, setMenuButtonClicked } from "../Redux/navBarSlice.js";
import Search from "./SearchBar";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { resetWishList } from "../Redux/wishListSlice.js";
export default function Navbar() {
  const isMenuBarOpen = useSelector(
    (state: any) => state.navBarSlice.isMenuButtonClicked
  );
  const globalSearchValue = useSelector(
    (state: any) => state.navBarSlice.globalSearchValue
  );
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const navigate = useNavigate();

  function onGlobalSearchChange(e: any) {
    dispatch(setGlobalSearch(e.target.value));
  }
  return (
    <nav className="sticky top-0 bg-white shadow-md w-full z-50">
      <div className="wrapper py-5 w-[85%] md:w-[90%] mx-auto flex justify-between items-center">
        {/* left side */}
        <div className="leftWrapper flex items-center gap-5 md:gap-10 flex-1">
          <div
            onClick={() => {
              dispatch(setMenuButtonClicked(!isMenuBarOpen));
            }}
            className="block md:hidden"
          >
            <GiHamburgerMenu size={20} />
          </div>
          <Link to="/">
            <img
              src="/myntra-logo.png"
              width={30}
              height={30}
              alt="myntra icon"
            />
          </Link>
          <div className="hidden md:flex">
            <ul className="text-black font-bold flex gap-5">
              <Link to="/men">
                <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                  Men
                </li>
              </Link>
              <Link to="/women">
                <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                  Women
                </li>
              </Link>
              <Link to="/kids">
                <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                  Kids
                </li>
              </Link>
              <Link to="/beauty">
                <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
                  Beauty
                </li>
              </Link>
            </ul>
          </div>
        </div>

        {/* right side */}
        <div className="rightWrapper md:flex md:items-center md:gap-10 flex-1 justify-end ">
          <Search
            onChange={onGlobalSearchChange}
            value={globalSearchValue}
            className="px-3 border bg-[#f5f5f6] rounded-md w-[80%]   hidden md:flex border-gray-300 md:items-center md:gap-5"
            placeHolder="Search for products, brands and more"
          />
          <div className="icons flex justify-end gap-5">
            <LuHeart
              onClick={() => {
                navigate("/wishlist");
                window.location.reload();
              }}
              size={20}
            />
            <IoBagOutline size={20} />
            <IoIosLogOut
              size={20}
              onClick={() => logout()}
              className="cursor-pointer"
            />
            <div className="hidden md:inline">
              <CiUser size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// import React from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { IoBagOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa";
// import { FaRegUser } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { useDispatch, useSelector } from "react-redux";

// import SearchBar from "./SearchBar";
// import { Link } from "react-router-dom";
// import { MdLogout } from "react-icons/md";
// import { useAuth0 } from "@auth0/auth0-react";
// import { setMenuButtonClicked, setGlobalSearch } from "../Redux/navBarSlice.js";

// export default function Navbar() {
//   // const [isBurgerMenuOpen, setIsBurgerMenuOpen]=React.useState(false);
//   const isMenuBarOpen = useSelector(
//     (state: any) => state.navBarSlice.isMenuButtonClicked
//   );

//   const globalSearchValue = useSelector(
//     (state: any) => state.navBarSlice.globalSearchValue
//   );

//   const dispatch = useDispatch();
//   const { logout } = useAuth0();

//   function onGlobalSearchChange(e: any) {
//     dispatch(setGlobalSearch(e.target.value)); // Dispatch the global search value change
//   }

//   return (
//     <nav className="sticky top-0  bg-white shadow-md w-full z-50">
//       <div className="wrapper py-5 md:w-[90%] w-[80%] mx-auto flex justify-between items-center">
//         {/* left side */}
//         <div className="leftWrapper flex items-center md:gap-10 flex-1">
//           <div className="gap-4 flex items-center">
//             <div
//               onClick={() => {
//                 dispatch(setMenuButtonClicked(!isMenuBarOpen));
//               }}
//               className="block md:hidden"
//             >
//               <GiHamburgerMenu />
//             </div>
//             <Link to="/">
//               <img
//                 src="/myntra-logo.png"
//                 height={30}
//                 width={30}
//                 alt="myntra-logo"
//               />
//             </Link>
//           </div>

//           <div className="hidden md:flex">
//             <ul className="text-black font-bold gap-5 flex">
//               <Link to="/men">
//                 {" "}
//                 <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
//                   Men
//                 </li>
//               </Link>
//               <Link to="/Women">
//                 <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
//                   WoMen
//                 </li>
//               </Link>

//               <Link to="/Kids">
//                 <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
//                   kids
//                 </li>
//               </Link>

//               <Link to="Living">
//                 <li className="inline-block px-3 py-1 text-sm text-gray-700 cursor-pointer">
//                   Living
//                 </li>
//               </Link>
//             </ul>
//           </div>
//         </div>

//         {/* right side */}
//         <div className="rightWrapper  md:flex md:items-center md:gap-10 flex-1 justify-end">
//           {/* <div className="search px-3 border hidden bg-[#f5f5f6] md:flex border-gray-300 md:items-center md:gap-5">
//             <CiSearch />
//             <input
//               type="text"
//               placeholder="Search for the brands and more"
//               className="bg-transparent px-3 py-1 rounded-md w-[600px] focus:outline-none"
//             />
//           </div> */}

//           <SearchBar
//             onChange={onGlobalSearchChange}
//             value={globalSearchValue}
//             className="px-3  rounded-md w-[80%] hidden bg-[#f5f5f6] md:flex md:items-center md:gap-5"
//             placeHolder="Search for products,brands and more"
//           />

//           <div className="icon flex justify-end gap-5 items-center">
//             <div className="hidden md:inline flex-col items-center">
//               <FaRegUser size={20} style={{ marginLeft: "0.5rem" }} />
//               <p className="hidden md:inline font-bold text-xs mt-[0.2rem]">
//                 Profile
//               </p>
//             </div>

//             <div className="hidden md:inline flex-col items-center">
//               <FaRegHeart size={20} style={{ marginLeft: "0.5rem" }} />
//               <p className="hidden md:inline font-bold text-xs mt-[0.2rem]">
//                 Wishlist
//               </p>
//             </div>

//             <div className="hidden md:inline flex-col items-center">
//               <IoBagOutline size={20} style={{ marginLeft: "0.5rem" }} />
//               <p className="hidden md:inline font-bold text-xs ml-[0.5rem] mt-[0.2rem]">
//                 Bag
//               </p>
//             </div>
//             <MdLogout
//               size={20}
//               onClick={() => logout()}
//               className="cursor-pointer"
//             />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
