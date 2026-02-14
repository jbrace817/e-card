import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export function useStoreUser() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // Don't do anything if the user isn't logged in
    if (!isAuthenticated) return;

    async function createUser() {
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
