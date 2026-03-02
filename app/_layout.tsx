import { AppStateProvider } from "@/state/AppState";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppStateProvider>
      <Stack />
    </AppStateProvider>
  );
}