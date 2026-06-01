// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy
} from 'firebase/firestore'
import { db } from '../lib/firebase'

type Player = {
  id: string
  name : string
  firstname: string
  taille: Int16Array
  poids: Int16Array
  poste: string
  age: Int16Array 
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

async function fetchPlayers(): Promise<Player[]> {
  const q = query(postsRef, orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Player[]
}

async function fetchPlayer(id: string): Promise<Player> {
  const snap = await getDoc(doc(db, 'posts', id))
  if (!snap.exists()) throw new Error('Player introuvable')
  return { id: snap.id, ...snap.data() } as Player
}

async function createPlayer(data: CreatePlayerInput): Promise<string> {
  const docRef = await addDoc(postsRef, {
    ...data,
    createdAt: new Date()
  })
  return docRef.id
}

async function updatePlayer({ id, ...data }: Partial<Player> & { id: string }) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: new Date()
  })
}

async function removePlayer(id: string) {
  await deleteDoc(doc(db, 'posts', id))
}

// --- Hooks TanStack Query ---

export function usePlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: fetchPlayers,
  })
}

export function usePlayer(id: string) {
  return useQuery({
    queryKey: ['player', id],
    queryFn: () => fetchPlayer(id),
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player'] })
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePlayer,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['players'] })
      queryClient.invalidateQueries({ queryKey: ['players', variables.id] })
    },
  })
}

export function useDeletePlayer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] })
    },
  })
}