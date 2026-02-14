import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Called after every login — creates or updates the user in Convex
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    // Get the identity from the Clerk JWT — this is how Convex
    // knows WHO is calling, without us passing any user info manually
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called store without authentication present");
    }

    // Check if this user already exists in our database
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (user !== null) {
      // User exists — update their profile info in case it changed in Clerk
      await ctx.db.patch(user._id, {
        name: identity.name,
        email: identity.email,
        imageUrl: identity.pictureUrl,
      });
      return user._id;
    }

    // New user — generate a username from their email (before the @)
    // They can change this later
    const baseUsername =
      identity.email
        ?.split("@")[0]
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "") ?? `user${Date.now()}`;

    // Check if that username is taken
    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", baseUsername))
      .unique();

    // If taken, append random digits to make it unique
    const username = existing
      ? `${baseUsername}${Math.floor(Math.random() * 1000)}`
      : baseUsername;

    // Create the user
    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      clerkId: identity.subject, // "subject" is the Clerk user ID
      name: identity.name,
      email: identity.email,
      imageUrl: identity.pictureUrl,
      username,
      createdAt: Date.now(),
    });
  },
});

// Get the currently authenticated user
export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
  },
});

// Get any user by username — no auth required (for public card pages)
export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();
  },
});
