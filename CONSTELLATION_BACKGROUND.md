# Interactive constellation background

This version adds a global, fixed canvas particle system that runs behind the portfolio.

- Particles drift and twinkle subtly.
- Nearby particles form constellation lines.
- Desktop pointer movement attracts nearby particles and creates a local star network.
- Mobile devices use fewer particles and skip cursor calculations.
- Light and dark themes use separate particle colours.
- `prefers-reduced-motion` is respected.
- The canvas uses `pointer-events: none`, so navigation, cards, and links remain fully interactive.

Implementation:

- `components/ConstellationBackground.tsx`
- `components/Portfolio.tsx`
- `app/globals.css`
