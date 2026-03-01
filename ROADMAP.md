# e-card Roadmap

## Completed

### Phase 1: Foundation
- [x] Dependencies installed
- [x] Convex schema (users + cards tables)
- [x] Clerk auth integration with Convex
- [x] Providers setup (ClerkProvider > ConvexClientProvider)
- [x] Middleware protecting `/dashboard` routes
- [x] shadcn/ui components installed

### Phase 2: User Management
- [x] Sign-in and sign-up pages
- [x] Convex user functions (store, getUser, getUserByUsername)
- [x] useStoreUser hook to sync Clerk user to Convex

### Phase 3: Card CRUD & Dashboard
- [x] Convex card functions (getMyCard, getCardByUsername, upsertCard, deleteCard)
- [x] Dashboard layout with navbar
- [x] CardForm component (create/edit)
- [x] CardDisplay component (preview)
- [x] Dashboard page showing form + preview

---

## Remaining

### Phase 4: Public Card Page
Create `/card/[username]` route for sharing cards publicly.

- [ ] `src/app/card/[username]/page.tsx` — public page, no auth required
- [ ] Fetch card using `getCardByUsername` query
- [ ] Display card using `CardDisplay` component
- [ ] Handle not found state (user doesn't exist or has no card)
- [ ] Add meta tags for social sharing (Open Graph)

### Phase 5: Sharing Features
Add ways for users to share their card.

- [ ] **QR Code dialog** — generate QR code pointing to `/card/[username]`
  - Use `qrcode.react` (already installed)
  - Add "Share" button to dashboard that opens dialog
- [ ] **vCard download** — export card as `.vcf` file
  - Use `vcard-creator` (already installed)
  - Add "Download Contact" button on public card page
- [ ] **Copy link / Web Share API**
  - Copy card URL to clipboard
  - Use native share sheet on mobile (Web Share API)

### Phase 6: Landing Page
Create a marketing landing page at `/`.

- [ ] Hero section with value proposition
- [ ] Feature highlights (QR sharing, vCard download, etc.)
- [ ] CTA buttons (Sign up, View demo card)
- [ ] Use existing Container/FadeIn/SectionIntro components if available
- [ ] Mobile responsive

---

## Future Ideas (Optional)
- [ ] Multiple themes/color schemes
- [ ] Social links editor (Phase 2 of CardForm)
- [ ] Custom slugs (e.g., `/card/james` instead of username)
- [ ] Analytics (view count on cards)
- [ ] Profile photo upload
