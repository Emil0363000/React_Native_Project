import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc,} from "firebase/firestore";
import { db } from "./firebase";
import { Player } from "../types/player";

const playersCollection = collection(db, "players");
export type CreatePlayerInput =Omit<Player,'id' |'createdAt'>

export async function getPlayers(): Promise<Player[]> {
  const snapshot = await getDocs(playersCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Player[]
}; 

export async function getPlayer(id: string): Promise<Player> {
  const snapshot = await getDoc(doc(db, 'players', id))
  if (!snapshot.exists()) 
    throw new Error('Player introuvable')
  return { 
    id: snapshot.id, ...snapshot.data() 
  } as Player
}

export async function createPlayer(data: CreatePlayerInput): Promise<string> {
  const docRef = await addDoc(playersCollection, {
    ...data,
    createdAt: new Date()})
  return docRef.id
}

export async function updatePlayer({ id, ...data }: Partial<Player> & { id: string }) {
  await updateDoc(doc(db, 'players', id), {
    ...data,
    updatedAt: new Date()
  })
}

export async function deletePlayer(id: string) {
  await deleteDoc(doc(db, 'players', id))
}
