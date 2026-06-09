import { Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PlayerForm } from '@/components/PlayerForm';

import { useCreatePlayer } from '@/hooks/usePlayer';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function Create() {
  const router = useRouter();
  const createPlayer = useCreatePlayer();

  const handleSubmit = async (data: any) => {
    try {
      await createPlayer.mutateAsync(data);

      Alert.alert('Succès', 'Joueur créé');

      router.replace('/joueurs');
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de créer le joueur');
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          maxWidth: MaxContentWidth,
          alignSelf: 'center',
          width: '100%',
          padding: Spacing.four,
          paddingBottom: BottomTabInset,
        }}
      >
        <ThemedText type="title" style={{ textAlign: 'center' }}>
          Création joueur
        </ThemedText>

        <PlayerForm
          onSubmit={handleSubmit}
          loading={createPlayer.isPending}
        />

        <Button title="Retour" onPress={() => router.back()} />
      </SafeAreaView>
    </ThemedView>
  );
}