// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from 'firebase/firestore'
import { db } from '../lib/firebase'

type Game = {
  id: string
  player: string
  date: Date
  level: string
}

type CreatePlayerInput = {
  name : string
  firstname: string
  taille: Int16Array
  poids: Int16Array
  poste: string
  age: Int16Array 
}

const postsRef = collection(db, 'posts')

// --- Fonctions Firestore ---

async function fetchGames(): Promise<Game[]> {
  const q = query(postsRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Game[]
}

async function fetchGame(id: string): Promise<Game> {
  const snap = await getDoc(doc(db, 'games', id))
  if (!snap.exists()) throw new Error('Game introuvable')
  return { id: snap.id, ...snap.data() } as Game
}

async function createGame(data: CreateGameInput): Promise<string> {
  const docRef = await addDoc(postsRef, {
    ...data,
    createdAt: new Date()
  })
  return docRef.id
}

async function updateGame({ id, ...data }: Partial<Game> & { id: string }) {
  await updateDoc(doc(db, 'games', id), {
    ...data,
    updatedAt: new Date()
  })
}

async function removeGame(id: string) {
  await deleteDoc(doc(db, 'games', id))
}

// --- Hooks TanStack Query ---

export function useGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  })
}

export function useGame(id: string) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGame(id),
  })
}

export function useCreateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] })
    },
  })
}

export function useUpdateGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateGame,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['games'] })
      queryClient.invalidateQueries({ queryKey: ['games', variables.id] })
    },
  })
}

export function useDeleteGame() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] })
    },
  })
}