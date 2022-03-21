module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#374151",
        accent: "#f0f0f0",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.accent"),
            "--tw-prose-headings": theme("colors.accent"),
            "--tw-prose-code": theme("colors.red[300]"),
            "--tw-prose-bold": theme("colors.accent"),
            "--tw-prose-quotes": theme("colors.accent"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-radix"),
    require("@tailwindcss/typography"),
  ],
};
