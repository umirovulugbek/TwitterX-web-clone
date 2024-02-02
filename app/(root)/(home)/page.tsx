import Auth from "@/components/auth";
import React from "react";

const Page = () => {
  const auth = false;
  if (!auth)
    return (
      <div className="container  h-screen  mx-auto max-w-7xl">
        <Auth />
      </div>
    );
  return <div>Page</div>;
};

export default Page;
