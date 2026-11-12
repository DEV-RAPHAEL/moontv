import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../lib/theme';
import { useFavorites } from '../lib/FavoritesContext';

export default function AccountScreen() {
  const { favorites } = useFavorites();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.page}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.back, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back" size={21} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.profileIcon}>
          <Ionicons name="person-outline" size={38} color={colors.accentGold} />
        </View>
        <Text style={styles.eyebrow}>YOUR MOON TV</Text>
        <Text style={styles.title}>Make it yours.</Text>
        <Text style={styles.description}>
          Create an account to keep your favourites synced across devices. Sign-in will be powered by Supabase.
        </Text>

        <View style={styles.accountCard}>
          <View style={styles.cardIcon}>
            <Ionicons name="cloud-upload-outline" size={21} color={colors.accentGold} />
          </View>
          <View style={styles.cardCopy}>
            <Text style={styles.cardTitle}>Your Moon TV account</Text>
            <Text style={styles.cardBody}>
              Account sign-in and cloud-synced favourites are coming soon. Your saved favourites stay on this device for now.
            </Text>
          </View>
        </View>

        <View style={styles.localStatus}>
          <Ionicons name="phone-portrait-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.localStatusText}>
            {favorites.length
              ? `${favorites.length} favourite${favorites.length === 1 ? '' : 's'} saved on this device for now.`
              : 'You can save favourites on this device for now.'}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: true }}
          disabled
          style={styles.signInButton}
        >
          <Ionicons name="lock-closed-outline" size={17} color={colors.textSecondary} />
          <Text style={styles.signInLabel}>Sign in to sync favourites · Coming soon</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  page: { flex: 1, padding: spacing.lg, paddingTop: spacing.md },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  profileIcon: { width: 82, height: 82, marginTop: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 41, backgroundColor: colors.bgTertiary, borderWidth: 1, borderColor: colors.border },
  eyebrow: { marginTop: spacing.xl, color: colors.accentGold, fontSize: 10, fontWeight: '800', letterSpacing: 1.8 },
  title: { marginTop: spacing.sm, color: colors.textPrimary, fontSize: 30, lineHeight: 36, fontWeight: '800' },
  description: { marginTop: spacing.sm, color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
  accountCard: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, padding: spacing.md, borderRadius: radius.lg, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  cardIcon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 21, backgroundColor: colors.bgTertiary },
  cardCopy: { flex: 1, gap: spacing.xs },
  cardTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  cardBody: { color: colors.textSecondary, fontSize: 12, lineHeight: 19 },
  localStatus: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg },
  localStatusText: { flex: 1, color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
  signInButton: { minHeight: 54, marginTop: 'auto', marginBottom: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: radius.md, backgroundColor: colors.accentGold, borderWidth: 1, borderColor: colors.accentGold },
  signInLabel: { color: colors.bgPrimary, fontSize: 14, fontWeight: '800' },
  pressed: { opacity: 0.75 },
});
