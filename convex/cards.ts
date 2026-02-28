import { mutation, query } from "./_generated/server"; //this is a file that is created when running npx convex dev.
import { v } from "convex/values"; //a utility file for working with the values stored in the convex database.

/** This is a query constructor function provided by convex. The args field requires an object that defines validators using the v utiltiy. it does not accept arbitrary javascript values or types in the args object or public functions. */

// Get the card for the currently logged-in user
export const getMyCard = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    // First, find the user
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) return null;

    // Then find their card using the by_user index
    return await ctx.db
      .query("cards")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();
  },
});

// Get a card by the owner's username — public, no auth needed
export const getCardByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    //ctx is the context object. It provides backend functions to interact with the database. Queries get data from the database, mutations modify the database like create, insert, update, delete. Actions are used to call third party APIs or other backend functions.
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    if (!user) return null;

    return await ctx.db
      .query("cards")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();
  },
});

// Create or update the user's card (one card per user)
export const upsertCard = mutation({
  args: {
    firstName: v.string(),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    website: v.optional(v.string()),
    bio: v.optional(v.string()),
    socialLinks: v.optional(
      v.array(
        v.object({
          platform: v.string(),
          url: v.string(),
          label: v.optional(v.string()),
        }),
      ),
    ),
    theme: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) throw new Error("User not found");

    const existingCard = await ctx.db
      .query("cards")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    const now = Date.now();

    if (existingCard) {
      // Update existing card
      await ctx.db.patch(existingCard._id, {
        ...args,
        updatedAt: now,
      });
      return existingCard._id;
    }

    // Create new card
    return await ctx.db.insert("cards", {
      userId: user._id,
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Delete the user's card
export const deleteCard = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (!user) throw new Error("User not found");

    const card = await ctx.db
      .query("cards")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (card) {
      await ctx.db.delete(card._id);
    }
  },
});
