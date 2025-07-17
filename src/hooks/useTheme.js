import { ref } from "vue";
const theme = ref("light");
export function useTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
  function setTheme(value) {
    theme.value = value;
    localStorage.setItem("theme", value);
  }
  return [theme, setTheme];
}
