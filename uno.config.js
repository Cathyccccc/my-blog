import { defineConfig, presetIcons, presetWind4, transformerDirectives } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  transformers: [transformerDirectives()], // 方便使用 theme() 函数
  presets: [
    presetWind4(),
    presetIcons({
      // options
      prefix: "i-",
      extraProperties: {
        display: "inline-block",
      },
      scale: 1.2,
    }),
    // presetUno() - if you want to use other atomic CSS as well
  ],
  theme: {
    colors: {
      "c-default": "#111112",
      primary: "#6366f1",
      success: "#059669",
      warning: "#eab308",
      danger: "#dc2626",
      theme: "#f4f0fd",
      app: "#f8f8ff",
    },
    darkColors: {
      theme: "#5E27CA",
      nav: "#3b1682",
      line: "#552aa8",
    },
  },
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
    [
      /^dark:text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.darkColors[c] };
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { backgroundColor: theme.colors[c] };
      },
    ],
    [
      /^dark:bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { backgroundColor: theme.darkColors[c] };
      },
    ],
    [
      /^dark:border-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { borderColor: theme.darkColors[c] };
      },
    ],
    ["custom-bg-size", { "background-size": "200% auto" }],
    [
      "custom-origin-1",
      {
        "transform-origin": "30px 36px",
      },
    ],
    [
      "custom-origin-2",
      {
        "transform-origin": "30px 70px",
      },
    ],
    [
      "custom-border-linear",
      {
        background:
          "linear-gradient(to right, white, white) padding-box, linear-gradient(135deg, #5E27CA, #D1BEF6) border-box",
        transition: "all .3s",
      },
    ],
    [
      "custom-dark-border-linear",
      {
        background:
          "linear-gradient(to right, #0b0020, #0b0020) padding-box, linear-gradient(135deg, #5E27CA, #D1BEF6) border-box",
      },
    ],
  ],

  shortcuts: [
    {
      "card-bg-linear":
        "bg-linear-to-r from-[--theme-color] dark:from-[--dark-bg-color] from-90% to-white dark:to-[--dark-bg-color]",
      "switch-animation": "transition duration-300",
      "bg-switch": "bg-[#ffffff] dark:bg-[--dark-bg-color] switch-animation",
      "nav-bg-switch": "bg-[--theme-color] dark:bg-[--dark-nav-bg-color] switch-animation",
      "bg-linear-switch":
        "bg-[--theme-color] dark:bg-[--dark-bg-color] lg:card-bg-linear switch-animation border border-1 border-white dark:border-[--dark-line-color]",
      "line-color-switch": "border-[--line-color] dark:border-[--dark-line-color]",
      "text-base-color-switch":
        "text-[--text-base-color] dark:text-[--dark-text-base-color] switch-animation",
      "text-title-color-switch":
        "text-[--text-title-color] dark:text-[--dark-text-base-color] switch-animation",
      "oneline-text-overflow": "whitespace-nowrap overflow-hidden text-ellipsis",
    },
    [
      /^watermark-(.*)$/,
      ([, c]) =>
        `after:content-[attr(data-watermark)] after:h-18 after:absolute after:z-1 after:opacity-25 after:font-extrabold after:text-6xl after:bg-linear-to-r after:from-[#5E27CB] after:to-[#E7DBFF] after:bg-clip-text after:text-white after:text-stroke-2 after:text-stroke-black after:text-stroke-op-0 dark:after:bg-clip-text dark:after:text-${c} switch-animation`,
    ],
  ],
});
