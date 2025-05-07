import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Spinner = () => {
  return <div id="done">
    <BiLoaderCircle className=" text-purple-400 mt-80 w-16 h-16 animate-spin" />
    <p className=" mt-4 text-red-400 ">.....Please Wait</p>
  </div> 
};

export default Spinner;
