import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge, CategoryPill, PosterArtwork, SkeletonBlock } from '../../components/StreamingUI';
import { fetchSchedule, nigeriaToday } from '../../lib/api';
import { getScheduleNow, getSlotWindow } from '../../lib/schedule-now';
import { colors, radius, spacing } from '../../lib/theme';
import { WEEK_DAYS, type ScheduleResponse, type ScheduleSlot, type WeekDay } from '../../lib/types';
import { useRequest } from '../../lib/useRequest';

const loadSchedule = () => fetchSchedule();

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const { data, error, loading, refreshing, refresh, retry } = useRequest(loadSchedule);
  const today = data?.day && WEEK_DAYS.includes(data.day as WeekDay) ? data.day as WeekDay : nigeriaToday();
  const [selectedDay, setSelectedDay] = useState<WeekDay>(today);
  const listRef = useRef<FlatList<ScheduleSlot>>(null);
  const autoScrolled = useRef(false);

  useEffect(() => setSelectedDay(today), [today]);
  useEffect(() => {
    autoScrolled.current = false;
  }, [selectedDay, data?.slots]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.skeleton}>
          <SkeletonBlock style={{ width: '60%', height: 34 }} />
          <SkeletonBlock style={{ width: '100%', height: 44 }} />
          {[0, 1, 2, 3].map((item) => <SkeletonBlock key={item} style={{ height: 104 }} />)}
        </View>
      </SafeAreaView>
    );
  }
  if (error || !data) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.error}>
          <Text style={styles.heading}>Schedule unavailable</Text>
          <Text style={styles.muted}>{error ?? 'No schedule data is available.'}</Text>
          <Pressable onPress={retry} style={styles.retry}><Text style={styles.retryText}>Try again</Text></Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const slots = selectedDay === data.day
    ? data.slots
    : data.week?.[selectedDay] ?? [];
  const current = getScheduleNow(data);
  const currentIndex = selectedDay === data.day
    ? slots.findIndex((slot) => slot === current.currentSlot || (slot.slug && slot.slug === current.currentSlot?.slug))
    : -1;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        ref={listRef}
        data={slots}
        keyExtractor={(slot, index) => `${slot.time}-${slot.slug ?? slot.title}-${index}`}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.lg }]}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.accentGold} />}
        onContentSizeChange={() => {
          if (currentIndex >= 0 && !autoScrolled.current) {
            autoScrolled.current = true;
            requestAnimationFrame(() => listRef.current?.scrollToIndex({
              index: currentIndex,
              animated: false,
              viewPosition: 0.25,
            }));
          }
        }}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          listRef.current?.scrollToOffset({ offset: averageItemLength * index, animated: false });
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>MOON TV · PROGRAMME GUIDE</Text>
            <Text style={styles.heading}>What’s on air</Text>
            <Text style={styles.caption}>Your week in stories, culture and entertainment.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.days}>
              {WEEK_DAYS.map((day) => (
                <View key={day} style={styles.dayWrap}>
                  <CategoryPill
                    label={day.slice(0, 3)}
                    selected={day === selectedDay}
                    onPress={() => setSelectedDay(day)}
                  />
                  {day === today ? <View style={styles.todayDot} /> : null}
                </View>
              ))}
            </ScrollView>
            <View style={styles.dayHeading}>
              <Text style={styles.selectedDay}>{selectedDay}{selectedDay === today ? ' · Today' : ''}</Text>
              {selectedDay === data.day ? <Text style={styles.wat}>{data.nigeriaTime} WAT</Text> : null}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              {selectedDay === data.day ? 'No programmes remaining today' : 'No schedule available for this day'}
            </Text>
            <Text style={styles.muted}>
              {selectedDay === data.day ? 'Check back for the next broadcast.' : 'The published guide currently includes today’s schedule only.'}
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <TimelineRow
            slot={item}
            current={selectedDay === data.day && (index === currentIndex || item.isNowPlaying === true)}
          />
        )}
      />
    </SafeAreaView>
  );
}

function TimelineRow({ slot, current }: { slot: ScheduleSlot; current: boolean }) {
  const window = getSlotWindow(slot);
  const start = slot.time.split(/\s*[-–—]\s*/)[0] ?? '';
  const duration = window ? window.end - window.start : 0;
  const end = window && duration > 0 ? `${Math.floor((window.end % 1440) / 60) % 12 || 12}:${String(window.end % 60).padStart(2, '0')}` : '';
  const posterStyle = { width: 68, height: 90, borderRadius: radius.md };
  const content = (
    <>
      <View style={styles.timeColumn}>
        <Text style={[styles.startTime, current && styles.currentText]}>{start}</Text>
        {end ? <Text style={styles.endTime}>{end}</Text> : null}
      </View>
      <View style={styles.timeline}>
        <View style={[styles.timelineDot, current && styles.timelineDotCurrent]} />
        <View style={styles.timelineLine} />
      </View>
      <View style={[styles.card, current && styles.cardCurrent]}>
        <PosterArtwork title={slot.title} uri={slot.image} style={posterStyle} />
        <View style={styles.cardCopy}>
          <View style={styles.meta}>
            <Text style={[styles.cardTime, current && styles.currentText]} numberOfLines={1}>{slot.time}</Text>
            {current || slot.isLive ? <Badge label="LIVE" tone="live" /> : null}
          </View>
          <Text style={styles.programmeTitle} numberOfLines={2}>{slot.title}</Text>
          <Text style={styles.category} numberOfLines={1}>{slot.category}</Text>
          {slot.notes ? <Text style={styles.notes} numberOfLines={1}>{slot.notes}</Text> : null}
        </View>
      </View>
    </>
  );

  return slot.slug ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${slot.title}, ${slot.time}`}
      onPress={() => router.push({ pathname: '/programme/[slug]', params: { slug: slot.slug! } })}
      style={({ pressed }) => [styles.timelineRow, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  ) : (
    <View style={styles.timelineRow}>{content}</View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  list: { paddingHorizontal: spacing.md, paddingTop: spacing.md, gap: spacing.sm },
  header: { gap: spacing.xs, paddingBottom: spacing.md },
  eyebrow: { color: colors.buttonGreenHover, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  heading: { color: colors.textPrimary, fontSize: 30, lineHeight: 36, fontWeight: '800' },
  caption: { color: colors.textSecondary, fontSize: 14, lineHeight: 20 },
  days: { gap: spacing.sm, paddingTop: spacing.md, paddingRight: spacing.md },
  dayWrap: { position: 'relative' },
  todayDot: { position: 'absolute', top: 5, right: 7, width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accentGold },
  dayHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  selectedDay: { color: colors.textPrimary, fontSize: 18, fontWeight: '700' },
  wat: { color: colors.textSecondary, fontSize: 12 },
  timelineRow: { minHeight: 112, flexDirection: 'row', alignItems: 'stretch', gap: spacing.sm },
  timeColumn: { width: 54, alignItems: 'flex-end', paddingTop: spacing.md },
  startTime: { color: colors.textPrimary, fontSize: 11, fontWeight: '700', textAlign: 'right' },
  endTime: { color: colors.textSecondary, fontSize: 10, marginTop: spacing.xs },
  currentText: { color: colors.accentGold },
  timeline: { width: 14, alignItems: 'center' },
  timelineDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.textSecondary, marginTop: spacing.lg, zIndex: 1 },
  timelineDotCurrent: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.accentGold, borderWidth: 2, borderColor: colors.bgPrimary },
  timelineLine: { position: 'absolute', top: spacing.lg, bottom: -spacing.md, width: 1, backgroundColor: colors.border },
  card: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, padding: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, backgroundColor: colors.bgSecondary },
  cardCurrent: { borderColor: colors.accentGold, backgroundColor: colors.bgTertiary },
  cardCopy: { flex: 1, gap: spacing.xs },
  meta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.xs },
  cardTime: { color: colors.textSecondary, fontSize: 10, fontWeight: '600', flexShrink: 1 },
  programmeTitle: { color: colors.textPrimary, fontSize: 14, lineHeight: 18, fontWeight: '700' },
  category: { color: colors.textSecondary, fontSize: 11 },
  notes: { color: colors.textSecondary, fontSize: 10 },
  rowSeparator: { height: spacing.sm },
  empty: { alignItems: 'center', padding: spacing.xl, gap: spacing.sm },
  emptyTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  muted: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  skeleton: { flex: 1, padding: spacing.md, gap: spacing.md },
  error: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl, gap: spacing.md },
  retry: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg, borderRadius: radius.md, backgroundColor: colors.buttonGreen },
  retryText: { color: colors.textPrimary, fontWeight: '700' },
  pressed: { opacity: 0.78 },
});
