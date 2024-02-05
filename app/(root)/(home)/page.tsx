"use client";
import Form from "@/components/shared/form";
import Header from "@/components/shared/header";
import PostItem from "@/components/shared/post-item";
import { authOptions } from "@/lib/auth-option";
import { IPost } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = () => {
  // const session: any = await getServerSession(authOptions);/
  const { data: session, status }: any = useSession();

  const [post, setPost] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/posts?limit=10");
      setPost(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header label="Home" />
      {isLoading || status === "loading" ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <Form
            placeholder="What's on your mind?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
            setPosts={setPost}
          />

          {post.map((post) => (
            <PostItem
              key={post?._id}
              post={post}
              user={JSON.parse(JSON.stringify(session.currentUser))}
              setPosts={setPost}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Page;
