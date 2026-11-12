import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../lib/theme';

export default function SplashPreviewScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={['#10251a', colors.bgPrimary, '#030704']} locations={[0, 0.56, 1]} style={StyleSheet.absoluteFill} />
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} style={styles.back}>
        <Ionicons name="arrow-back" size={21} color={colors.textPrimary} />
      </Pressable>
      <View style={styles.halo} />
      <View style={styles.content}>
        <Image source={require('../assets/icon.png')} style={styles.logo} contentFit="contain" />
        <Text style={styles.brand}>MOON TV</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>Stories that unite a nation.</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.track}><View style={styles.progress} /></View>
        <Text style={styles.footerText}>CULTURE · CONNECTION · STORY</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: colors.bgPrimary },
  back: { position: 'absolute', top: spacing.sm, left: spacing.md, zIndex: 2, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(8,23,12,0.8)' },
  halo: { position: 'absolute', width: 340, height: 340, top: '25%', borderRadius: 170, borderWidth: 1, borderColor: 'rgba(216,182,66,0.12)', backgroundColor: 'rgba(216,182,66,0.025)' },
  content: { alignItems: 'center', marginTop: -spacing.xl },
  logo: { width: 156, height: 156, borderRadius: 78 },
  brand: { marginTop: spacing.lg, color: colors.textPrimary, fontSize: 24, fontWeight: '900', letterSpacing: 4 },
  divider: { width: 38, height: 2, marginTop: spacing.md, backgroundColor: colors.accentGold },
  tagline: { marginTop: spacing.md, color: colors.textSecondary, fontSize: 14, letterSpacing: 0.35 },
  footer: { position: 'absolute', left: 52, right: 52, bottom: 56, alignItems: 'center', gap: spacing.md },
  track: { width: 92, height: 2, borderRadius: 1, overflow: 'hidden', backgroundColor: colors.border },
  progress: { width: '62%', height: '100%', backgroundColor: colors.accentGold },
  footerText: { color: '#668071', fontSize: 9, fontWeight: '700', letterSpacing: 1.7 },
});
