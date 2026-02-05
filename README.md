# Next.js Business Template

A modern, production-ready Next.js starter template with essential dependencies and reusable components for business applications.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Framer Motion** for smooth animations
- **GSAP** for advanced animations
- **ESLint & Prettier** for code quality
- **Responsive design** with mobile-first approach

## 📦 Core Dependencies

### Production Dependencies

- `next@15.4.4` - React framework
- `react@19.1.0` & `react-dom@19.1.0` - React library
- `@gsap/react@2.1.2` & `gsap@3.13.0` - Animation library
- `motion@12.23.9` - Framer Motion for animations

### Development Dependencies

- `typescript@5` - Type safety
- `tailwindcss@4` - Utility-first CSS framework
- `eslint@9` & `eslint-config-next` - Code linting
- `prettier@3.6.2` - Code formatting
- `@types/react@19` & `@types/react-dom@19` - TypeScript types

## 🧩 Core Components

### `Container.tsx`

A responsive container component with consistent max-width and padding:

- Responsive padding: `px-4 sm:px-6 lg:px-8`
- Max width: `max-w-screen-xl` (1400px on 2xl screens)
- Customizable via className prop

### `FadeIn.tsx`

Animation components using Framer Motion:

- `FadeIn` - Individual fade-in animation
- `FadeInStagger` - Staggered fade-in animations for lists
- Respects user's motion preferences
- Optimized viewport detection

### `SectionIntro.tsx`

A reusable section header component:

- Eyebrow text (small label above heading)
- Main heading with responsive typography
- Optional description text
- Built-in fade-in animation

### `tailwind-indicator.tsx`

Development utility to show current breakpoint (only in development mode)

## 🛠️ Getting Started

1. **Clone or copy this template**
2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** to view your application

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
└── components/            # Reusable components
    ├── Container.tsx      # Responsive container
    ├── FadeIn.tsx         # Animation components
    ├── SectionIntro.tsx   # Section headers
    └── tailwind-indicator.tsx
```

## 🎨 Styling

This template uses **Tailwind CSS v4** with:

- Custom CSS variables for theming
- Dark mode support
- Responsive design utilities
- Custom color scheme (easily customizable)

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Customization

1. **Update colors** in `src/app/globals.css`
2. **Modify components** in `src/components/`
3. **Add new pages** in `src/app/`
4. **Configure Tailwind** in `tailwind.config.js`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [GSAP Documentation](https://greensock.com/docs/)

---

**Ready to build your next business application?** 🚀
