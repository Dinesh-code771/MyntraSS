// import logo from './logo.svg';
// import './App.css';
import Navbar from './Components/Navbar';
import React from "react";
import Msidebar from './Components/Msidebar';

// function App(){
const App:React.FC = () =>{
  return (
    <div className="bg-white h-screen relative">
   <Navbar/>
   <Msidebar/>
   </div>
  );
}

export default App;
