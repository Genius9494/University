"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, XCircle } from "lucide-react";
import { useWishlsit } from "../context/wishlistContext";

const AddToWishList = ({ gameId, plus }: { gameId: string; plus?: boolean}) => {
  const { handleAddToWishlist, wishlist } = useWishlsit();
  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlist.includes(gameId);

  const toggleWishlist = () => {
    setLoading(true);
    handleAddToWishlist(gameId);
    setLoading(false);
  };

  if (plus) {
    return isInWishlist ? (
      <XCircle
        onClick={toggleWishlist}
        className="text-red-500 cursor-pointer" 
        aria-label="Remove from Wishlist"
      />
    ) : (
      <PlusCircle
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

