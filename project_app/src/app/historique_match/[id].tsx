import {View, Text, StyleSheet, ActivityIndicator, ScrollView,} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGame } from "@/hooks/useGame";
import { usePlayer } from "@/hooks/usePlayer";

export default function MatchDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: game, isLoading } = useGame(id as string);
  const { data: player } = usePlayer(game?.playerId ?? "");
  if (isLoading || !game) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const points = game.stats.twoPtMade * 2 + game.stats.threePtMade * 3 + game.stats.ftMade;
  const rebounds = game.stats.offRebounds + game.stats.defRebounds;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 40,}}>
      <Text style={styles.title}>
        {player?.firstName}{" "}
        {player?.lastName}
      </Text>
      <Text style={styles.subtitle}>
        {game.team} vs {game.opponentTeam}
      </Text>
      <Text style={styles.score}>
        Score final : {game.finalScore}
      </Text>

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <Text style={styles.big}>
            {points}
          </Text>
          <Text>PTS</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.big}>
            {rebounds}
          </Text>
          <Text>REB</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.big}>
            {game.stats.assists}
          </Text>
          <Text>AST</Text>
        </View>
      </View>

      <Text style={styles.section}>Tir</Text>
      <StatRow label="2 pts marqués"value={game.stats.twoPtMade}/>
      <StatRow label="2 pts ratés" value={game.stats.twoPtMissed}/>
      <StatRow label="3 pts marqués"value={game.stats.threePtMade}/>
      <StatRow label="3 pts ratés"value={game.stats.threePtMissed}/>
      <StatRow label="LF marqués" value={game.stats.ftMade}/>
      <StatRow label="LF ratés"value={game.stats.ftMissed}/>

      <Text style={styles.section}>Rebonds</Text>
      <StatRow label="Offensifs"value={game.stats.offRebounds}/>
      <StatRow label="Défensifs"value={game.stats.defRebounds}/>

      <Text style={styles.section}>Autres</Text>
      <StatRow label="Passes" value={game.stats.assists} />
      <StatRow label="Interceptions"value={game.stats.steals}/>
      <StatRow label="Contres" value={game.stats.blocks}/>
      <StatRow label="Pertes de balle" value={game.stats.turnovers}/>
      <StatRow label="Fautes commises" value={game.stats.foulsCommitted}/>
      <StatRow label="Fautes provoquées" value={game.stats.foulsDrawn}/>
    </ScrollView>
  );
}

function StatRow({label,value,}: {
  label: string;
  value: number;
}) {
  return (
    <View style={styles.row}>
      <Text>{label}</Text>
      <Text>{value}</Text>
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
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginTop: 6,
  },

  score: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },

  summaryCard: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#00BCD4",
    minWidth: 90,
  },

  big: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  section: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});