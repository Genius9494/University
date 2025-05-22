import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Spinner = () => {
  return <div id="done" className="h-screen">
    <BiLoaderCircle id="spinner" className=" text-yellow-500 mt-50 w-16 h-16 animate-spin" />
    <p className=" mt-4 text-green-500 text-xl animate-pulse ">.....Please Wait</p>
  </div> 
};

export default Spinner;
