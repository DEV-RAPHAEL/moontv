import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge, PosterArtwork, PosterCard, SectionHeader, SkeletonBlock } from '../../components/StreamingUI';
import { EmptyState, ErrorState } from '../../components/States';
import {
  fetchProgrammes,
  fetchSchedule,
  getSiteOrigin,
  getStreamUrl,
  portableTextToPlainText,
} from '../../lib/api';
import { getScheduleNow } from '../../lib/schedule-now';
import { colors, radius, spacing } from '../../lib/theme';
import { WEEK_DAYS, type Programme } from '../../lib/types';
import { useRequest } from '../../lib/useRequest';

const loadData = async () => {
  const [programmes, schedule] = await Promise.all([fetchProgrammes(), fetchSchedule()]);
  return { programmes, schedule };
};

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export default function ProgrammeScreen() {
  const params = useLocalSearchParams<{ slug: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const request = useCallback(loadData, []);
  const { data, error, loading, refreshing, refresh, retry } = useRequest(request);
  const [expanded, setExpanded] = useState(false);
  const programme = data?.programmes.find((item) => item.slug === slug) ?? null;
  const streamUrl = getStreamUrl();
  const scheduleNow = useMemo(
    () => data ? getScheduleNow(data.schedule) : null,
    [data],
  );
  const programmeAirings = data
    ? WEEK_DAYS.flatMap((day) => {
        const slots = day === data.schedule.day
          ? data.schedule.slots
          : data.schedule.week?.[day] ?? [];
        return slots
          .filter((slot) => slot.slug === slug)
          .map((slot) => ({ day, slot }));
      })
    : [];
  const isLive = Boolean(scheduleNow?.currentSlot?.slug === slug);
  const nextAiring = programmeAirings.find((airing) =>
    airing.day === data?.schedule.day && airing.slot.slug === scheduleNow?.nextSlot?.slug,
  ) ?? programmeAirings.find((airing) => !airing.slot.isNowPlaying) ?? programmeAirings[0];
  const related = data?.programmes
    .filter((item) => item.category === programme?.category && item.slug !== slug)
    .slice(0, 10) ?? [];
  const description = programme ? portableTextToPlainText(programme.description) : '';
  const synopsis = programme?.synopsis ?? '';
  const shareUrl = `${getSiteOrigin() ?? 'https://moontvonline.com'}/program/${slug ?? ''}`;

  const shareProgramme = async () => {
    if (!programme) return;
    try {
      await Share.share({
        title: programme.title,
        message: `${programme.title} on Moon TV\n${shareUrl}`,
        url: shareUrl,
      });
    } catch (cause) {
      Alert.alert('Could not share programme', cause instanceof Error ? cause.message : 'Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.safeArea}>
        <SkeletonBlock style={{ width: '100%', height: height * 0.5, borderRadius: 0 }} />
        <View style={styles.loadingContent}>
          <SkeletonBlock style={{ width: '65%', height: 34 }} />
          <SkeletonBlock style={{ width: '100%', height: 100 }} />
          <SkeletonBlock style={{ width: '55%', height: 26 }} />
        </View>
      </View>
    );
  }
  if (error || !data) {
    return (
      <View style={styles.state}>
        <ErrorState message={error ?? 'Programme details are unavailable.'} onRetry={retry} />
      </View>
    );
  }
  if (!programme) {
    return (
      <View style={styles.state}>
        <EmptyState message="That programme could not be found." />
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: streamUrl ? 112 + insets.bottom : insets.bottom + spacing.xl }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.accentGold} />}
      >
        <View style={[styles.backdrop, { height: height * 0.52 }]}>
          <PosterArtwork
            title={programme.title}
            uri={programme.image}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={['rgba(5,11,7,0.2)', 'rgba(5,11,7,0.25)', colors.bgPrimary]}
            locations={[0, 0.55, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={[styles.floatingActions, { top: insets.top + spacing.sm }]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              style={styles.circleButton}
            >
              <Ionicons name="arrow-back" size={21} color={colors.textPrimary} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Share programme"
              onPress={() => void shareProgramme()}
              style={styles.circleButton}
            >
              <Ionicons name="share-outline" size={20} color={colors.textPrimary} />
            </Pressable>
          </View>
          <View style={styles.backdropTitle}>
            <Badge label={isLive ? 'LIVE NOW' : programme.isFeatured ? 'FEATURED' : programme.category} tone={isLive ? 'live' : 'accent'} />
            <Text style={styles.title} numberOfLines={2}>{programme.title}</Text>
            <Text style={styles.metaLine}>
              {programme.category}
              {nextAiring ? ` · Airs ${nextAiring.day}, ${nextAiring.slot.time}` : ''}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.statusRow}>
            <View style={styles.pills}>
              <View style={styles.pill}><Text style={styles.pillText}>{programme.category.toLowerCase()}</Text></View>
              {programme.isFeatured ? <View style={styles.pill}><Text style={styles.pillText}>featured</Text></View> : null}
            </View>
            {isLive ? (
              <Badge label="LIVE NOW" tone="live" />
            ) : nextAiring ? (
              <Badge label={`Next: ${nextAiring.day} ${nextAiring.slot.time}`} tone="muted" />
            ) : null}
          </View>

          {synopsis ? (
            <View style={styles.section}>
              <SectionHeader title="Synopsis" />
              <Text style={styles.synopsis} numberOfLines={expanded ? undefined : 3}>{synopsis}</Text>
              {synopsis.length > 150 ? (
                <Pressable onPress={() => setExpanded((value) => !value)} style={styles.readMore}>
                  <Text style={styles.readMoreText}>{expanded ? 'Read less' : 'Read more'}</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}

          {programme.notableCast.length ? (
            <View style={styles.section}>
              <SectionHeader title="Hosts" />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hosts}>
                {programme.notableCast.map((name) => (
                  <View key={name} style={styles.hostCard}>
                    <View style={styles.avatar}><Text style={styles.avatarText}>{initials(name)}</Text></View>
                    <Text style={styles.hostName} numberOfLines={1}>{name}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}

          {programmeAirings.length ? (
            <View style={styles.section}>
              <SectionHeader title="When it airs" />
              {programmeAirings.map(({ day, slot }) => (
                <View key={`${day}-${slot.time}-${slot.slug}`} style={styles.airing}>
                  <Ionicons name="time-outline" size={18} color={colors.accentGold} />
                  <Text style={styles.airingDay}>{day}</Text>
                  <Text style={styles.airingTime}>{slot.time}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {description ? (
            <View style={styles.section}>
              <SectionHeader title="About the programme" />
              <Text style={styles.description}>{description}</Text>
            </View>
          ) : null}
        </View>

        {related.length ? (
          <View style={styles.related}>
            <SectionHeader title="More like this" />
            <FlatList
              horizontal
              data={related}
              keyExtractor={(item) => item.slug}
              renderItem={({ item }) => (
                <PosterCard
                  width={width * 0.34}
                  title={item.title}
                  image={item.image}
                  compact
                  onPress={() => router.replace({ pathname: '/programme/[slug]', params: { slug: item.slug } })}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rail}
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={3}
            />
          </View>
        ) : null}
      </ScrollView>

      {streamUrl ? (
        <View style={[styles.sticky, { paddingBottom: insets.bottom + spacing.sm }]}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/watch')}
            style={({ pressed }) => [styles.watchButton, pressed && styles.pressed]}
          >
            <Ionicons name="play" size={18} color={colors.bgPrimary} />
            <Text style={styles.watchLabel}>Watch Live</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  state: { flex: 1, backgroundColor: colors.bgPrimary },
  loadingContent: { padding: spacing.md, gap: spacing.md },
  backdrop: { width: '100%', justifyContent: 'flex-end', backgroundColor: colors.bgTertiary },
  floatingActions: { position: 'absolute', left: spacing.md, right: spacing.md, flexDirection: 'row', justifyContent: 'space-between' },
  circleButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(5,11,7,0.72)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  backdropTitle: { paddingHorizontal: spacing.md, paddingBottom: spacing.lg, gap: spacing.sm },
  title: { color: colors.textPrimary, fontSize: 26, lineHeight: 32, fontWeight: '800' },
  metaLine: { color: '#d3dbd4', fontSize: 12 },
  content: { gap: spacing.xl, paddingTop: spacing.sm },
  statusRow: { minHeight: 44, marginHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  pill: { minHeight: 32, justifyContent: 'center', paddingHorizontal: spacing.md, borderRadius: 999, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  pillText: { color: colors.textSecondary, fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  section: { gap: spacing.sm },
  synopsis: { paddingHorizontal: spacing.md, color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
  readMore: { alignSelf: 'flex-start', marginLeft: spacing.md, minHeight: 44, justifyContent: 'center' },
  readMoreText: { color: colors.accentGold, fontSize: 13, fontWeight: '700' },
  hosts: { paddingHorizontal: spacing.md, gap: spacing.sm },
  hostCard: { width: 104, minHeight: 132, alignItems: 'center', justifyContent: 'center', gap: spacing.xs, padding: spacing.sm, borderRadius: radius.lg, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: colors.bgTertiary, borderWidth: 1, borderColor: colors.buttonGreenHover },
  avatarText: { color: colors.accentGold, fontSize: 15, fontWeight: '800' },
  hostName: { width: '100%', color: colors.textPrimary, fontSize: 12, fontWeight: '600', textAlign: 'center' },
  airing: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginHorizontal: spacing.md, paddingHorizontal: spacing.md, borderRadius: radius.md, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  airingDay: { flex: 1, color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  airingTime: { color: colors.textSecondary, fontSize: 12 },
  description: { paddingHorizontal: spacing.md, color: colors.textSecondary, fontSize: 14, lineHeight: 23 },
  related: { gap: spacing.sm, marginTop: spacing.xl },
  rail: { paddingHorizontal: spacing.md, gap: spacing.md },
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.md, paddingTop: spacing.md, backgroundColor: colors.bgSecondary, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  watchButton: { minHeight: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: radius.md, backgroundColor: colors.accentGold },
  watchLabel: { color: colors.bgPrimary, fontSize: 15, fontWeight: '800' },
  pressed: { opacity: 0.8 },
});
