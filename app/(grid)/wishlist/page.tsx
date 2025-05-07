"use client";
import Empty from "@/app/components/defaults/Empty";
import GridContainer from "@/app/components/defaults/GridContainer";
import GameCard from "@/app/components/GameCard";
import GameSkeleton from "@/app/components/GameSkeleton";
import Heading from "@/app/components/Heading";
import { useWishlsit } from "@/app/context/wishlistContext";
import { useGetGamesWithIds } from "@/lib/queryFunctions";
import React from "react";

const page = () => {
  const { wishlist } = useWishlsit();
  const { games, isLoading } = useGetGamesWithIds(wishlist);

  // التحقق من شكل البيانات المسترجعة
  // console.log(games);

  return (
    <div className="mt-10 flex flex-col gap-4">
      <Heading text="My WishList ❤️" />
      <GridContainer className="gap-5" cols={4}>
        {isLoading ? (
          <GameSkeleton />
        ) : games?.length > 0 ? (
          games.map((game: { data: Game; screenshots: any[] }, i: number) => {
            // التأكد من أن game.data و game.screenshots موجودين
            const { data, screenshots } = game;

            // التأكد من وجود data و screenshots
            if (data && screenshots && Array.isArray(screenshots)) {
              return (
                <GameCard
                  key={i}
                  wishlist={true}
                  game={{
                    ...data, // بيانات اللعبة
                    short_screenshots: screenshots.length > 0 ? screenshots : [], // الصور المرتبطة باللعبة
                  }}
                  images={screenshots || []} // تمرير الصور بشكل صحيح
                />
              );
            }
            return null; // إذا كانت البيانات غير موجودة، لا تظهر أي شيء
          })
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

export default page;
