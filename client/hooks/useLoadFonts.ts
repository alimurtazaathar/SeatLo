import { useFonts } from "expo-font";

export default function useLoadFonts() {
  const [fontsLoaded] = useFonts({
    "Vercetti": require("../assets/fonts/Vercetti-Regular.ttf"),
  });

  return fontsLoaded;
}
