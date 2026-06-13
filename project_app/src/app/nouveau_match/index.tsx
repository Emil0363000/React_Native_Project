import { useState } from "react";
import {View,Text,Pressable,Alert,ScrollView,StyleSheet,TextInput} from "react-native";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { usePlayers } from "@/hooks/usePlayer";
import { useCreateGame } from "@/hooks/useGame";
import {LEVELS } from "@/constants/game";
import { SEASONS } from "@/constants/season";

export default function NewGameScreen() {
  const { data: players, isLoading } =usePlayers();
  const createGameMutation =useCreateGame();
  const [selectedPlayerId,setSelectedPlayerId] =useState("");
  const [team, setTeam] =useState("");
  const [opponentTeam,setOpponentTeam] =useState("");
  const [season, setSeason] =useState(SEASONS[0]);
  const [level, setLevel] =useState(LEVELS[0]);

  async function handleCreateGame() {
    if (!selectedPlayerId) {
      Alert.alert(
        "Erreur",
        "Sélectionner un joueur"
      );
      return;
    }

    try {
      const gameRef =
        await createGameMutation.mutateAsync({
          playerId: selectedPlayerId,

          team,
          opponentTeam,

          season,
          level,

          teamScore: 0,
          opponentScore: 0,

          isFinished: false,

          stats: {
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
          },
          createdAt:
            new Date().toISOString(),
        });
      router.push(
        `/nouveau_match/game/${gameRef.id}`
      );
    } catch {
      Alert.alert(
        "Erreur",
        "Impossible de créer le match"
      );
    }
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Nouveau Match
      </Text>

      <Text style={styles.label}>
        Sélection du joueur
      </Text>

      {players?.map((player) => (
        <Pressable
          key={player.id}
          onPress={() =>
            setSelectedPlayerId(
              player.id
            )
          }
          style={[
            styles.playerButton,

            selectedPlayerId ===
              player.id &&
              styles.playerSelected,
          ]}
        >
          <Text style={styles.playerText}>
            {player.firstName}{" "}
            {player.lastName}
          </Text>
        </Pressable>
      ))}

<Text>Equipe</Text> 
<TextInput placeholder="Equipe" value={team} onChangeText={setTeam} style={styles.input} /> 
<Text>Equipe adverse</Text> 
<TextInput placeholder="Equipe adverse" value={opponentTeam} onChangeText={setOpponentTeam} style={styles.input} />

      <Text style={styles.label}>
        Saison
      </Text>

      <Picker
        selectedValue={season}
        onValueChange={setSeason}
      >
        {SEASONS.map((season) => (
          <Picker.Item
            key={season}
            label={season}
            value={season}
          />
        ))}
      </Picker>

      <Text style={styles.label}>
        Niveau
      </Text>

      <Picker
        selectedValue={level}
        onValueChange={setLevel}
      >
        {LEVELS.map((level) => (
          <Picker.Item
            key={level}
            label={level}
            value={level}
          />
        ))}
      </Picker>

      <Pressable
        style={styles.button}
        onPress={handleCreateGame}
        disabled={
          createGameMutation.isPending
        }
      >
        <Text style={styles.buttonText}>
          {createGameMutation.isPending
            ? "Création..."
            : "Lancer le match"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginTop: 12, },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
  },

  playerButton: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  playerSelected: {
    backgroundColor: "#00BCD4",
  },

  playerText: {
    fontSize: 16,
  },

  button: {
    backgroundColor: "#00BCD4",
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});