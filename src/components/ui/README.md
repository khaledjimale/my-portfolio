# UI components

`3d-carousel.tsx` is the graduation carousel. It uses the existing React,
TypeScript and Framer Motion dependencies, with colocated `3d-carousel.css`.
Pass `photos={[{ src, alt }]}`. It supports continuous mouse dragging, horizontal
touch swipes, wheel/two-finger trackpad scrolling, and previous/next buttons.
The ring settles on the nearest photo after a gesture. Reduced-motion settings
disable animated settling and button effects. The native modal photo viewer
supports Escape, a close button, backdrop dismissal, and focus restoration.
Trackpad pinch zoom remains available; ordinary wheel gestures over the carousel
control its rotation rather than scrolling the page.

The application source root is `src`, so reusable UI belongs in
`src/components/ui`, rather than a second components directory outside the source
tree. This keeps reusable components separate from page content and matches the
usual shadcn `@/components/ui` convention when an alias is configured.
Global styles are `src/index.css`; page styles are `src/App.css`.

## Optional Tailwind and shadcn setup

This integration uses existing CSS; Tailwind and shadcn are not installed.
TypeScript is already configured, and Framer Motion is already a dependency.

1. Run `npm install tailwindcss @tailwindcss/vite`.
2. Add `import tailwindcss from '@tailwindcss/vite'` to `vite.config.ts`, then
   add `tailwindcss()` to its existing `plugins` array.
3. Add `@import "tailwindcss";` at the top of `src/index.css`, preserving the
   existing theme tokens and styles. Review Tailwind's reset against the portfolio.
4. Add `"paths": { "@/*": ["./src/*"] }` to `compilerOptions` in both
   `tsconfig.json` and `tsconfig.app.json`. Add the matching Vite alias:
   `resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }`,
   importing `fileURLToPath` from `node:url`.
5. Run `npx shadcn@latest init`, selecting `src/index.css` and the
   `@/components/ui` alias. Review generated style changes before adopting them.
6. Components can then be added with `npx shadcn@latest add button`.

References: https://ui.shadcn.com/docs/installation/vite and
https://tailwindcss.com/docs/installation/using-vite.
