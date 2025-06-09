"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useWishlist } from "../context/wishlistContext";
import { MdAddShoppingCart } from "react-icons/md";


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
      <XCircle style={{width:"25px", height:"25px", border:"1px, solid, red"}}
        onClick={toggleWishlist}
        className="text-red-500 cursor-pointer" 
        aria-label="Remove from Wishlist"
      />
    ) : (
      <MdAddShoppingCart style={{width:"20px",height:"20px",border:"1px,solid,green"}}
        onClick={toggleWishlist}
        className="text-green-500 cursor-pointer"
        aria-label="Add to Wishlist"
      />
    );
  }

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

