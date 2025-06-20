import React from "react";
import Image from "next/image";
import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/GamesSlider";
import SwiperCards from "@/app/components/SwiperCards";
import { Game } from "@/types";
import AddToWishList from "@/app/components/AddToWishList";

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

    const allImages = [
      ...screenshots.results,
      ...(additionalImage ? [additionalImage] : []),
      data.background_image,
    ].filter(Boolean);

    // ✅ استدعاء المراجعات بشكل آمن
    let reviews = [];
    try {
      const res = await fetch(`${process.env.BASE_URL}/api/reviews/${data.id}`, {
        cache: "no-store",
      });

      if (res.ok) {
        reviews = await res.json();
      } else {
        console.warn("Failed to fetch reviews: ", res.status);
      }
    } catch (err) {
      console.error("Error while fetching reviews:", err);
    }

    return (
      <div className="mt-10">
        <div className="col-span-4 flex flex-col gap-2">
          <h1 className="text-2xl text-white">{data.name}</h1>
          <div className="flex items-center justify-between">
            <div>Rating count: {data.ratings_count}</div>
            {/* ✅ زر الويش ليست */}
            <AddToWishList gameId={data.id.toString()} />
          </div>

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

        {/* ✅ المراجعات */}
        <div>
          <h2 className="text-xl font-bold mt-8 mb-4">User Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((r: any) => (
              <div key={r._id} className="mb-4 border p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{r.rating} ⭐</span>
                  <span className="text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm mt-2">{r.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No reviews yet for this game.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in game page:", error);
    return <div className="text-white p-4">حدث خطأ أثناء تحميل اللعبة.</div>;
  }
};

export default page;








{/* <div>
        {data.ratings.map(({ title, count, percent, id }) => (
          <div key={id} className="flex items-center gap-2 mb-4">
            {imageSrc && <img src={imageSrc} alt={title} className="w-8 h-8" />}
            <div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p>
                {count} reviews - {percent}%
              </p>
            </div>
          </div>
        ))}
      </div> */}

/*
you learned 
crud operations (wishlist)
authentication
authorization and protection
setting cookies , delete cookies , mutate them 
frontend optimization debouncing 
fetching data from server page 
server actions 
tanstak query caching 
sliders with animations framer motion
resusability 
filtring 
searching 
middlware
connecting with database 
handling forms and its submission
creating mongoose models and connecting with data base
handling file uploads with cloudinary 
setting up custom hooks 
sync local storage with state 

rest :
review a game
wishlist in single game page 

reply 
*/
