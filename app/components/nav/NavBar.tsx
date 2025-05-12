"use client";

import React from "react";
import Search from "../Search";
import ButtonGame from "../defaults/ButtonGame";
import { useGetUser } from "@/lib/queryFunctions";
import User from "../User";
import SkeletonCustom from "../SkeletonCustom";

const NavBar = () => {
  const { user, isLoading, isError } = useGetUser();

  if (isLoading) {
    // عرض "Skeleton" أثناء تحميل البيانات
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
          
          <div className="flex items-center gap-2">
            <ButtonGame link="/login" text="Login" />
            <ButtonGame link="/signup" text="Sign up" />
          </div>
        )}
      </header>
    </nav>
  );
};

export default NavBar;
