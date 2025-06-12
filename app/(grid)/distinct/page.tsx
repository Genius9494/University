"use client";

import React from "react";
import { Game, normalizeGame } from "@/types";
import GridContainer from "../../components/defaults/GridContainer";
import GameCard from "../../components/GameCard";


const distinctGames: Partial<Game>[] = [
  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://media.rawg.io/media/games/0f5/0f52bc0ed7e4c858d4e6a7cf46f1c9c0.jpg",
    rating: 4.8,
    released: "2015-05-18",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  
  },
  {
    id: 2,
    name: "Red Dead Redemption 2",
    background_image: "https://media.rawg.io/media/games/b1a/b1a9c3b1a14ff0b0121b6d9c2f01a9f6.jpg",
    rating: 4.7,
    released: "2018-10-26",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 3498,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.6,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 10142,
    name: "PlayerUnknown’s Battlegrounds",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 2597,
    name: "LEGO The Lord of the Rings",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 17576,
    name: "Batman: Arkham City",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  
  },
  {
    id: 11934,
    name: "Counter-Strike: Source",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.3,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  
  },
  {
    id: 3272,
    name: "Rocket League",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 58134,
    name: "Marvel's Spider-Man",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 23702,
    name: "Need for Speed Payback",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 10243,
    name: "Company of Heroes 2",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 3.4,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
   
  },
  {
    id: 18080,
    name: "Half-Life",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 3.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 1030,
    name: "Limbo",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 3.9,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
   
  },
];

const DistinctGames = () => {
  return (
    <section id="distinct" className="p-6 mt-5 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400 animate-pulse">🎖️ Distinct Games </h1>
      <GridContainer cols={3} className="gap-4">
        {distinctGames.map((data) => {
          const game: Game = normalizeGame(data);
          return <GameCard key={game.id} game={game} screenBig={false} wishlist />;
          
        })}
      </GridContainer>
    </section>
  );
};

export default DistinctGames;


