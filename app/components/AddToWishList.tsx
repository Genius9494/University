"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { useWishlist } from "../context/wishlistContext";
import { MdAddShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";

const AddToWishList = ({ gameId, plus }: { gameId: string; plus?: boolean}) => {
  const { handleAddToWishlist, wishlist } = useWishlist();
  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlist.includes(gameId);

  const toggleWishlist = () => {
    setLoading(true);
    handleAddToWishlist(gameId);
    setLoading(false);
  };

  if (plus) {
    return isInWishlist ? (
      <MdDeleteForever style={{width:"25px", height:"25px"}}
        onClick={toggleWishlist}
        className="text-red-500 cursor-pointer" 
        aria-label="Remove from Wishlist"
      />
    ) : (
      <MdAddShoppingCart style={{width:"25px",height:"25px"}}
        onClick={toggleWishlist}
        className="text-green-500 cursor-pointer"
        aria-label="Add to Wishlist"
        
      />
    );
  }toast.success("The game has been added to the cart!", {
    style: {
      background:"rgba(0, 0, 0, 1)",
      color:"green",
      fontWeight:"bold",
      fontSize:"15px",
      borderRadius:"10px", 

    }
  });

  return (
    <Button
      className="capitalize"
      onClick={toggleWishlist}
      disabled={loading}
    >
      {loading
        ? "Processing..."
        : isInWishlist
        ? "Remove from wishlist"
        : "Add to wishlist"}
    </Button>
  );
};

export default AddToWishList;

