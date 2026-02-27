"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function DashboardPage() {
  const card = useQuery(api.cards.getMyCard);
  if (card === undefined) return <div>Loading...</div>;
  if (!card) {
    return (
      <div>
        <h1>No card found</h1>
        <p>You Haven't Created a digital card Yet</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Your Card</h1>
      <pre>{JSON.stringify(card, null, 2)}</pre>
    </div>
  );
}
