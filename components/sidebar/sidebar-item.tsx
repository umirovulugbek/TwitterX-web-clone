import { LucideIcon } from "lucide-react";
import React from "react";
import { BsDot } from "react-icons/bs";

interface Props {
  label: string;
  icon: LucideIcon;
  notification?: boolean;
}

const SidebarItem = ({ icon: Icon, label, notification }: Props) => {
  return (
    <div className="flex flex-row items-center justify-center">
      {/* MOBILE SIDEBAR ITEM */}
      <div className="relative rounded-full mt-2 lg-mt-0 lg-h-14 lg-w-14  h-10 w-10  flex items-center justify-center p-2 lg-p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
      </div>

      {/* DESKTOP SIDEBAR ITEM */}
      <div className=" w-full relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center  ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
        {notification ? (
          <BsDot className={"text-sky-500 absolute -top-4 left-0"} size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
