import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useCreatePlayer } from "@/hooks/usePlayer";

export default function CreatePlayerScreen() {
  const createPlayerMutation = useCreatePlayer();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async () => {
    if (!firstName || !lastName) {
      Alert.alert("Erreur", "Nom et prénom obligatoires");
      return;
    }

    try {
      await createPlayerMutation.mutateAsync({
        firstName,
        lastName,
        position,

        age: Number(age) || 0,
        height: Number(height) || 0,
        weight: Number(weight) || 0,
      });

      router.replace("/joueurs");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de créer le joueur");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un joueur</Text>

      <TextInput
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <TextInput
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        placeholder="Poste"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        style={styles.input}
      />

      <TextInput
        placeholder="Taille"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
      />

      <TextInput
        placeholder="Poids"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Créer
        </Text>
      </Pressable>
    </View>

  );
}


const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 16,
  },

   button: {
    backgroundColor: "#00BCD4",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
   buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  
  page: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 12,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  addBtn: {
    backgroundColor: "#d0d0d0",
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  addBtnText: {
    fontSize: 15,
    color: "#222",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "400",
    marginVertical: 16,
    color: "#000",
  },
  list: {
    gap: 14,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  playerBtn: {
    backgroundColor: "#00bcd4",
    borderRadius: 4,
    paddingVertical: 18,
    alignItems: "center",
  },
  playerText: {
    color: "#fff",
    fontSize: 17,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    gap: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    alignItems: "center",
  },
  cancelBtn: {
    fontSize: 15,
    color: "#666",
    padding: 8,
  },
  confirmBtn: {
    backgroundColor: "#00bcd4",
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  confirmBtnText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },
});