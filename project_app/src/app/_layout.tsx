import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1D3461" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "App_stats" }} />
        <Stack.Screen name="history" options={{ title: " Historique" }} />
        <Stack.Screen name="[id]" options={{ title: " Détail" }} />
      </Stack>
    </QueryClientProvider>
  );
}