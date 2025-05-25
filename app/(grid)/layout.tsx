"use client";

import React from "react";

// ✅ Components
import ButtonGradient from "../components/ButtonGradient";
import GridContainer from "../components/defaults/GridContainer";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import NavBar from "../components/nav/NavBar";
import SideBar from "../components/nav/SideBar";
import CartIcon from "../components/CartIcon";

// ✅ Context & Providers
import { WishlistProvider } from "../context/wishlistContext";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <WishlistProvider>
        <main className="min-h-screen h-full grid background dark">
          <ButtonGradient />
          <GridContainer cols={12}>
            <SideBar />
            <MaxWidthWrapper className="col-span-full lg:col-span-10">
              <NavBar />
              <CartIcon />
              {children}
            </MaxWidthWrapper>
          </GridContainer>
        </main>
      </WishlistProvider>
  );
}

