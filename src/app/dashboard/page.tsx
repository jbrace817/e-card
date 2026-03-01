"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CardForm from "@/components/card-form";
import CardDisplay from "@/components/card-display";

export default function DashboardPage() {
  const card = useQuery(api.cards.getMyCard);

  if (card === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create Your Card</h1>
          <p className="text-muted-foreground">
            Fill out the form below to create your digital business card.
          </p>
        </div>
        <CardForm />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Edit Your Card</h1>
        <p className="text-muted-foreground">
          Update your card details below. Changes save automatically.
        </p>
      </div>

      <CardForm initialData={card} />

      {/* Preview section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Preview</h2>
        <CardDisplay card={card} />
      </div>
    </div>
  );
}
