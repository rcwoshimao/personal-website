const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Menlo', 'monospace'], // Ensure the mono font is defined
      },
    },
  },
  plugins: [],
});