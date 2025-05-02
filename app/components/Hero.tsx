import React from "react";
import MaxWidthWrapper from "./defaults/MaxWidthWrapper";
import SwiperCards from "./SwiperCards";
import "swiper/css";
import Image from "next/image";
import CardInfo from "./CardInfo";

const Hero = () => {
  return (
    <div className=" h-full mt-8">
      <SwiperCards
        className=" h-[30rem]"
        paginationImages
        items={[
          {
            card: (
              <div className=" flex items-start justify-start w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/fortnight.mp4" />
                </video>{" "}
                <CardInfo
                  btnClasses=" text-white bg-red-500 hover:bg-red-400"
                  desc="Fortnite is an online battle royale game where 100 players fight to be the last one standing. Players collect weapons, build structures, and compete in fast-paced action. It also has fun events and creative game modes."
                  title="Epic game"
                  image="/fortnight.png"
                />
              </div>
            ),
            src: "/for2.avif",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/mortalkombat.mp4" />
                </video>
                <CardInfo
                  btnClasses="  text-white bg-orange-500 hover:bg-orange-400"
                  desc="Mortal Kombat is a fighting game where two characters battle each other using punches, kicks, and special moves."
                  title="Combat"
                  image="/mortalkombat.png"
                />
              </div>
            ),
            src: "/mor2.jpg",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/goodofwar.mp4" />
                </video>
                <CardInfo
                  btnClasses="  text-white bg-orange-500 hover:bg-orange-400"
                  desc="God of War is an action-adventure game that follows Kratos, a powerful warrior, on his journey through ancient mythological worlds."
                  title="action"
                  image="/godofwar.png"
                />
              </div>
            ),
            src: "/god2.webp",
          },
          {
            card: (
              <div className=" w-full h-full relative">
                <video
                  className=" absolute w-full h-full object-cover object-top rounded-2xl  inset-0"
                  autoPlay={true}
                  muted={true}
                  loop={true}
                >
                  <source type="video/mp4" src="/mincraft.mp4" />
                </video>
                <CardInfo
                  btnClasses="  text-white bg-orange-500 hover:bg-orange-400"
                  desc="Minecraft is a sandbox game where players can build and explore their own worlds made of blocks. You can mine resources, craft tools"
                  title="Advanture"
                  image="/mincraft.png"
                />
              </div>
            ),
            src: "/min.jpeg",
          },
        ]}
      />
    </div>
  );
};

export default Hero;
