const moodConfigs = {
  focused: {
    name: "Focused",
    caption: "A clear headspace for your next big idea.",
    palette: {
      background: "#edf2ee",
      surface: "#ffffff",
      primary: "#365c49",
      accent: "#d4ac72",
      text: "#26362d",
    },
    headingFont: "Manrope",
    bodyFont: "DM Sans",
    radius: 12,
    shadow: "0 10px 24px rgb(38 53 46 / 9%)",
    spacing: 16,
    badge: "IN GOOD FLOW",
    title: "Make room for good ideas.",
    description: "A calm place to gather your thoughts, find your focus, and let the next big thing take shape.",
  },
  playful: {
    name: "Playful",
    caption: "Bright ideas deserve a little room to play.",
    palette: {
      background: "#fff2e9",
      surface: "#fffdf9",
      primary: "#b94735",
      accent: "#f2bd55",
      text: "#492e2b",
    },
    headingFont: "Fredoka",
    bodyFont: "Nunito",
    radius: 22,
    shadow: "0 12px 25px rgb(135 68 49 / 13%)",
    spacing: 20,
    badge: "GOOD VIBES ONLY",
    title: "Big ideas, zero boring bits.",
    description: "A cheerful little corner for your colorful thoughts, happy accidents, and what-if moments.",
  },
  calm: {
    name: "Calm",
    caption: "A softer pace for a clearer perspective.",
    palette: {
      background: "#eff3f2",
      surface: "#fbfdfc",
      primary: "#496d70",
      accent: "#b7c8bc",
      text: "#2c3e40",
    },
    headingFont: "Lora",
    bodyFont: "Inter",
    radius: 15,
    shadow: "0 8px 28px rgb(38 63 62 / 8%)",
    spacing: 18,
    badge: "TAKE A BREATH",
    title: "A little space to just be.",
    description: "Slow down, settle in, and give your thoughts the quiet they need to find their way.",
  },
  chaotic: {
    name: "Chaotic",
    caption: "Big energy. Unexpected turns. Your rules.",
    palette: {
      background: "#f3f0ff",
      surface: "#fffdfd",
      primary: "#5135b2",
      accent: "#ef6655",
      text: "#241c39",
    },
    headingFont: "Bungee",
    bodyFont: "Space Mono",
    radius: 4,
    shadow: "5px 6px 0 rgb(36 28 57 / 16%)",
    spacing: 15,
    badge: "NO PLAN. ALL VIBES.",
    title: "Break the pattern. Then make one.",
    description: "A gloriously unpredictable space for tangents, wild experiments, and ideas that refuse to sit still.",
  },
  cozy: {
    name: "Cozy",
    caption: "A warm little nook for thoughtful moments.",
    palette: {
      background: "#f5eee5",
      surface: "#fffaf2",
      primary: "#76513c",
      accent: "#bf8861",
      text: "#443329",
    },
    headingFont: "Fraunces",
    bodyFont: "Nunito Sans",
    radius: 18,
    shadow: "0 10px 22px rgb(87 58 37 / 11%)",
    spacing: 19,
    badge: "STAY AWHILE",
    title: "Settle in. You're right on time.",
    description: "A warm and welcoming place to collect little thoughts and let your best ideas simmer.",
  },
  bold: {
    name: "Bold",
    caption: "Make a statement before you say a word.",
    palette: {
      background: "#f5eee9",
      surface: "#fffdfa",
      primary: "#a3372f",
      accent: "#db9d32",
      text: "#302322",
    },
    headingFont: "Syne",
    bodyFont: "Inter",
    radius: 8,
    shadow: "0 12px 24px rgb(66 35 31 / 15%)",
    spacing: 18,
    badge: "MAKE YOUR MARK",
    title: "Leave a little impact.",
    description: "For brave first drafts, strong opinions, and ideas that are ready to take up space.",
  },
};

const paletteLabels = [
  ["background", "Background"],
  ["surface", "Surface"],
  ["primary", "Primary"],
  ["accent", "Accent"],
  ["text", "Text"],
];

const moodButtons = document.querySelectorAll(".mood-button");
const preview = document.querySelector("#preview");
const swatches = document.querySelector("#swatches");
const typePreview = document.querySelector("#type-preview");
const cssOutput = document.querySelector("#css-output");
const copyStatus = document.querySelector("#copy-status");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
let selectedMood = "focused";
let currentDesign;

function hexToHsl(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16) / 255);
  const [red, green, blue] = channels;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const difference = maximum - minimum;
  let hue = 0;
  let saturation = 0;
  const lightness = (maximum + minimum) / 2;

  if (difference !== 0) {
    saturation = difference / (1 - Math.abs(2 * lightness - 1));
    switch (maximum) {
      case red:
        hue = ((green - blue) / difference + (green < blue ? 6 : 0)) / 6;
        break;
      case green:
        hue = ((blue - red) / difference + 2) / 6;
        break;
      default:
        hue = ((red - green) / difference + 4) / 6;
    }
  }

  return { hue: hue * 360, saturation, lightness };
}

function hslToHex(hue, saturation, lightness) {
  const normalizedHue = ((hue % 360) + 360) % 360 / 360;
  const hueToRgb = (p, q, t) => {
    let channel = t;
    if (channel < 0) channel += 1;
    if (channel > 1) channel -= 1;
    if (channel < 1 / 6) return p + (q - p) * 6 * channel;
    if (channel < 1 / 2) return q;
    if (channel < 2 / 3) return p + (q - p) * (2 / 3 - channel) * 6;
    return p;
  };

  const q = lightness < 0.5
    ? lightness * (1 + saturation)
    : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  const channels = saturation === 0
    ? [lightness, lightness, lightness]
    : [
        hueToRgb(p, q, normalizedHue + 1 / 3),
        hueToRgb(p, q, normalizedHue),
        hueToRgb(p, q, normalizedHue - 1 / 3),
      ];

  return `#${channels.map((channel) => Math.round(channel * 255).toString(16).padStart(2, "0")).join("")}`;
}

function varyColor(hex, { hueShift = 0, lightnessShift = 0, saturationShift = 0 } = {}) {
  const hsl = hexToHsl(hex);
  return hslToHex(
    hsl.hue + hueShift,
    Math.min(1, Math.max(0, hsl.saturation + saturationShift)),
    Math.min(1, Math.max(0, hsl.lightness + lightnessShift)),
  );
}

function randomBetween(minimum, maximum) {
  return minimum + Math.random() * (maximum - minimum);
}

function createPalette(basePalette) {
  const hueShift = randomBetween(-5, 5);
  const colors = { ...basePalette };
  // Keep the background and text colors stable so small variations don't compromise readability.
  colors.primary = varyColor(basePalette.primary, {
    hueShift,
    lightnessShift: randomBetween(-0.025, 0.025),
    saturationShift: randomBetween(-0.025, 0.025),
  });
  colors.accent = varyColor(basePalette.accent, {
    hueShift: hueShift * 0.6,
    lightnessShift: randomBetween(-0.025, 0.025),
    saturationShift: randomBetween(-0.025, 0.025),
  });
  colors.surface = varyColor(basePalette.surface, { lightnessShift: randomBetween(-0.012, 0.012) });
  return colors;
}

function colorToRgb(hex) {
  return hex.slice(1).match(/.{2}/g).map((part) => parseInt(part, 16));
}

function relativeLuminance(hex) {
  const channels = colorToRgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(firstColor, secondColor) {
  const luminances = [relativeLuminance(firstColor), relativeLuminance(secondColor)].sort((a, b) => b - a);
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

function bestForeground(backgroundColor, candidates) {
  // Pick the strongest available foreground for buttons and badges.
  return candidates.reduce((best, candidate) => (
    contrastRatio(backgroundColor, candidate) > contrastRatio(backgroundColor, best)
      ? candidate
      : best
  ));
}

function fontStack(fontName) {
  const fallback = ["Bungee", "Fredoka", "Lora", "Fraunces", "Syne"].includes(fontName) ? "serif" : "sans-serif";
  return `'${fontName}', ${fallback}`;
}

function makeCssVariables(design) {
  const { palette, headingFont, bodyFont, radius } = design;
  return `:root {
  --color-bg: ${palette.background};
  --color-surface: ${palette.surface};
  --color-primary: ${palette.primary};
  --color-accent: ${palette.accent};
  --color-text: ${palette.text};
  --font-heading: ${fontStack(headingFont)};
  --font-body: ${fontStack(bodyFont)};
  --radius: ${radius}px;
}`;
}

function renderSwatches(palette) {
  swatches.replaceChildren(...paletteLabels.map(([key, label]) => {
    const item = document.createElement("div");
    item.className = "swatch";

    const color = document.createElement("div");
    color.className = "swatch-color";
    color.style.backgroundColor = palette[key];
    color.setAttribute("aria-label", `${label} color ${palette[key]}`);

    const name = document.createElement("span");
    name.className = "swatch-name";
    name.textContent = label;

    const hex = document.createElement("span");
    hex.className = "swatch-hex";
    hex.textContent = palette[key].toUpperCase();

    item.append(color, name, hex);
    return item;
  }));
}

function renderTypography(design) {
  const headingExample = document.createElement("div");
  headingExample.className = "type-example";
  const headingLabel = document.createElement("span");
  headingLabel.className = "type-label";
  headingLabel.textContent = "HEADING · " + design.headingFont;
  const headingText = document.createElement("p");
  headingText.className = "type-sample heading-sample";
  headingText.textContent = "A thought worth keeping";
  const headingName = document.createElement("span");
  headingName.className = "font-name";
  headingName.textContent = design.headingFont + " · Heading";
  headingExample.append(headingLabel, headingText, headingName);

  const bodyExample = document.createElement("div");
  bodyExample.className = "type-example";
  const bodyLabel = document.createElement("span");
  bodyLabel.className = "type-label";
  bodyLabel.textContent = "BODY · " + design.bodyFont;
  const bodyText = document.createElement("p");
  bodyText.className = "type-sample body-sample";
  bodyText.textContent = "Good design starts with a feeling and grows from there.";
  const bodyName = document.createElement("span");
  bodyName.className = "font-name";
  bodyName.textContent = design.bodyFont + " · Body";
  bodyExample.append(bodyLabel, bodyText, bodyName);

  typePreview.replaceChildren(headingExample, bodyExample);
}

function renderDesign(moodKey) {
  const config = moodConfigs[moodKey];
  const design = { ...config, palette: createPalette(config.palette) };
  const buttonForeground = bestForeground(design.palette.primary, ["#ffffff", design.palette.text, "#111111"]);
  const tagForeground = bestForeground(design.palette.accent, ["#ffffff", design.palette.text, "#111111"]);
  currentDesign = design;

  preview.style.setProperty("--color-bg", design.palette.background);
  preview.style.setProperty("--color-surface", design.palette.surface);
  preview.style.setProperty("--color-primary", design.palette.primary);
  preview.style.setProperty("--color-accent", design.palette.accent);
  preview.style.setProperty("--color-text", design.palette.text);
  preview.style.setProperty("--font-heading", fontStack(design.headingFont));
  preview.style.setProperty("--font-body", fontStack(design.bodyFont));
  preview.style.setProperty("--radius", `${design.radius}px`);
  preview.style.setProperty("--preview-shadow", design.shadow);
  preview.style.setProperty("--spacing", `${design.spacing}px`);
  preview.style.setProperty("--button-foreground", buttonForeground);
  preview.style.setProperty("--tag-foreground", tagForeground);

  document.querySelector("#preview-mood").textContent = design.name.toUpperCase();
  document.querySelector("#mood-caption").textContent = design.caption;
  document.querySelector("#sample-tag").textContent = design.badge;
  document.querySelector("#sample-title").textContent = design.title;
  document.querySelector("#sample-description").textContent = design.description;
  cssOutput.value = makeCssVariables(design);

  renderSwatches(design.palette);
  renderTypography(design);
  preview.classList.remove("is-changing");
  requestAnimationFrame(() => {
    preview.classList.add("is-changing");
    window.setTimeout(() => preview.classList.remove("is-changing"), 550);
  });
}

async function copyCssVariables() {
  const value = cssOutput.value;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
    } else {
      // Local file URLs and older browsers may not expose the Clipboard API.
      cssOutput.focus();
      cssOutput.select();
      const copied = document.execCommand("copy");
      cssOutput.setSelectionRange(0, 0);
      if (!copied) throw new Error("The browser could not copy the CSS variables.");
    }
    copyStatus.textContent = "Copied! Your CSS variables are ready to paste.";
  } catch (error) {
    copyStatus.textContent = "Couldn't copy automatically. Select the CSS above and copy it.";
    console.error("Copying CSS variables failed:", error);
  }
}

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedMood = button.dataset.mood;
    moodButtons.forEach((moodButton) => {
      moodButton.setAttribute("aria-pressed", String(moodButton === button));
    });
    renderDesign(selectedMood);
    copyStatus.textContent = "";
  });
});

generateButton.addEventListener("click", () => {
  renderDesign(selectedMood);
  copyStatus.textContent = "";
});

copyButton.addEventListener("click", copyCssVariables);

renderDesign(selectedMood);
