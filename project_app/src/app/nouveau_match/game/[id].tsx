import { useState } from "react";
import { StyleSheet, ScrollView, Pressable, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth } from "@/constants/theme";
import { useUpdateGame } from "@/hooks/useGame";

export default function GameScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [stats, setStats] = useState({
    twoPtMade: 0,
    twoPtMissed: 0,
    threePtMade: 0,
    threePtMissed: 0,
    ftMade: 0,
    ftMissed: 0,
    offRebounds: 0,
    defRebounds: 0,
    assists: 0,
    steals: 0,
    blocks: 0,
    turnovers: 0,
    foulsCommitted: 0,
    foulsDrawn: 0,
  });
  const [teamScore,setTeamScore] = useState("");
  const [opponentScore,setOpponentScore]= useState("");
  const updateGameMutation = useUpdateGame();
  async function handleEndGame() {
  try {
    await updateGameMutation.mutateAsync({
      id: id as string,
      data: {
        stats,
        teamScore: Number(teamScore),
        opponentScore: Number(opponentScore),
        isFinished:true,
      },
    });
    router.replace("/historique_match");
  } catch (error) {
    console.log(error);
  }
}
  function increment(key: keyof typeof stats) {
    setStats((prev) => ({
      ...prev,
      [key]: prev[key] + 1,
    }));
  }
  function decrement(key: keyof typeof stats) {
    setStats((prev) => ({
      ...prev,
      [key]: Math.max(prev[key] - 1, 0),
    }));
  }
  const totalPoints = stats.twoPtMade * 2 +stats.threePtMade * 3 +stats.ftMade;
  const rebounds = stats.offRebounds + stats.defRebounds;
  const StatButton = ({label,value,onAdd,onRemove,}: 
    {label: string;
    value: number;
    onAdd: () => void;
    onRemove: () => void;
  }) => {
    return (
      <ThemedView style={styles.statBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        <ThemedView style={styles.btnRow}>
          <Pressable onPress={onRemove}style={styles.minusBtn}>
            <Text>-</Text>
          </Pressable>
          <Pressable onPress={onAdd}style={styles.plusBtn}>
            <Text>+</Text>
          </Pressable>
        </ThemedView>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Match en cours
        </ThemedText>
        <Pressable style={styles.backBtn} onPress={() => router.replace("/nouveau_match")}
        >
          <Text style={styles.backText}> Retour</Text>
        </Pressable>

        <ThemedView style={styles.summary}>
          <Text style={[styles.summaryText, { color: "#fff" }]}>
            Points : {totalPoints}
          </Text>
          <Text style={[styles.summaryText, { color: "#fff" }]}>
            Rebonds : {rebounds}
          </Text>
          <Text style={[styles.summaryText, { color: "#fff" }]}>
            Passes : {stats.assists}
          </Text>
        </ThemedView>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Section title="Tir">
            <StatButton label="2 pts marqué"value={stats.twoPtMade}
              onAdd={() =>increment("twoPtMade")} onRemove={() => decrement("twoPtMade")}/>
            <StatButton label="2 pts raté" value={stats.twoPtMissed}
              onAdd={() =>increment("twoPtMissed")} onRemove={() =>decrement("twoPtMissed")}/>
            <StatButton label="3 pts marqué" value={stats.threePtMade}
              onAdd={() => increment("threePtMade")} onRemove={() =>decrement("threePtMade")}/>
            <StatButton label="3 pts raté" value={stats.threePtMissed}
              onAdd={() =>increment("threePtMissed")} onRemove={() => decrement("threePtMissed")}/>
            <StatButton label="LF marqué" value={stats.ftMade}
              onAdd={() =>increment("ftMade")} onRemove={() =>decrement("ftMade")}/>
            <StatButton label="LF raté" value={stats.ftMissed}
              onAdd={() =>increment("ftMissed")}onRemove={() =>decrement("ftMissed")}/>
          </Section>

          <Section title="Rebonds">
            <StatButton label="Offensif" value={stats.offRebounds}
              onAdd={() =>increment("offRebounds")}onRemove={() =>decrement("offRebounds")}/>
            <StatButton label="Défensif" value={stats.defRebounds}
              onAdd={() =>increment("defRebounds")}onRemove={() =>decrement("defRebounds")}/>
          </Section>

          <Section title="Défense">
            <StatButton label="Interception" value={stats.steals}
              onAdd={() => increment("steals")} onRemove={() =>decrement("steals")}/>
            <StatButton label="Contre" value={stats.blocks}
              onAdd={() =>increment("blocks")}onRemove={() =>decrement("blocks")}/>
          </Section>

          <Section title="Autres">
            <StatButton label="Passe D" value={stats.assists}
              onAdd={() =>increment("assists")}onRemove={() =>decrement("assists")}/>
            <StatButton label="Faute provoquée" value={stats.foulsDrawn}
              onAdd={() =>increment("foulsDrawn")}onRemove={() =>decrement("foulsDrawn")}/>
          </Section>

          <Section title="Erreurs">
            <StatButton label="Balle perdue" value={stats.turnovers}
              onAdd={() => increment("turnovers")} onRemove={() =>decrement("turnovers")}/>
            <StatButton label="Faute commise" value={stats.foulsCommitted}
              onAdd={() =>increment("foulsCommitted")}onRemove={() =>decrement("foulsCommitted")}/>
          </Section>

          <TextInput style={styles.scoreInput} placeholder="Score équipe" keyboardType="numeric" value={teamScore} onChangeText={setTeamScore}/>
          <TextInput style={styles.scoreInput} placeholder="Score adversaire"  keyboardType="numeric" value={opponentScore} onChangeText={setOpponentScore}/>
          
          
          <Pressable style={styles.endBtn} onPress={handleEndGame}>
            <Text style={styles.endText}>
              Fin de match
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ThemedView style={styles.section}>
      <ThemedText style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <ThemedView style={styles.grid}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  input: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  marginTop: 20,
  color: "#ffffff"
},
scoreInput: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  marginTop: 12,
  fontSize: 16,
  color: "#000", 
  backgroundColor: "#fff", 
},

  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    width: "100%",
  },

  title: {
    textAlign: "center",
    marginVertical: 10,
  },

  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  backText: {
    color: "#00BCE2",
  },

  summary: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#00BCE2", 
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
},
  summaryText: {
    fontSize: 16,
    fontWeight: "600",
  
  },

  scroll: {
    paddingHorizontal: 16,
    paddingBottom: BottomTabInset + 40,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  statBox: {
    backgroundColor: "#00BCE2",
    padding: 10,
    borderRadius: 10,
    minWidth: "47%",
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  statLabel: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },

  btnRow: {
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  marginTop: 10,
},

  plusBtn: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  minusBtn: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  endBtn: {
    marginTop: 20,
    backgroundColor: "#ff3b30",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  endText: {
    color: "#fff",
    fontWeight: "700",
  },
});