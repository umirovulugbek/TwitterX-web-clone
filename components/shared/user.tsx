import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import { sliceText } from "@/lib/utils";

const User = ({ user }: { user: IUser }) => {
  return (
    <div className="flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md">
      <div className="flex gap-2 cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.profileImage} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-white font-semibold text-sm line-clamp-1">
            {user?.name}
          </p>
          <div className="text-sm text-neutral-400 line-clamp-1">
            {user.username !== undefined && user?.username !== ""
              ? `${sliceText(user.username, 15)}`
              : `${sliceText(user.email, 15)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
