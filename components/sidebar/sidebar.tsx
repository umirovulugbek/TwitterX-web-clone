"use client";

import { IUser } from "@/types";
import { Bell, Home, User, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IoSearch } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import SidebarItem from "./sidebar-item";
import SidebarPostButton from "./sidebar-post-button";
import SidebarAccount from "./sidebar-account";
import { useSession } from "next-auth/react";

const Sidebar = ({ user }: { user: IUser }) => {
  const { data: session, status }: any = useSession();
  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      path: `/notifications/${user?._id}`,
      icon: Bell,
      notification: user?.hasNewNotifications,
    },
    {
      label: "Profile",
      path: `/profile/${user?._id}`,
      icon: User,
    },
    {
      label: "Explore",
      path: "/explore",
      icon: Search,
    },
  ];

  return (
    <section className="sticky flex left-0 top-0 h-screen lg:w-[266px] w-fit lg:flex flex-col justify-between py-4 pl-0 lg-pl-2">
      <div className="flex flex-col space-y-2">
        <Link
          href={"/"}
          className="rounded-full lg:h-14 lg:w-14  h-12 w-12  p-2   flex items-center justify-center hover:bg-sky-300 hover:bg-opacity-10 cursor-pointer transition"
        >
          <Image width={70} height={70} src={"/images/x.svg"} alt="logo" />
        </Link>

        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem {...item} />
          </Link>
        ))}

        <SidebarPostButton />
      </div>

      <SidebarAccount user={user} />
    </section>
  );
};

export default Sidebar;
