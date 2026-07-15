# Colombian Coffee Configurator

A premium, interactive web application to calculate and display the optimal brewing recipe for Colombian coffee based on bean characteristics (variety, processing method, flavor notes) and brewing method.

## Features

- **Variety Customization:** Supports specific varieties (Castillo, Caturra, Bourbon, Gesha) and handles "Generic / Unknown" profiles.
- **Process Adjustments:** Adjusts temp and grind settings dynamically depending on whether the coffee is Washed, Natural, or Honey-processed (including White, Yellow, Red, or Black honey levels).
- **Extraction Optimization:** Leverages a flavor notes selector (Fruity & Floral, Sweet & Balanced, Chocolate & Nutty) to adapt brewing temperatures to roast/extraction profiles.
- **Dynamic Cups Selector:** Scales recipes (coffee dose and water volume) proportionally up to 4 cups for Chemex and French Press. Includes smart-gating to lock single servings for AeroPress, Espresso, and Moka Pots.
- **AeroPress XL Support:** Custom-scales AeroPress recipes up to 2 cups specifically for the AeroPress XL.
- **Separated Preparation & Timeline Steps:** Isolates prep checklist steps from a beautiful, time-aligned brewing timeline.

## Tech Stack

- **Core:** React, Vite
- **Styling:** Custom Vanilla CSS (Glassmorphism, dark/warm palette, staggered entry animations)
- **Icons:** `lucide-react`

## Getting Started

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
