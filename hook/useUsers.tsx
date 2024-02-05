import fetcher from "@/lib/fetcher";
import React from "react";
import useSWR from "swr";
const useUsers = (limit: number) => {
  const { data, isLoading, mutate, error } = useSWR(
    `/api/users?limit=${limit}`,
    fetcher
  );
  return {
    users: data,
    isLoading,
    mutate,
    isError: error,
  };
};

export default useUsers;
