import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
 
type Equipe = {
  id: number;
  nom: string;
  matchs: number;
  victoires: number;
  defaites: number;
  nuls: number;
  total_saison: number;
};
 
const mockEquipes: Equipe[] = [
  {
    id: 1,
    nom: "Equipe de Bauvais",
    matchs: 35,
    victoires: 27,
    defaites: 5,
    nuls: 3,
    total_saison: 43,
  },
  {
    id: 2,
    nom: "Equipe de Paris",
    matchs: 30,
    victoires: 20,
    defaites: 8,
    nuls: 2,
    total_saison: 43,
  },
];
 
export default function StatsEquipe() {
  const [selected, setSelected] = useState<Equipe>(mockEquipes[0]);
 
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Consultation stats{"\n"}équipes</Text>
 
      <View style={styles.equipeList}>
        {mockEquipes.map((equipe) => (
          <TouchableOpacity
            key={equipe.id}
            style={[
              styles.equipeBtn,
              selected.id === equipe.id && styles.equipeBtnActive,
            ]}
            onPress={() => setSelected(equipe)}
          >
            <Text
              style={[
                styles.equipeBtnText,
                selected.id === equipe.id && styles.equipeBtnTextActive,
              ]}
            >
              {equipe.nom}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
 
      <View style={styles.statsBlock}>
        <StatRow label="Nb matchs" value={selected.matchs} />
        <StatRow label="Victoire" value={selected.victoires} />
        <StatRow label="Défaite" value={selected.defaites} />
        <StatRow label="Match nul" value={selected.nuls} />
        <StatRow
          label="Matchs restants"
          value={selected.total_saison - selected.matchs}
        />
      </View>
    </ScrollView>
  );
}
 
function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statText}>
        {label} : {value}
      </Text>
    </View>
  );
}
 
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    textAlign: "center",
    color: "#000",
    marginBottom: 28,
    lineHeight: 30,
  },
  equipeList: {
    width: "100%",
    gap: 12,
    marginBottom: 36,
  },
  equipeBtn: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    paddingVertical: 22,
    alignItems: "center",
  },
  equipeBtnActive: {
    backgroundColor: "#00bcd4",
  },
  equipeBtnText: {
    fontSize: 17,
    color: "#333",
    textAlign: "center",
  },
  equipeBtnTextActive: {
    color: "#fff",
  },
  statsBlock: {
    width: "100%",
    gap: 14,
    paddingLeft: 8,
  },
  statRow: {
    paddingVertical: 2,
  },
  statText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "400",
  },
});