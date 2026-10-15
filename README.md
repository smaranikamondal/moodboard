# Mood-to-UI Generator

Mood-to-UI Generator turns a feeling into a small, usable design system. Choose from six moods—Focused, Playful, Calm, Chaotic, Cozy, or Bold—to preview a coordinated five-color palette, a Google Fonts typography pairing, and a sample UI card. Generate again to get a subtle color variation, then copy the resulting CSS custom properties into your project.

## Run it

Open `index.html` in a modern web browser. No build tools, package installation, or local server are required. An internet connection is needed to load the optional Google Fonts.

## Features

- Six mood presets with distinct palettes, typography, spacing, shadows, and corner radii.
- Small randomized HSL variations for the primary, accent, and surface colors.
- Live palette, font pairing, and sample-card previews.
- Readable foreground colors selected for the sample card's primary button and badge.
- A ready-to-copy `:root` CSS variables block, with a fallback for browsers that don't provide the Clipboard API.
- Responsive layout and reduced-motion support.

## Built with

This app uses HTML, CSS, and vanilla JavaScript, with Google Fonts loaded using a stylesheet link. It was built with GitHub Copilot.
