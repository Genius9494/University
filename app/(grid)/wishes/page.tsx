"use client";

import { useEffect } from "react";
import Empty from "@/app/components/defaults/Empty";
import GridContainer from "@/app/components/defaults/GridContainer";
import GameCard from "@/app/components/GameCard";
import GameSkeleton from "@/app/components/GameSkeleton";
import Heading from "@/app/components/Heading";
import { useWishlist } from "@/app/context/wishlistContext";  // تم تصحيح الاسم هنا
import { useGetGamesWithIds } from "@/lib/queryFunctions";
import React from "react";

const Page = () => {
  const { wishlist } = useWishlist();  // تم تصحيح الاسم هنا
  const { games, isLoading } = useGetGamesWithIds(wishlist);

  useEffect(() => {
    console.log("Updated wishlist:", wishlist);
  }, [wishlist]);

  return (
    <div id="distinct" className="mt-10 p-4 flex flex-col gap-4 rounded-2xl">
      <Heading text="My WishList ❤️" className="m-10" />
      <GridContainer className="gap-4" cols={3}>
        {isLoading ? (
          <GameSkeleton />
        ) : games.length > 0 ? (
          games.map((game: any, i: number) => (
            <GameCard
              key={i}
              wishlist={true}
              game={game}
              images={game.short_screenshots || []}
            />
          ))
        ) : (
          <Empty
            message="You have not added anything to your wishlist yet!"
            link="/games"
            linkText="Browse More Games"
          />
        )}
      </GridContainer>
    </div>
  );
};

export default Page;
