import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import ImageSwitcher from "./ImageSwitcher";
import AddToWishList from "./AddToWishList";

type GameCardProps = {
  game: Game;
  images?: any[]; // يمكنك تخصيص النوع حسب نوع بيانات الصور
  wishlist?: boolean;
  screenBig?: boolean;
};

const GameCard = ({ game, images, wishlist = false, screenBig = false }: GameCardProps) => {
  if (!game) return null; // تحقق من وجود البيانات

  // استخراج البيانات بأمان
  const { background_image, name, id, parent_platforms } = game;
  const platforms = parent_platforms?.map((platformObj) => platformObj.platform.slug);

  return (
    <HoverCard>
      <div className="flex relative flex-col items-start gap-4">
        <HoverCardTrigger className="relative cursor-pointer w-full" asChild>
          <div>
            <div className="relative flex flex-col gap-2">
              <div className="hover:opacity-80 duration-150 w-full overflow-hidden h-64 relative rounded-xl">
                {background_image ? ( // تحقق من وجود صورة الخلفية
                  <Image
                    className="object-cover"
                    src={background_image}
                    alt={name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-500">No Image</div> // إذا لم توجد صورة، عرض رسالة بديلة
                )}
              </div>
              <Link
                href={`/game/${id}`}
                className="text-sm line-clamp-1 font-semibold text-white"
              >
                {name}
              </Link>
              <div className="mt-2 flex items-center gap-1">
                {platforms?.map((slug, i) => {
                  if (slug === "pc") {
                    return <FaSteam key={`platform-pc-${i}`} />;
                  } else if (slug.includes("playstation")) {
                    return <FaPlaystation key={`platform-playstation-${i}`} className="text-blue-500" />;
                  } else if (slug.includes("xbox")) {
                    return <FaXbox key={`platform-xbox-${i}`} className="text-green-500" />;
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        {wishlist && (
          <div className="absolute left-2 z-10 cursor-pointer top-2">
            <AddToWishList plus gameId={id.toString()} />
          </div>
        )}
      </div>

      <HoverCardContent align="center" className="w-full bg-transparent border-none">
        {images && images.length > 0 && <ImageSwitcher game={game} images={images} />}
      </HoverCardContent>
    </HoverCard>
  );
};

export default GameCard;
