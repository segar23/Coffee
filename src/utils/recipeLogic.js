export const calculateRecipe = (variety, process, honeyLevel, brewMethod, flavorProfile, cups = 1) => {
  // Ensure cups is 1 for methods that don't scale well
  const actualCups = ['Espresso', 'Moka Pot'].includes(brewMethod) ? 1 : (brewMethod === 'AeroPress' ? Math.min(cups, 2) : cups);

  // Base recipes by brew method
  const baseRecipes = {
    AeroPress: {
      coffee: 15 * actualCups,
      water: 250 * actualCups, // ml/g
      temp: 93, // C
      grind: 3, // Ode 2
      prep: [
        actualCups > 1 ? "Invert the AeroPress XL and place the plunger just inside the chamber." : "Invert the AeroPress and place the plunger just inside the chamber.",
        `Add ${15 * actualCups}g of medium-fine ground coffee.`
      ],
      brew: [
        { time: "0:00", text: `Start timer. Pour ${50 * actualCups}g of water, stir back and forth 5 times.` },
        { time: "0:30", text: `Pour remaining water up to ${250 * actualCups}g.` },
        { time: "1:30", text: "Attach the cap with a rinsed paper filter (Recommended for clarity) or steel filter (for heavy body)." },
        { time: "2:00", text: "Carefully flip onto a sturdy mug and press gently for 30s." }
      ]
    },
    Chemex: {
      coffee: 15 * actualCups,
      water: 250 * actualCups,
      temp: 95,
      grind: 7,
      prep: [
        "Rinse the thick Chemex filter with hot water to remove papery taste and preheat, then discard water.",
        `Add ${15 * actualCups}g of medium-coarse ground coffee.`
      ],
      brew: [
        { time: "0:00", text: `Start timer. Pour ${45 * actualCups}g of water, swirl the slurry to ensure all grounds are wet.` },
        { time: "0:45", text: `Pour in concentric circles up to ${150 * actualCups}g. Let it drain slightly.` },
        { time: "1:45", text: `Gently pour the remaining water to reach ${250 * actualCups}g.` },
        { time: `${3 + (actualCups * 0.5)}:00`, text: "Drawdown should finish around this time." }
      ]
    },
    Espresso: {
      coffee: 18,
      water: 36, // yield in g
      temp: 93,
      grind: 1, // "Not recommended for standard Ode 2 without SSP burrs"
      prep: [
        "Grind 18g finely directly into the portafilter.",
        "Use a WDT tool to thoroughly declump and distribute the grounds.",
        "Tamp flat and level with firm pressure."
      ],
      brew: [
        { time: "0:00", text: "Lock in and pull the shot, targeting a 36g liquid yield." },
        { time: "0:25", text: "Extraction should complete around 25-30 seconds." }
      ]
    },
    "Moka Pot": {
      coffee: 15,
      water: 150,
      temp: 100, // Boiling water in base
      grind: 2,
      prep: [
        "Fill the bottom chamber with boiling water just below the safety valve.",
        "Fill the filter basket with coffee, level it off, but DO NOT tamp.",
        "Carefully screw the top and bottom together (use a towel for the hot base)."
      ],
      brew: [
        { time: "0:00", text: "Place on medium-low heat with the lid open." },
        { time: "Heat", text: "When coffee flows smoothly and begins to sputter/gurgle, remove from heat immediately." },
        { time: "End", text: "Run the bottom chamber under cold tap water to stop extraction and prevent bitterness." }
      ]
    },
    "French Press": {
      coffee: 15 * actualCups,
      water: 250 * actualCups,
      temp: 95,
      grind: 8,
      prep: [
        `Add ${15 * actualCups}g of medium-coarse ground coffee to the carafe.`
      ],
      brew: [
        { time: "0:00", text: `Start timer. Pour ${250 * actualCups}g of hot water quickly to saturate all grounds.` },
        { time: "4:00", text: "Gently stir the 'crust' of coffee that formed at the top. Scoop off the remaining foam and floating bits." },
        { time: "9:00", text: "Insert the plunger but press only down to the surface of the coffee (do not press to the bottom). Pour gently." }
      ]
    }
  };

  const recipe = JSON.parse(JSON.stringify(baseRecipes[brewMethod]));

  // 1. Flavor Profile Adjustments (Macro temp adjustment)
  if (flavorProfile === "Fruity & Floral") {
    // Dense, high-altitude coffees need heat to extract complex acids
    recipe.temp += 1;
  } else if (flavorProfile === "Chocolate & Nutty") {
    // These extract very easily, lower temp avoids astringency and bitterness
    recipe.temp -= 2;
  }

  // 2. Adjustments based on variety
  if (variety === "Gesha") {
    // Gesha is delicate, slightly lower temp and coarser grind prevents over-extracting bitterness
    if (brewMethod !== "Espresso" && brewMethod !== "Moka Pot") {
      recipe.temp -= 1;
      recipe.grind += 1;
      recipe.prep.push("Gesha Tip: Grind slightly coarser to highlight delicate floral aromatics.");
    }
  } else if (variety === "Castillo") {
    recipe.temp += 1;
  }

  // 3. Adjustments based on processing
  if (process === "Natural") {
    recipe.temp -= 1;
    if (brewMethod !== "Espresso" && brewMethod !== "Moka Pot") {
      recipe.grind += 0.5;
    }
    recipe.prep.push("Natural Process Tip: Lower water temp helps avoid extracting overly fermenty or boozy flavors.");
  } else if (process === "Washed") {
    recipe.temp += 1;
  } else if (process === "Honey") {
    if (honeyLevel === "Red" || honeyLevel === "Black") {
      recipe.temp -= 1;
      recipe.prep.push("Honey (Red/Black) Tip: Slightly lower temp compensates for heavy mucilage processing.");
    }
  }

  // Convert temp to F for display
  recipe.tempF = Math.round((recipe.temp * 9/5) + 32);

  // Moka temp is boiling water in base, handled specially
  if (brewMethod === "Moka Pot") {
    recipe.tempDisplay = "Boiling (in base)";
  } else {
    recipe.tempDisplay = `${recipe.temp}°C / ${recipe.tempF}°F`;
  }

  // Grind text adjustment
  if (brewMethod === "Espresso") {
    recipe.grindDisplay = `${recipe.grind} (Need SSP burrs)`;
  } else {
    recipe.grindDisplay = `${recipe.grind}`;
  }

  return recipe;
};
