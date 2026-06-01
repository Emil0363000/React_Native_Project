import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { Button } from "react-native";

type Player = {
  id: number;
  name: string;
};

const mockPlayers: Player[] = [
  { id: 1, name: "Match1" },
  { id: 2, name: "Match2" },
  { id: 3, name: "Match3" },
  { id: 4, name: "Match4" },
  { id: 5, name: "Match4" },
  { id: 6, name: "Match5" },
];

export default function ListeJoueur() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // BDD
    setPlayers(mockPlayers);
  }, []);

  function handleAdd() {
    if (!newName.trim()) return;
    setPlayers((prev) => [
      ...prev,
      { id: prev.length + 1, name: newName.trim() },
    ]);
    setNewName("");
    setShowModal(false);
  }
  const router=useRouter()

  return (
    <View style={styles.page}>
      <View style={styles.topBar}>
        <View style={{ flex: 1 }} />
      </View>
      <Button
              title="Accueil"
              color="#00BCE2"
              onPress={()=>router.push('/')}
          />
      

      <Text style={styles.title}>Consultation des matchs</Text>
      
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playerBtn}>
            <Text style={styles.playerText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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