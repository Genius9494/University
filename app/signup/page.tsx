import React from "react";
import Singup from "../components/forms/Singup";

const page = () => {
  return (
    <main
      className=" min-h-screen flex items-center justify-center w-full text-yellow-300"
      style={{
        backgroundImage: "url('/game6.avif')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Singup />
    </main>
  );
};

export default page;
