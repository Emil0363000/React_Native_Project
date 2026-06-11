import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getGames,getGame,getGamesByPlayer,createGame,updateGame,deleteGame } from '../../lib/games.service'
import { Game } from '../../types/game'

export function useGames() {
  return useQuery({
    queryKey: ['games'],
    queryFn: getGames,
  })
}

export function useGame(id: string) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => getGame(id),
  })
}

export function useGamesByPlayer(playerId:string){
  return useQuery({
    queryKey:['games-player',playerId],
    queryFn: () =>getGamesByPlayer(playerId),
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
    mutationFn: ({id,data,}: {
      id: string
      data: Partial<Game>
    }) => updateGame(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['games'],
      })
    },
  })
}

export function useDeleteGame() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] })
    },
  })
}