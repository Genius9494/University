import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import * as React from 'react';
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import ImageSwitcher from "./ImageSwitcher";
import AddToWishList from "./AddToWishList";
import { Game, normalizeGame } from "@/types";
import BuyButton from "./BuyButton";

import {useCart} from "../../app/store/cartStore"
import { useState, useMemo } from "react";


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import toast from 'react-hot-toast'
  
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

  // Function to generate a random price

  const price = React.useMemo(() => {
    const min = 100;
    const max = 700;
    return +(Math.random() * (max - min) + min).toFixed(2);
  }, []);
  console.log(price);
  

  const price2 = React.useMemo(() => {
    const min = 100;
    const max = 700;
    return +(Math.random() * (max - min) + min).toFixed(2);
  }, []);
  console.log(price);
  
  
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


  const [open, setOpen] = useState(false);
  const { cart, addToCart } = useCart();
  const isInCart = cart.some(item => item.id === game.id.toString());


  const handleAddToCart = () => {
    addToCart({
      id: id.toString(),
      name: game.name,
      price: price,
      quantity: 1,
    });
    setOpen(true);
  };

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const platforms = parent_platforms?.map((platformObj) => platformObj.platform.slug);

  return (
    <>
    {/* ✅ Snackbar العائم
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert className="!bg-yellow-500" onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
    The game has been added to the cart!
    </Alert>
  </Snackbar> */}
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
                href={`/game/${game.id}`}
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
              <p className="text-xs text-green-400 font-bold">
                  price: ${price.toFixed(2)}   
              </p>


              <button
                  onClick={() => {
                    if (!isInCart) {
                      addToCart({
                        id: game.id.toString(),
                        name: game.name,
                        price: price,
                        quantity: 1,
                      });
                      toast.success("The game has been added to the cart!", {
                        style: {
                          background:"rgba(0, 0, 0, 1)",
                          color:"green",
                          fontWeight:"bold",
                          fontSize:"15px",
                          borderRadius:"10px", 

                        }
                      });
                    }
                  }}
                  disabled={isInCart}
                  className={`px-4 py-2 mt-2 text-white rounded-2xl transition ${
                    isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isInCart ? "Added to cart" : "add to cart"}
               </button>


              
              <BuyButton name={name} price={price} />
              
              
              
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
    </>
  );
  
};         
     




export default GameCard;



