import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { usePlayer, useUpdatePlayer } from "@/hooks/usePlayer";
import { POSITIONS } from "@/constants/player";
import { Picker } from "@react-native-picker/picker";

export default function EditPlayerScreen() {
  const { id } = useLocalSearchParams();
  const { data: player, isLoading } = usePlayer(id as string);
  const updateMutation = useUpdatePlayer();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState(POSITIONS[0]);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!player) return;
    setFirstName(player.firstName);
    setLastName(player.lastName);
    setPosition(player.position);
    setAge(player.age.toString());
    setHeight(player.height.toString());
    setWeight(player.weight.toString());
  }, [player]);

  async function handleSave() {
    try {
      await updateMutation.mutateAsync({
        id: id as string,
        firstName,
        lastName,
        position,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
});
      router.replace("/joueurs");
    } catch {
      Alert.alert(
        "Erreur",
        "Impossible de modifier le joueur"
      );
    }
  }
  if (isLoading) {
    return <ActivityIndicator />;
  }
 return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Modifier le joueur
      </Text>
      <Text>Prénom</Text>
      <TextInput value={firstName} onChangeText={setFirstName} placeholder="Prénom"style={styles.input}/>

      <Text>Nom</Text>
      <TextInput value={lastName} onChangeText={setLastName}placeholder="Nom"style={styles.input}/>

      <Text>Poste</Text>
      <Picker selectedValue={position} onValueChange={setPosition}>
        {POSITIONS.map((p) => (
          <Picker.Item
            key={p}
            label={p}
            value={p}
          />
        ))}
      </Picker>

      <Text>Age</Text>
      <TextInput value={age}onChangeText={setAge}keyboardType="numeric"placeholder="Age"style={styles.input}/>

      <Text>Taille en cm</Text>
      <TextInput value={height} onChangeText={setHeight}keyboardType="numeric"placeholder="Taille en cm" style={styles.input}/>

      <Text>Poids en kg</Text>
      <TextInput value={weight} onChangeText={setWeight} keyboardType="numeric"placeholder="Poids en kg"style={styles.input}/>

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          Sauvegarder
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