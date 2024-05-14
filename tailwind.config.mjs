/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#0098E9",
        "primary-accent": "#0098e9cc",
        bg: "#12172d",
        "bg-accent": "#1E2337",
        "bg-accent-2": "#2A314B",
      },
    },
  },
  plugins: [],
};
