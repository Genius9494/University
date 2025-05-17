import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Spinner = () => {
  return <div id="done" className="bg-main h-full">
    <BiLoaderCircle id="spinner" className=" text-yellow-500 mt-80 w-16 h-16 animate-spin" />
    <p className=" mt-4 text-green-500 text-xl ">.....Please Wait</p>
  </div> 
};

export default Spinner;
