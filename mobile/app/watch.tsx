import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge, SectionHeader } from '../components/StreamingUI';
import { EmptyState, ErrorState } from '../components/States';
import { SkeletonBlock } from '../components/StreamingUI';
import { fetchSchedule, getStreamUrl } from '../lib/api';
import { getScheduleNow } from '../lib/schedule-now';
import { colors, radius, spacing } from '../lib/theme';
import { useRequest } from '../lib/useRequest';

const loadSchedule = () => fetchSchedule();

export default function WatchScreen() {
  const streamUrl = getStreamUrl();
  const { data, error, loading, retry } = useRequest(loadSchedule);
  const current = useMemo(() => data ? getScheduleNow(data) : null, [data]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Close player" onPress={() => router.back()} style={styles.close}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Moon TV Live</Text>
        <Badge label="ON AIR" tone="live" />
      </View>
      {streamUrl ? (
        <WebView
          source={{ uri: streamUrl }}
          style={styles.player}
          allowsFullscreenVideo
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
        />
      ) : (
        <View style={styles.playerEmpty}>
          <View style={styles.playCircle}>
            <Ionicons name="play" size={28} color={colors.accentGold} />
          </View>
          <Text style={styles.emptyTitle}>Stream coming soon</Text>
          <Text style={styles.emptyText}>Moon TV Live will be available here once streaming is configured.</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.details}>
        {loading ? <SkeletonBlock style={{ height: 72, marginHorizontal: spacing.md }} /> : null}
        {error ? <ErrorState message={error} onRetry={retry} /> : null}
        {data && !error ? (
          <>
            <SectionHeader title="On now" />
            {current?.currentSlot ? (
              <View style={styles.programmeCard}>
                <Text style={styles.programmeTitle}>{current.currentSlot.title}</Text>
                <Text style={styles.muted}>{current.currentSlot.time} · {current.currentSlot.category}</Text>
              </View>
            ) : <EmptyState message="No programme is on air right now." />}
            {current?.nextSlot ? (
              <>
                <SectionHeader title="Up next" />
                <View style={styles.programmeCard}>
                  <Text style={styles.programmeTitle}>{current.nextSlot.title}</Text>
                  <Text style={styles.muted}>{current.nextSlot.time} · {current.nextSlot.category}</Text>
                </View>
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  header: { minHeight: 54, flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, gap: spacing.sm },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.bgSecondary },
  headerTitle: { flex: 1, color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
  player: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' },
  playerEmpty: { width: '100%', aspectRatio: 16 / 9, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, backgroundColor: colors.bgSecondary },
  playCircle: { width: 62, height: 62, alignItems: 'center', justifyContent: 'center', borderRadius: 31, borderWidth: 1, borderColor: colors.accentGold, marginBottom: spacing.md },
  emptyTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', textAlign: 'center' },
  emptyText: { maxWidth: 280, color: colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: spacing.xs },
  details: { paddingVertical: spacing.lg, gap: spacing.sm },
  programmeCard: { marginHorizontal: spacing.md, padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.bgSecondary, gap: spacing.xs },
  programmeTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '700' },
  muted: { color: colors.textSecondary, fontSize: 13 },
});
