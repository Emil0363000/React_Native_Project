import {View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator,} from "react-native";
import { router } from "expo-router";
import { useGames } from "@/hooks/useGame";
import { usePlayers } from "@/hooks/usePlayer";

export default function HistoryScreen() {
  const { data: games, isLoading } = useGames();
  const { data: players } = usePlayers();
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Historique des matchs
      </Text>
      <FlatList
        data={games?.filter((game)=>game.isFinished)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const player =
            players?.find(
              (p) =>
                p.id === item.playerId
            );
          return (
            <View style={styles.card}>
              <Text style={styles.player}>
                {player?.firstName}{" "}
                {player?.lastName}
              </Text>
              <Text style={styles.text}>
                vs {item.opponentTeam}
              </Text>
              <Text style={styles.score}>
                {item.finalScore}
              </Text>
              <Pressable style={styles.button} onPress={() =>router.push(`/historique_match/${item.id}`)}>
                <Text style={styles.buttonText}>
                  Consulter
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  player: {
    fontSize: 18,
    fontWeight: "700",
  },

  text: {
    fontSize: 15,
    marginTop: 4,
  },

  score: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },

  button: {
    marginTop: 12,
    backgroundColor: "#00BCD4",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});