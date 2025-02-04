import React from 'react';
import NavBar from './components/NavBar';
import MVSideBar from './components/MVSideBar';
import HomeSection from './components/HomeSection';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App bg-white h-screen w-full overflow-scroll">
      <NavBar />
      <MVSideBar />
      {/* <HomeSection/> */}
      <Outlet />
    </div>
  );
};

export default App;
