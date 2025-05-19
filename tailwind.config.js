module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#111827',
        },
      },
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [],
};