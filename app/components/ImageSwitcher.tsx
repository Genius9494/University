"use client";
import Image from "next/image";
import { useState } from "react";

type ImageSwitcherProps = {
  game: Game;
  images: { image: string }[]; // يُفترض أن كل عنصر له مفتاح `image`
};

const ImageSwitcher = ({ game, images }: ImageSwitcherProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        <Image
          src={images[activeIndex].image}
          alt={`${game.name} screenshot ${activeIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative h-16 w-24 rounded-md overflow-hidden cursor-pointer border ${
              i === activeIndex ? "border-rose-500" : "border-transparent"
            }`}
          >
            <Image
              src={img.image}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwitcher;











// "use client";
// import Image from "next/image";
// import React, { useEffect } from "react";

// import { motion } from "framer-motion";
// import { GoPeople } from "react-icons/go";
// const ImageSwitcher = ({ images, game }: { images: any[]; game: Game }) => {
//   const [activeIndex, setActiveIndex] = React.useState(0);
//   useEffect(() => {
//     const t = setInterval(() => {
//       setActiveIndex((a) => (a + 1) % images?.length);
//     }, 1000);
//     return () => clearInterval(t);
//   }, [game, images?.length]);
//   console.log(activeIndex);

//   return (
//     <div className=" flex flex-col gap-4 py-3 items-center px-6 rounded-xl bg-main  overflow-hidden">
//       <div className=" flex  items-center gap-2 justify-between">
//         <h1 className=" text-base text-white">{game.name}</h1>
//         <p className=" text-xs text-muted-foreground mt-1">Released {game.released}</p>
//       </div>
//       <div className=" w-80 h-36 rounded-xl overflow-hidden relative ">
//         {images?.map((image, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             animate={{ opacity: activeIndex === index ? 1 : 0 }}
//             className=" absolute inset-0"
//             style={{ zIndex: activeIndex === index ? 1 : 0 }}
//           >
//             <Image fill src={image.image} alt={`${image}`} className=" object-cover" />
//           </motion.div>
//         ))}
//       </div>
//       <p className=" text-sm flex items-center gap-2  self-start text-muted-foreground mt-1">
//         <GoPeople />
//         Review count {game.reviews_count}
//       </p>
//     </div>
//   );
// };

// export default ImageSwitcher;
