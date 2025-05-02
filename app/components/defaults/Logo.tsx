import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link className=" font-semibold  my-2 text-xl lg:text-2xl  flex gap-2" href={"/"}>
      <h1 id="span2" className=" text-green-400">Website</h1>
      <span className="text-sky-500">Games</span>
    </Link>
  );
};

export default Logo;
