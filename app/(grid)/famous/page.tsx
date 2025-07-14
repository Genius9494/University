"use client";

import React from "react";
import { Game, normalizeGame } from "@/types";
import GridContainer from "../../components/defaults/GridContainer";
import GameCard from "../../components/GameCard";



const famousGames: Partial<Game>[] = [
  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    background_image: "thewitcher.jpg",
    rating: 4.8,
    released: "2015-05-18",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 5286,
    name: "Tomb Raider",
    background_image: "tombrider.jpg",
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
    background_image: "grand.jpg",
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
    background_image: "pubgmobile.jpg",
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
    background_image: "lego.jpg",
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
    background_image: "batman.jpg",
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
    background_image: "counterstrike.jpg",
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
    background_image: "rocket.jpg",
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
    background_image: "spiderman.jpeg",
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
    background_image: "/needforspeed.png",
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
    background_image: "company.jpg",
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
    background_image: "/halflife.jpg",
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
    background_image: "/limbo.jpg",
    rating: 3.9,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
];

const FamousGamesPage = () => {
  return (
    <section id="famous" className="p-6 mt-5 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400 animate-pulse ">🔥 Famous Games</h1>
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


