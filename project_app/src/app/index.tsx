import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Basket Stats
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Suivi des statistiques de match
        </ThemedText>
        <ThemedView style={styles.menuContainer}>
          <Pressable style={styles.menuButton} onPress={() => router.push("/nouveau_match")}
          >
            <ThemedText style={styles.menuText}>
              Nouveau match
            </ThemedText>
          </Pressable>
          <Pressable style={styles.menuButton}  onPress={() => router.push("/historique_match")}
          >
            <ThemedText style={styles.menuText}>
              Historique matchs
            </ThemedText>
          </Pressable>
          <Pressable  style={styles.menuButton}  onPress={() => router.push("/joueurs")}
          >
            <ThemedText style={styles.menuText}>
              Joueurs
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 34,
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 40,
    fontSize: 16,
  },

  menuContainer: {
    gap: 16,
  },

  menuButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 4,
  },

  menuText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  version: {
    textAlign: "center",
    marginTop: 40,
    opacity: 0.5,
    fontSize: 14,
  },
});