"use client"
import React from "react";
import Image from "next/image";
import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/GamesSlider";
import SwiperCards from "@/app/components/SwiperCards";
import { Game } from "@/types"

const page = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const game = await getGame(id);

    const {
      screenshots,
      data,
      similar,
    }: {
      screenshots: { results: any[] };
      data: Game;
      similar: { results: Game[] };
    } = game;

    const additionalImage = data.background_image_additional;

    // تجميع الصور والتأكد من أن كلها صالحة
    const allImages = [
      ...screenshots.results,
      ...(additionalImage ? [additionalImage] : []),
      data.background_image,
    ].filter(Boolean); // حذف null/undefined

    return (
      <div className="mt-10">
        <div className="col-span-4 flex flex-col gap-2">
          <h1 className="text-2xl text-white">{data.name}</h1>
          <div>Rating count : {data.ratings_count}</div>

          <SwiperCards
            slidesPerView={1}
            className="h-full"
            items={allImages.map((screenshot) => ({
              card: (
                <div className="rounded-xl overflow-hidden h-[36rem] w-full relative">
                  <Image
                    src={screenshot.image || screenshot}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
              src: screenshot.image || screenshot,
            }))}
            paginationImages
          />

          <p className="mt-10 col-span-2">{data.description_raw}</p>
        </div>

        {similar?.results?.length > 0 && (
          <GamesSlider title="Similar Games" games={similar.results} />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in game page:", error);
    return <div className="text-white p-4">حدث خطأ أثناء تحميل اللعبة.</div>;
  }
};

export default page;