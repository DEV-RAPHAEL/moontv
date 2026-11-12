import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Switch, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, ErrorState } from '../components/States';
import { PosterCard, SkeletonBlock } from '../components/StreamingUI';
import { fetchProgrammes } from '../lib/api';
import { sendTestFavoriteShowNotification } from '../lib/favorite-show-notifications';
import { useFavorites } from '../lib/FavoritesContext';
import { colors, spacing } from '../lib/theme';
import { useRequest } from '../lib/useRequest';

const loadProgrammes = () => fetchProgrammes();

export default function FavoritesScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {
    favorites,
    isFavorite,
    toggleFavorite,
    ready,
    storageError,
    notificationsEnabled,
    setNotificationsEnabled,
  } = useFavorites();
  const { data, error, loading, refreshing, refresh, retry } = useRequest(loadProgrammes);
  const savedProgrammes = useMemo(
    () => (data ?? []).filter((programme) => favorites.includes(programme.slug)),
    [data, favorites],
  );
  const cardWidth = (width - spacing.md * 2 - spacing.sm) / 2;

  if (loading || !ready) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.skeleton}>
          <SkeletonBlock style={{ width: '55%', height: 36 }} />
          <View style={styles.row}>
            {[0, 1, 2].map((item) => (
              <SkeletonBlock key={item} style={{ width: cardWidth, height: cardWidth * 9 / 16 }} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      {error ? (
        <View style={styles.center}>
          <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>‹</Text></Pressable>
          <ErrorState message={error} onRetry={retry} />
        </View>
      ) : (
        <FlatList
          data={savedProgrammes}
          numColumns={2}
          keyExtractor={(item) => item.slug}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + spacing.xl }]}
          refreshing={refreshing}
          onRefresh={refresh}
          ListHeaderComponent={
            <View style={styles.header}>
              <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
                <Text style={styles.backText}>‹</Text>
              </Pressable>
              <Text style={styles.eyebrow}>YOUR COLLECTION</Text>
              <Text style={styles.heading}>Favourites</Text>
              <View style={styles.remindersCard}>
                <View style={styles.remindersIcon}>
                  <Ionicons name="notifications-outline" size={20} color={colors.accentGold} />
                </View>
                <View style={styles.remindersCopy}>
                  <Text style={styles.remindersTitle}>Show reminders</Text>
                  <Text style={styles.remindersBody}>Get alerts 30 minutes before and when a favourite starts.</Text>
                </View>
                <Switch
                  accessibilityLabel="Favourite show reminders"
                  value={notificationsEnabled}
                  onValueChange={(enabled) => {
                    void setNotificationsEnabled(enabled).catch((cause: unknown) => {
                      Alert.alert(
                        'Reminders are unavailable',
                        cause instanceof Error ? cause.message : 'Please try again.',
                      );
                    });
                  }}
                  trackColor={{ false: colors.border, true: colors.buttonGreenHover }}
                  thumbColor={notificationsEnabled ? colors.accentGold : colors.textSecondary}
                />
              </View>
              {notificationsEnabled ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={() => {
                    void sendTestFavoriteShowNotification().catch((cause: unknown) => {
                      Alert.alert(
                        'Could not send test reminder',
                        cause instanceof Error ? cause.message : 'Please try again.',
                      );
                    });
                  }}
                  style={({ pressed }) => [styles.testReminder, pressed && styles.testReminderPressed]}
                >
                  <Text style={styles.testReminderText}>Send test reminder</Text>
                </Pressable>
              ) : null}
              {storageError ? <Text style={styles.errorText}>Couldn’t save changes: {storageError}</Text> : null}
            </View>
          }
          ListEmptyComponent={<EmptyState message="Your saved programmes will appear here." />}
          renderItem={({ item }) => (
            <PosterCard
              width={cardWidth}
              title={item.title}
              image={item.image}
              compact
              isFavorite={isFavorite(item.slug)}
              onToggleFavorite={() => toggleFavorite(item.slug)}
              onPress={() => router.push({ pathname: '/programme/[slug]', params: { slug: item.slug } })}
            />
          )}
          initialNumToRender={9}
          maxToRenderPerBatch={9}
          windowSize={5}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  grid: { paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: spacing.md },
  row: { gap: spacing.sm },
  header: { gap: spacing.xs, marginBottom: spacing.md },
  back: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.bgSecondary },
  backText: { color: colors.textPrimary, fontSize: 30, lineHeight: 34 },
  eyebrow: { color: colors.buttonGreenHover, fontSize: 10, fontWeight: '700', letterSpacing: 1.4 },
  heading: { color: colors.textPrimary, fontSize: 28, fontWeight: '800' },
  errorText: { color: '#e8a7a7', fontSize: 12 },
  remindersCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, padding: spacing.md, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgSecondary },
  remindersIcon: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: colors.bgTertiary },
  remindersCopy: { flex: 1, gap: 3 },
  remindersTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '700' },
  remindersBody: { color: colors.textSecondary, fontSize: 11, lineHeight: 16 },
  testReminder: { minHeight: 40, alignSelf: 'flex-start', justifyContent: 'center', paddingHorizontal: spacing.sm },
  testReminderText: { color: colors.accentGold, fontSize: 12, fontWeight: '700' },
  testReminderPressed: { opacity: 0.7 },
  skeleton: { flex: 1, padding: spacing.md, gap: spacing.lg },
  center: { flex: 1, padding: spacing.md, gap: spacing.md },
});
