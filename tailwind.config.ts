import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			body: ["var(--font-body)", "sans-serif"],
  			display: ["var(--font-display)", "serif"],
  			roboto: ["Roboto","sans-serif"],
  			pw: ['"Playwrite US Trad"', "cursive"]
  		},
  		colors: {
  			bb: {
  				blue: '#2C7A7B',
					"brown-10": '#F9F1E7', 
					"brown-20": '#EFD9C2',
  				brown: '#3B2417',
          cream: '#FFF7EE',
          rose: '#F7C9B3',
          gold: '#E2A45A',
          ink: '#1F150F',
          sage: '#DCE8D5',
  			}
  		},
  		backgroundImage: {
  			'gradiedsnt-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
