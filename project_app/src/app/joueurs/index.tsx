import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useDeletePlayer, usePlayers } from "@/hooks/usePlayer";
import { deletePlayer } from "../../../lib/players.service";

export default function PlayersScreen(){
  const {data: players, isLoading} = usePlayers();

  const deleteMutation= useDeletePlayer();

 

  return (
    <View style={styles.page}>
      <Pressable onPress={()=> router.push("/joueurs/create")}>
        <Text>Ajouter un joueur</Text>
      </Pressable>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              padding: 12,
              marginVertical: 8,
            }}
          >
            <Text>
              {item.firstName} {item.lastName}
            </Text>


            <Pressable
              onPress={() =>
                router.push(`/joueurs/stats/${item.id}`)
              }
            >
              <Text>Voir</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                router.push(`/joueurs/edit/${item.id}`)
              }
            >
              <Text>Modifier</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                deleteMutation.mutate(item.id)
              }
            >
              <Text>Supprimer</Text>
            </Pressable>
          </View>
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
