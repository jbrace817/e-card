import { z } from "zod";

export const cardFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  email: z.email("Invalid Email Address").optional().or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  website: z.url("Invalid Website URL").optional().or(z.literal("")),
  bio: z.string().optional(),
});
