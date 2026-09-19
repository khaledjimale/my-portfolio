# Khalid Abdulkadir Jimale — Portfolio

Personal portfolio for **Khalid Abdulkadir Jimale**, Computer Science student & developer based in Mogadishu, Somalia.

## Featured work

- **[Smart Property Registration & Recovery system](https://github.com/khaledjimale/smart-property-tracking)** — property registration, ownership transfer, and recovery platform
- **Benadir App for Online Learning** — online learning platform
- **[Wargeyska](https://wargeyska.net/)** — live news/media website

## Contact

- Email: khaalidabdi21@gmail.com
- Phone: +252612334705
- Location: Somalia / Mogadishu

## Run locally

Use a Node.js version compatible with Vite 8 (Node 20.19+ or 22.12+).
From the project directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To request a specific port, use
`npm run dev -- --port 5175`.

Build for production:

```bash
npm run build
npm run preview
```

The build runs TypeScript checks and writes the static site to `dist/`.
`preview` serves that build locally; it is not a production hosting service.
Run `npm run lint` for the project's Oxlint checks.

## Portfolio sections

- About and technical skills.
- Professional Growth: Bile Initiative 2026 Software Development training
  (20 August–3 September 2026), workshop photos, and certificate viewing/download.
- Graduation: Class of 2026 message and an interactive 3D photo carousel.
- Featured Work and contact/social links.

The site supports light, dark, and system themes, with the preference saved in
the browser. Layouts adapt to mobile and desktop screens.

## Technology and structure

React 19, TypeScript, Vite, Framer Motion, and plain CSS. Tailwind and shadcn are
not required by the current implementation. This is a static frontend; no
backend, database, or environment variables are needed to run it.

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Profile, projects, sections, navigation, and theme selection |
| `src/App.css` | Portfolio layout, responsive rules, and section styles |
| `src/index.css` | Global styles and light/dark theme tokens |
| `src/components/ui/3d-carousel.tsx` | Reusable graduation carousel and photo viewer |
| `src/components/ui/3d-carousel.css` | Carousel frames, controls, and animations |
| `src/assets/graduation_images/` | Graduation photos |
| `src/assets/my-images/` | Profile, seminar, and Bile Initiative photos |
| `src/assets/certificates/` | Downloadable training certificate |

## Updating content

Edit the `profile`, `skills`, and `projects` data in `src/App.tsx` to update the
portfolio. Training and graduation messages are in their corresponding sections.

Graduation images are imported automatically from `src/assets/graduation_images/`
for `.png`, `.jpg`, and `.jpeg` files. Files containing `KHAALID-` appear first,
followed by the remaining files in filename order. One duplicate is explicitly
excluded by filename in `graduationPhotos`; its original file is retained.
The carousel currently displays 13 photos. Update that filter when replacing or
removing images. Keep image files reasonably sized for faster loading.

The certificate is imported from
`src/assets/certificates/bile-software-development-2026.pdf` and bundled into the
production build. Replace that file to update both certificate links.

## Carousel controls

Drag with a mouse, swipe horizontally on a touchscreen, or scroll with a
trackpad/mouse wheel over the carousel. Previous/next buttons offer an alternative.
Select a photo to open the enlarged viewer; close it with Escape, the close
button, or the backdrop. Keyboard focus returns to the selected photo.
Reduced-motion preferences disable the settling animation and button effects.

See [UI component notes](src/components/ui/README.md) for the component API and
optional Tailwind/shadcn setup instructions.
