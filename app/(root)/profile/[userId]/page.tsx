import Header from "@/components/shared/header";
import { getUserById } from "@/lib/action/user.action";
import React from "react";

import ProfileHero from "@/components/profile/profile-hero";
import ProfileBio from "@/components/profile/profile-bio";
import { IUser } from "@/types";
import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth";
import PostFeed from "@/components/shared/post-feed";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserById(params?.userId);
  const session: any = await getServerSession(authOptions);
  console.log(user, "");
  return (
    <>
      <div>
        <Header label={user?.name} isBack />
        <ProfileHero user={JSON.parse(JSON.stringify(user))} />
        <ProfileBio
          user={JSON.parse(JSON.stringify(user))}
          userId={JSON.parse(JSON.stringify(session)).currentUser._id}
        />
        <PostFeed
          userId={params.userId}
          user={JSON.parse(JSON.stringify(session.currentUser))}
        />
      </div>
    </>
  );
};

export default Page;
