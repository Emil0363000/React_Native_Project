import { useState } from "react";
import {View,Text,TextInput,Pressable,Alert,ScrollView,StyleSheet,} from "react-native";
import { router } from "expo-router";
import { usePlayers } from "@/hooks/usePlayer";
import { useCreateGame } from "@/hooks/useGame";

export default function NewGameScreen() {
  const { data: players, isLoading } = usePlayers();
  const createGameMutation = useCreateGame();
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [team, setTeam] = useState("");
  const [opponentTeam, setOpponentTeam] = useState("");
  const [season, setSeason] = useState("");
  const [level, setLevel] = useState("");

  async function handleCreateGame() {
    if (!selectedPlayerId) {
      Alert.alert("Erreur","sélectionner un joueur");
      return;
    }
    if (!team.trim()) {
      Alert.alert("Erreur","saisir votre équipe");
      return;
    }
    if (!opponentTeam.trim()) {
      Alert.alert("Erreur","saisir l'équipe adverse");
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
          finalScore: "",
          isFinished: false,
          createdAt:
            new Date().toISOString(),
        });

      router.push(
        `/nouveau_match/game/${gameRef.id}`
      );
    } catch (error) {
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Nouveau Match
      </Text>
      <Text style={styles.label}>
        Sélection du joueur
      </Text>
      {players?.map((player) => (
        <Pressable key={player.id} onPress={() =>setSelectedPlayerId(player.id)}
          style={[styles.playerButton,selectedPlayerId === player.id &&styles.playerSelected,]}
        >
          <Text style={styles.playerText}>
            {player.firstName}{" "}
            {player.lastName}
          </Text>
        </Pressable>
      ))}
      <Text>Equipe</Text>
      <TextInput
        placeholder="Equipe"
        value={team}
        onChangeText={setTeam}
        style={styles.input}
      />

      <Text>Equipe adverse</Text>
      <TextInput
        placeholder="Equipe adverse"
        value={opponentTeam}
        onChangeText={setOpponentTeam}
        style={styles.input}
      />
      <Text>Saison</Text>
      <TextInput
        placeholder="Saison"
        value={season}
        onChangeText={setSeason}
        style={styles.input}
      />
      <Text>Niveau</Text>
      <TextInput
        placeholder="Niveau"
        value={level}
        onChangeText={setLevel}
        style={styles.input}
      />
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
    marginBottom: 10,
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
    color: "#000",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
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