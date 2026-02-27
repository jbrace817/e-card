"use client";

import { useStoreUser } from "@/hooks/use-store-user";
import { UserButton } from "@clerk/nextjs";
import Container from "@/components/Container";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, userId } = useStoreUser();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>Unauthorized</div>;

  if (!userId) return <div>No user ID</div>;

  return (
    <div>
      <header className="py-4">
        <Container className="flex items-center justify-between">
          <div>e-card - Digital Business Cards</div>
          <UserButton />
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
