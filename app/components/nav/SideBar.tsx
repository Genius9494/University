"use client";

import React from "react";
import { FiAward, FiFeather, FiActivity } from "react-icons/fi";
import { GiRoyalLove } from "react-icons/gi";
import { SiHomebridge } from "react-icons/si";
import { MdCategory } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import NavLink from "./NavLink";
import Logo from "../defaults/Logo";
import { useGetUser } from "@/lib/queryFunctions";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const NAV_LINKS = [
  {
    link: "/",
    label: "Home",
    icon: <SiHomebridge />,
  },
  {
    link: "/category",
    label: "Category",
    icon: <MdCategory />,
  },
  {
    link: "/games",
    label: "Games",
    icon: <IoGameController />,
  },
  {
    link: "/wishlist",
    label: "Wishlist",
    icon: <GiRoyalLove />,
  },
  {
    link: "/distinct",
    label: "Distinct",
    icon: <FiAward />,
  },
  {
    link: "/ratings",
    label: "Ratings",
    icon: <FiActivity />,
  },
  {
    link: "/famous",
    label: "Famous",
    icon: <FiFeather />,
  },
];

const SideBar = () => {
  const { user, isLoading } = useGetUser();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const data = await res.json();
      if ("success" in data) {
        toast.success(data.success);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      } else {
        toast.error(data.error || "Logout failed");
      }
    } catch {
      toast.error("Something went wrong during logout!");
    }
  };

  return (
    <div className="col-span-2">
      <div className="py-5 px-7 h-screen sticky inset-0 flex flex-col items-start bg-black/30 text-gray-50">
        <Logo />
        {NAV_LINKS.map((navLink, i) => (
          <NavLink key={i} navLink={navLink} />
        ))}

        {isLoading ? (
          <div className="mt-auto space-y-2">
            <Skeleton className="h-4 w-[130px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ) : user?.data ? (
          <div className="mt-auto space-y-2">
            <NavLink
              navLink={{
                link: "/settings",
                label: "Settings",
                icon: <Settings />,
              }}
            />
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SideBar;
