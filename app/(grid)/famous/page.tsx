"use client";

import React from "react";
import { Game, normalizeGame } from "@/types";
import GridContainer from "../../components/defaults/GridContainer";
import GameCard from "../../components/GameCard";


const famousGames: Partial<Game>[] = [
  {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    background_image: "https://media.rawg.io/media/games/0f5/0f52bc0ed7e4c858d4e6a7cf46f1c9c0.jpg",
    rating: 4.8,
    released: "2015-05-18",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 199,
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
    price: 209,
  },
  {
    id: 3,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.6,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 200 ,
  },
  {
    id: 4,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 150,
  },
  {
    id: 5,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 190,
  },
  {
    id: 6,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 140,
  },
  {
    id: 7,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.3,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 150,
  },
  {
    id: 8,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 160,
  },
  {
    id: 9,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 130  ,
  },
  {
    id: 10,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 100,
  },
  {
    id: 11,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 3.4,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 88,
  },
  {
    id: 12,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 3.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 77,
  },
  {
    id: 13,
    name: "Grand Theft Auto V",
    background_image: "https://media.rawg.io/media/games/8bd/8bd7c71b31cb55f846f7c7b0210b8c68.jpg",
    rating: 3.9,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    price: 62,
  },
];

const FamousGamesPage = () => {
  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">🔥 Famous Games</h1>
      <GridContainer cols={3} className="gap-4">
        {famousGames.map((data) => {
          const game: Game = normalizeGame(data);
          return <GameCard key={game.id} game={game} screenBig={false} wishlist />;
          
        })}
      </GridContainer>
    </section>
  );
};

export default FamousGamesPage;


