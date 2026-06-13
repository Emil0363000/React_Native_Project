import {View, Text, StyleSheet, FlatList, ActivityIndicator,} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { usePlayer } from "@/hooks/usePlayer";
import { useGamesByPlayer } from "@/hooks/useGame";

export default function PlayerStatsScreen() {
  const { id } = useLocalSearchParams();
  const { data: player } = usePlayer(id as string);
  const {data: games,isLoading,} = useGamesByPlayer(id as string);
  if (isLoading) {
    return <ActivityIndicator />;
  }
  const finishedGames = games?.filter((g) => g.finalScore) ?? [];
  const gamesCount = finishedGames.length;
  const totalPoints =finishedGames.reduce(
      (acc, game) =>
        acc +
        game.stats.twoPtMade * 2 +
        game.stats.threePtMade * 3 +
        game.stats.ftMade,
      0
    );
  const totalRebounds =finishedGames.reduce(
      (acc, game) =>
        acc +
        game.stats.offRebounds +
        game.stats.defRebounds,
      0
    );
  const totalAssists =finishedGames.reduce(
      (acc, game) =>
        acc + game.stats.assists,
      0
    );
  const avgPoints =
    gamesCount > 0
      ? (
          totalPoints /
          gamesCount
        ).toFixed(1)
      : "0";
  const avgRebounds =
    gamesCount > 0
      ? (
          totalRebounds /
          gamesCount
        ).toFixed(1)
      : "0";
  const avgAssists =
    gamesCount > 0
      ? (
          totalAssists /
          gamesCount
        ).toFixed(1)
      : "0";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {player?.firstName}{" "}
        {player?.lastName}
      </Text>
      <View style={styles.summary}>
        <View style={styles.card}>
          <Text style={styles.big}>
            {gamesCount}
          </Text>
          <Text>Matchs</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.big}>
            {avgPoints}
          </Text>
          <Text>PTS</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.big}>
            {avgRebounds}
          </Text>
          <Text>REB</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.big}>
            {avgAssists}
          </Text>
          <Text>AST</Text>
        </View>
      </View>
      <Text style={styles.section}>
        Historique
      </Text>
      <FlatList
        data={finishedGames}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({ item }) => {
          const pts =item.stats.twoPtMade * 2 +item.stats.threePtMade * 3 + item.stats.ftMade;
          const reb = item.stats.offRebounds + item.stats.defRebounds;
          return (
            <View style={styles.gameCard}>
              <Text>
                vs {item.opponentTeam}
              </Text>
              <Text>
                {pts} pts • {reb} reb •{" "}
                {item.stats.assists} ast
              </Text>
              <Text>
                {item.finalScore}
              </Text>
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

  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  summary: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  card: {
    width: "23%",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#00BCD4",
    alignItems: "center",
  },

  big: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  gameCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
});