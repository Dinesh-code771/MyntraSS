// import logo from './logo.svg';
// import './App.css';
import Navbar from "./Components/Navbar";
import React from "react";
import Msidebar from "./Components/Msidebar";
import { Outlet } from "react-router-dom";

// function App(){
const App: React.FC = () => {
  return (
    <div className="bg-white h-screen relative overflow-scroll">
      <Navbar />
      <Msidebar />
      <Outlet />
    </div>
  );
};

export default App;
