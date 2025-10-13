export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          50: "rgba(255, 255, 255, 0.5)",
          100: "rgba(255, 255, 255, 0.6)",
          200: "rgba(255, 255, 255, 0.7)",
        },
      },
      backdropBlur: {
        glass: "10px",
      },
      boxShadow: {
        "glass-sm": "var(--shadow-sm)",
        "glass-md": "var(--shadow-md)",
        "glass-lg": "var(--shadow-lg)",
      },
      borderRadius: {
        "glass-sm": "8px",
        "glass-md": "12px",
        "glass-lg": "16px",
        "glass-xl": "24px",
      },
      backgroundColor: {
        "glass-primary": "var(--glass-background)",
        "glass-secondary": "var(--glass-background-secondary)",
        card: "var(--card-bg)",
      },
      borderColor: {
        glass: "var(--glass-border)",
        card: "var(--card-border)",
      },
      spacing: {
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
};
