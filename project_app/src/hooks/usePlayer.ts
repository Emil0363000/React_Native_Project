// hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPlayers,getPlayer, createPlayer,updatePlayer, deletePlayer } from '../../lib/players.service'
import { db } from '../../lib/firebase'



export function usePlayers() {
  return useQuery({
    queryKey: ['players'],
    queryFn: getPlayers,
  })
}

export function usePlayer(id: string) {
  return useQuery({
    queryKey: ['player', id],
    queryFn: () => getPlayer(id),
  })
}

export function useCreatePlayer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['player'] })
    },
  })
}

export function useUpdatePlayer() {
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
    mutationFn: deletePlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] })
    },
  })
}