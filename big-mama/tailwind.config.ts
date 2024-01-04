import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#9561E2",
        "purple-200": "#DAC8F5",
        white: "#FFFFFF",

      },
    },
  },
  darkMode: "class",
  plugins: [   nextui({
    themes: {
      light: {
        // ...
        colors: {
          background:"#ffffff"
          
        }
      },
      dark: {
        // ...
        colors: {},
      },
      // ... custom themes
    },
  }),
]
}
export default config;
