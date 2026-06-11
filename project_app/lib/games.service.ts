import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, updateDoc,} from "firebase/firestore";
import { db } from "./firebase";
import { Game } from "../types/game";

const gamesCollection = collection(db, "games");

export const getGames = async (): Promise<Game[]> => {
  const snapshot = await getDocs(gamesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Game[];
};

export const getGame = async (id: string): Promise<Game | null> => {
  const snapshot = await getDoc(doc(db,"games",id));
  if (!snapshot.exists()) {
    return null;
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Game;
};

export const getGamesByPlayer = async (playerId: string): Promise<Game[]> => {
  const snapshot = await getDocs(query(gamesCollection,where("playerId", "==", playerId)));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Game[];
};

export const createGame = async (game: Omit<Game, "id">) => {
  return await addDoc(gamesCollection, game);
};

export const updateGame = async (id: string,game: Partial<Game>) => {
  await updateDoc(doc(db,"games",id), game);
};

export const deleteGame = async (id: string) => {
  await deleteDoc(doc(db,"games",id));
};
