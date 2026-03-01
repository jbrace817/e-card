/**
 * firstname
 * lastname
 * email
 * phone
 * company
 * job title
 * website
 * bio
 */
"use client";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cardFormSchema } from "@/lib/schemas/card-form";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

type CardFormProps = {
  initialData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    website?: string;
    bio?: string;
  };
};

function CardForm({ initialData }: CardFormProps) {
  const upsertCard = useMutation(api.cards.upsertCard);
  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
      company: initialData?.company ?? "",
      jobTitle: initialData?.jobTitle ?? "",
      website: initialData?.website ?? "",
      bio: initialData?.bio ?? "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (data: z.infer<typeof cardFormSchema>) => {
    try {
      await upsertCard({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        jobTitle: data.jobTitle,
        website: data.website,
        bio: data.bio,
      });
      toast.success("Card saved successfully");
    } catch (error) {
      toast.error("Failed to save card");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName">First Name *</label>
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <>
                <Input id="firstName" {...field} />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName">Last Name</label>
          <Controller
            control={form.control}
            name="lastName"
            render={({ field }) => <Input id="lastName" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <>
                <Input id="email" {...field} />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone">Phone</label>
          <Controller
            control={form.control}
            name="phone"
            render={({ field }) => <Input id="phone" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company">Company</label>
          <Controller
            control={form.control}
            name="company"
            render={({ field }) => <Input id="company" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="jobTitle">Job Title</label>
          <Controller
            control={form.control}
            name="jobTitle"
            render={({ field }) => <Input id="jobTitle" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="website">Website</label>
          <Controller
            control={form.control}
            name="website"
            render={({ field, fieldState }) => (
              <>
                <Input id="website" {...field} />
                {fieldState.error && (
                  <p className="text-red-500">{fieldState.error.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="bio">Bio</label>
          <Controller
            control={form.control}
            name="bio"
            render={({ field }) => <Textarea id="bio" {...field} rows={3} />}
          />
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Card"}
      </Button>
    </form>
  );
}

export default CardForm;
