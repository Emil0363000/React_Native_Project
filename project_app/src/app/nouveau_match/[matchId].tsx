import * as Device from 'expo-device';
import { StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';


function StatButton({ label }: { label: string }) {
  return (
    <Pressable style={styles.statBtn}>
      <Text style={styles.statText}>{label}</Text>
    </Pressable>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ThemedView style={styles.section}>
      <ThemedText style={styles.sectionTitle}>
        {title}
      </ThemedText>

      <ThemedView style={styles.grid}>
        {children}
      </ThemedView>
    </ThemedView>
  );
}

export default function Game() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <ThemedText type="title" style={styles.title}>
          Match en cours
        </ThemedText>

        <Pressable
          style={styles.backBtn}
          onPress={() => router.push('/')}
        >
          <Text style={styles.backText}>← Retour</Text>
        </Pressable>

        {/* CONTENT */}
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >

          {/* SHOOTING */}
          <Section title="Tir">
            <StatButton label="2 pts marqué" />
            <StatButton label="2 pts raté " />
            <StatButton label="3 pts marqué" />
            <StatButton label="3 pts raté" />
            <StatButton label="LF marqué" />
            <StatButton label="LF raté" />
          </Section>

          {/* REBONDS */}
          <Section title="Rebonds">
            <StatButton label="Offensif" />
            <StatButton label="Défensif" />
          </Section>

          {/* DEFENSE */}
          <Section title="Défense">
            <StatButton label="Interception" />
            <StatButton label="Contre" />
          </Section>

          {/* ERREURS */}
          <Section title="Erreurs">
            <StatButton label="Balle perdue" />
            <StatButton label="Faute commise" />
            <StatButton label="Faute subie" />
          </Section>

          {/* OTHERS */}
          <Section title="Autres">
            <StatButton label="Passe D" />
            <StatButton label="Minutes" />
          </Section>

          {/* FIN MATCH */}
          <Pressable style={styles.endMatchBtn}>
            <Text style={styles.endMatchText}>Fin de match</Text>
          </Pressable>

        </ScrollView>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
  },

  title: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  backText: {
    color: '#00BCE2',
    fontSize: 16,
  },

  scroll: {
    paddingHorizontal: 16,
    paddingBottom: BottomTabInset + 40,
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#f6f5f5f0',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  statBtn: {
    backgroundColor: '#00BCE2',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: '47%',
    alignItems: 'center',
  },

  statText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },

  endMatchBtn: {
    marginTop: 20,
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  endMatchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});