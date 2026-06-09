import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

import { Player } from '@/lib/types';

type Props = {
  initialValues?: Partial<Player>;
  onSubmit: (data: Omit<Player, 'id'>) => Promise<void>;
  loading?: boolean;
};

export function PlayerForm({
  initialValues,
  onSubmit,
  loading,
}: Props) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [firstname, setFirstname] = useState(initialValues?.firstname ?? '');
  const [team, setTeam] = useState(initialValues?.team ?? '');
  const [taille, setTaille] = useState(
    initialValues?.taille?.toString() ?? ''
  );
  const [poids, setPoids] = useState(
    initialValues?.poids?.toString() ?? ''
  );
  const [age, setAge] = useState(
    initialValues?.age?.toString() ?? ''
  );
  const [poste, setPoste] = useState(initialValues?.poste ?? '');

  const handleSubmit = async () => {
    if (
      !name ||
      !firstname ||
      !team ||
      !taille ||
      !poids ||
      !age ||
      !poste
    ) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    await onSubmit({
      name,
      firstname,
      team,
      taille: Number(taille),
      poids: Number(poids),
      age: Number(age),
      poste,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Prénom" value={firstname} onChangeText={setFirstname} style={styles.input} />
      <TextInput placeholder="Équipe" value={team} onChangeText={setTeam} style={styles.input} />

      <TextInput
        placeholder="Taille (cm)"
        value={taille}
        onChangeText={setTaille}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Poids (kg)"
        value={poids}
        onChangeText={setPoids}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Âge"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput placeholder="Poste" value={poste} onChangeText={setPoste} style={styles.input} />

      <Button
        title={loading ? 'Chargement...' : 'Valider'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
  },
});