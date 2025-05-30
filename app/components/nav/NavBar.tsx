"use client";

import React from "react";
import Search from "../Search";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/queryFunctions";
import User from "../User";
import SkeletonCustom from "../SkeletonCustom";
import { useCart } from "../../store/cartStore";
import { FaCartShopping } from "react-icons/fa6";

const path = () => {
  window.location.href = "/cart";
};

const NavBar = () => {
  const { user, isLoading, isError } = useGetUser();
  const {cart} =useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (isLoading) {
    return (
      <nav>
        <header className="flex justify-between items-center">
          <Search />
          <SkeletonCustom circle />
        </header>
      </nav>
    );
  }

  return (
    <nav>
      <header className="flex justify-between items-center">
        <Search />
        {isError ? (
          
          <div>حدث خطأ أثناء تحميل بيانات المستخدم. حاول مرة أخرى.</div>
        ) : user?.data ? (
          <User />
        ) : (
          
          <div className="flex items-center">
            <span className="flex items-center gap-2"> {totalItems} <FaCartShopping onClick={path} className="text-red-500 cursor-pointer" /></span>
            <ButtonGame link="/login" text="Login" />
            <ButtonGame link="/signup" text="Sign up" />
          </div>
        )}
      </header>
    </nav>
  );
};

export default NavBar;
