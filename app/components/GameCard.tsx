import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import ImageSwitcher from "./ImageSwitcher";
import AddToWishList from "./AddToWishList";
import { Game, normalizeGame } from "@/types";
import BuyButton from "./BuyButton";



// type Game = {
//     id: number;
//     name: string;
//     background_image: string;
//     rating?: number;
//     released?: string;
//     parent_platforms?: { platform: { slug: string } }[];
//     slug?: string;
//     tba?: boolean;
//     rating_top?: number;
//     ratings?: any[];
//     ratings_count?: number;
//     reviews_text_count?: number;
//     added?: number;
//     added_by_status?: any;
//     description_raw?: string | null;  // تعيين القيم الافتراضية
//     metacritic?: number | null;       // تعيين القيم الافتراضية
//     playtime?: number | null;         // تعيين القيم الافتراضية
//     suggestions_count?: number | null; // تعيين القيم الافتراضية 
//   };
  
  


type GameCardProps = {
  game: Game;
  images?: { image: string }[];
  wishlist?: boolean;
  screenBig?: boolean;
};

// STARS
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className="text-yellow-400 text-sm">
        {i < fullStars ? "★" : "☆"}
      </span>
    );
  }
  return stars;
};

// const GameCard = ({ game, images, wishlist = false }: GameCardProps) => {
//   if (!game) return null;

const GameCard = ({ game: rawGame, images, wishlist = false }: GameCardProps) => {
  const game = normalizeGame(rawGame);

  if (!game) return null;


  const {
    background_image,
    name,
    id,
    parent_platforms = [],
    rating = 0,
    released = "Unknown",
    slug = "default-slug",
    tba = false,
    rating_top = 0,
    ratings = [],
    ratings_count = 0,  
    reviews_text_count = 0,  
    added = 0,  
  } = game;

  const platforms = parent_platforms?.map((platformObj) => platformObj.platform.slug);

  return (
    <HoverCard>
      <div className="flex relative flex-col items-start gap-4">
        <HoverCardTrigger className="relative cursor-pointer w-full" asChild>
          <div>
            <div className="relative flex flex-col gap-2">
              {wishlist && (
                <div className="absolute left-2 top-2 z-10">
                  <AddToWishList plus gameId={id.toString()} />
                </div>
              )}
              <div className="hover:opacity-80 duration-150 w-full overflow-hidden h-64 relative rounded-xl">
                {background_image ? (
                  <Image
                    className="object-cover"
                    src={background_image}
                    alt={name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-xs">
                    No Image Available
                  </div>
                )}
              </div>
              <Link
                href={`/game/${id}`}
                className="text-sm line-clamp-1 font-semibold text-white"
              >
                {name}
              </Link>
              
              {/* stars */}
              <div className="flex items-center gap-1">
                {renderStars(rating)}
                <span className="text-xs text-gray-300 ml-1">{rating.toFixed(1) || "N/A"}</span>
              </div>
              {/* stars// */}

              <p className="text-xs text-gray-300">
                Released: <span className="font-medium">{released}</span>
              </p>
              <BuyButton name={name} price={game.price} />

              
              <div className="mt-2 flex items-center gap-1">
                {platforms?.map((slug, i) => {
                  if (slug === "pc") {
                    return <FaSteam key={i} title="PC" />;
                  } else if (slug.includes("playstation")) {
                    return <FaPlaystation key={i} className="text-blue-500" title="PlayStation" />;
                  } else if (slug.includes("xbox")) {
                    return <FaXbox key={i} className="text-green-500" title="Xbox" />;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent align="center" className="w-full bg-transparent border-none">
          {images && images.length > 0 && <ImageSwitcher game={game} images={images} />}
        </HoverCardContent>
      </div>
    </HoverCard>
  );
};



export default GameCard;



