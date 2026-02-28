"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CardForm from "@/components/card-form";

export default function DashboardPage() {
  const card = useQuery(api.cards.getMyCard);
  if (card === undefined) return <div>Loading...</div>;
  if (!card) {
    return (
      <div>
        <h1>No card found</h1>
        <p>You Haven't Created a digital card Yet</p>
        <CardForm />
      </div>
    );
  }
  return (
    <div>
      <h1>Edit Your Card</h1>
      <CardForm initialData={card} />
    </div>
  );
}
