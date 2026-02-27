"use client";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export function useStoreUser() {
  const { isAuthenticated } = useConvexAuth(); //this is a hook that is used to check if the user is authenticated. checks if clerks JWT is valid within convex.
  const { user } = useUser(); //this is a hook that is used to get the user object.
  const [userId, setUserId] = useState<string | null>(null);
  const storeUser = useMutation(api.users.store); // this is a mutation function that is used to store the user in the database. for existing users, this is called once isAuthenticated is true.

  useEffect(() => {
    // Don't do anything if the user isn't logged in
    if (!isAuthenticated) return;

    async function createUser() {
      //this is a function that is used to create the user in the database.
      const id = await storeUser();
      setUserId(id);
    }

    createUser();
  }, [isAuthenticated, storeUser, user?.id]);

  return {
    isLoading: isAuthenticated && userId === null,
    isAuthenticated,
    userId,
  };
}
