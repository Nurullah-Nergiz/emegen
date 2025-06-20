/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: ["selector"],
   content: [
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            primary: "#d81f26",
            secondary: "#304455",
            tertiary: "#829bb0",
            main: "#fff",
            headerBackground:"#f2f2f2"
         },
      },
   },
   plugins: [],
};
