import { router } from 'expo-router';
import { memo, useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  Badge,
  CategoryPill,
  PosterCard,
  PosterArtwork,
  SectionHeader,
  SkeletonBlock,
  WideCard,
} from '../../components/StreamingUI';
import { fetchProgrammes, fetchSchedule, resolveImageUrl } from '../../lib/api';
import { getScheduleNow } from '../../lib/schedule-now';
import { colors, radius, spacing } from '../../lib/theme';
import type { Programme, ScheduleSlot } from '../../lib/types';
import { useRequest } from '../../lib/useRequest';

const loadHome = async () => {
  const [programmes, schedule] = await Promise.all([fetchProgrammes(), fetchSchedule()]);
  return { programmes, schedule };
};

const AnimatedProgrammeList = Animated.createAnimatedComponent(FlatList<Programme>);

export default function HomeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const { data, error, loading, refreshing, refresh, retry } = useRequest(loadHome);
  const [category, setCategory] = useState('All');
  const openProgramme = useCallback((slug: string) => {
    router.push({ pathname: '/programme/[slug]', params: { slug } });
  }, []);

  if (loading) return <HomeSkeleton />;
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.error}>
          <Text style={styles.errorTitle}>Couldn’t load Moon TV</Text>
          <Text style={styles.muted}>{error}</Text>
          <Pressable onPress={retry} style={styles.retry}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const programmes = data?.programmes ?? [];
  const schedule = data?.schedule;
  const current = schedule ? getScheduleNow(schedule) : null;
  const categories = [...new Set(programmes.map((item) => item.category).filter(Boolean))].sort();
  const categoryProgrammes = category === 'All'
    ? programmes
    : programmes.filter((programme) => programme.category === category);
  const latest = [...categoryProgrammes].sort((a, b) => b.id - a.id).slice(0, 12);
  const featured = programmes.filter((programme) => programme.isFeatured);
  const hasPoster = (programme: Programme) =>
    Boolean(programme.image) && !programme.image.endsWith('hero_bg.jpg');
  const carouselItems = (featured.length ? featured : programmes.filter(hasPoster))
    .slice(0, 6);
  const nowAndNext = [current?.currentSlot, current?.nextSlot]
    .filter((slot): slot is ScheduleSlot => Boolean(slot));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={[styles.page, { paddingBottom: spacing.xl }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.accentGold}
          />
        }
      >
        <View style={[styles.header, styles.headerInset]}>
          <View style={styles.brandLockup}>
            <Image
              source={{ uri: resolveImageUrl('/logo.png') }}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.brand}>MOON TV</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Watch live"
            onPress={() => router.push('/watch')}
            style={({ pressed }) => [styles.livePill, pressed && styles.pressed]}
          >
            <View style={styles.liveDot} />
            <Text style={styles.liveLabel}>LIVE</Text>
          </Pressable>
        </View>

        {carouselItems.length ? (
          <FeaturedCarousel
            programmes={carouselItems}
            screenWidth={screenWidth}
            onPress={openProgramme}
          />
        ) : null}

        {nowAndNext.length ? (
          <View style={styles.section}>
            <SectionHeader title="On Now & Up Next" onSeeAll={() => router.push('/(tabs)/schedule')} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.liveRail}
            >
              {nowAndNext.map((slot, index) => (
                <MemoizedLiveCard
                  key={`${slot.time}-${slot.slug ?? slot.title}`}
                  slot={slot}
                  current={slot === current?.currentSlot}
                  progress={index === 0 ? current?.progress ?? 0 : 0}
                  width={Math.min(screenWidth * 0.74, 320)}
                  onPress={slot.slug ? () => openProgramme(slot.slug!) : undefined}
                />
              ))}
            </ScrollView>
          </View>
        ) : null}

        {categories.length ? (
          <View style={styles.section}>
            <SectionHeader
              title="Categories"
              onSeeAll={() => router.push('/(tabs)/programmes')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryRail}
            >
              <CategoryPill label="All" selected={category === 'All'} onPress={() => setCategory('All')} />
              {categories.map((item) => (
                <CategoryPill
                  key={item}
                  label={item}
                  selected={category === item}
                  onPress={() => setCategory(item)}
                />
              ))}
            </ScrollView>
          </View>
        ) : null}

        {categoryProgrammes.length ? (
          <View style={styles.section}>
            <SectionHeader title="Latest Programmes" />
            <FlatList
              horizontal
              data={latest}
              keyExtractor={(programme) => programme.slug}
              renderItem={({ item: programme }) => (
                <PosterCard
                  width={screenWidth * 0.34}
                  title={programme.title}
                  image={programme.image}
                  compact
                  onPress={() => openProgramme(programme.slug)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.posterRail}
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={3}
            />
          </View>
        ) : null}

        {featured.length ? (
          <View style={styles.section}>
            <SectionHeader title="Trending / Featured" />
            <FlatList
              horizontal
              data={featured}
              keyExtractor={(programme) => programme.slug}
              renderItem={({ item: programme }) => (
                <WideCard
                  width={screenWidth * 0.72}
                  title={programme.title}
                  image={programme.image}
                  subtitle={programme.category}
                  onPress={() => openProgramme(programme.slug)}
                />
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.posterRail}
              initialNumToRender={3}
              maxToRenderPerBatch={3}
              windowSize={3}
            />
          </View>
        ) : null}

        {schedule?.slots.length ? (
          <View style={styles.section}>
            <SectionHeader
              title="Today’s Schedule"
              onSeeAll={() => router.push('/(tabs)/schedule')}
            />
            <View style={styles.scheduleList}>
              {schedule.slots.slice(0, 4).map((slot) => (
                <MemoizedCompactScheduleRow
                  key={`${slot.time}-${slot.slug ?? slot.title}`}
                  slot={slot}
                  onPress={slot.slug ? () => openProgramme(slot.slug!) : undefined}
                />
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeSkeleton() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={[styles.page, styles.skeletonPage]}>
        <SkeletonBlock style={{ height: 48, width: '100%' }} />
        <SkeletonBlock style={{ height: 390, width: '100%', borderRadius: 20 }} />
        <SkeletonBlock style={{ height: 24, width: '55%' }} />
        <View style={styles.posterRail}>
          {[0, 1, 2].map((item) => (
            <SkeletonBlock key={item} style={{ width: 120, height: 190 }} />
          ))}
        </View>
        <SkeletonBlock style={{ height: 24, width: '45%' }} />
        <View style={styles.posterRail}>
          {[0, 1].map((item) => (
            <SkeletonBlock key={item} style={{ width: 260, height: 146 }} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FeaturedCarousel({
  programmes,
  screenWidth,
  onPress,
}: {
  programmes: Programme[];
  screenWidth: number;
  onPress: (slug: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const scrollX = useSharedValue(0);
  const cardWidth = Math.min(screenWidth * 0.58, 280);
  const gap = spacing.md;
  const interval = cardWidth + gap;
  const sidePadding = (screenWidth - cardWidth) / 2;
  const [activeIndex, setActiveIndex] = useState(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const onMomentumEnd = useCallback((event: { nativeEvent: { contentOffset: { x: number } } }) => {
    setActiveIndex(Math.max(0, Math.min(programmes.length - 1, Math.round(event.nativeEvent.contentOffset.x / interval))));
  }, [interval, programmes.length]);
  const renderItem = useCallback(({ item, index }: { item: Programme; index: number }) => (
    <CarouselItem
      item={item}
      index={index}
      width={cardWidth}
      interval={interval}
      scrollX={scrollX}
      reducedMotion={reducedMotion}
      onPress={() => onPress(item.slug)}
    />
  ), [cardWidth, interval, onPress, reducedMotion, scrollX]);

  return (
    <View style={styles.carousel}>
      <AnimatedProgrammeList
        horizontal
        data={programmes}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumEnd}
        scrollEventThrottle={16}
        snapToInterval={interval}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: sidePadding }}
        getItemLayout={(_, index) => ({ length: interval, offset: interval * index, index })}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        windowSize={3}
      />
      {programmes.length > 1 ? (
        <View style={styles.dots}>
          {programmes.map((item, index) => (
            <View key={item.slug} style={[styles.dot, index === activeIndex && styles.dotActive]} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function CarouselItem({
  item,
  index,
  width,
  interval,
  scrollX,
  reducedMotion,
  onPress,
}: {
  item: Programme;
  index: number;
  width: number;
  interval: number;
  scrollX: SharedValue<number>;
  reducedMotion: boolean;
  onPress: () => void;
}) {
  const style = useAnimatedStyle(() => {
    if (reducedMotion) return { transform: [{ scale: 1 }], opacity: 1 };
    const distance = Math.abs(scrollX.value / interval - index);
    return {
      transform: [{ scale: interpolate(distance, [0, 1], [1, 0.86], Extrapolation.CLAMP) }],
      opacity: interpolate(distance, [0, 1], [1, 0.55], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated.View style={[style, { width, marginRight: spacing.md }]}>
      <PosterCard
        width={width}
        title={item.title}
        image={item.image}
        category={item.category}
        onPress={onPress}
      />
    </Animated.View>
  );
}

function LiveCard({
  slot,
  current,
  progress,
  width,
  onPress,
}: {
  slot: ScheduleSlot;
  current: boolean;
  progress: number;
  width: number;
  onPress?: () => void;
}) {
  const card = (
    <View style={[styles.liveCard, { width }]}>
      <PosterArtwork title={slot.title} uri={slot.image} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['rgba(5,11,7,0.12)', 'rgba(5,11,7,0.94)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.liveCardContent}>
        <Badge label={current ? 'LIVE NOW' : 'UP NEXT'} tone={current ? 'live' : 'muted'} />
        <View>
          <Text style={styles.liveCardTime}>{slot.time}</Text>
          <Text style={styles.liveCardTitle} numberOfLines={1}>{slot.title}</Text>
          <Text style={styles.liveCardCategory} numberOfLines={1}>{slot.category}</Text>
        </View>
      </View>
      {current ? (
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      ) : null}
    </View>
  );
  return onPress ? (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      {card}
    </Pressable>
  ) : card;
}

function CompactScheduleRow({ slot, onPress }: { slot: ScheduleSlot; onPress?: () => void }) {
  const row = (
    <>
      <Text style={styles.compactTime}>{slot.time.split(/\s*[-–—]\s*/)[0]}</Text>
      <View style={styles.compactText}>
        <Text style={styles.compactTitle} numberOfLines={1}>{slot.title}</Text>
        <Text style={styles.compactCategory} numberOfLines={1}>{slot.category}</Text>
      </View>
      {slot.isNowPlaying ? <Badge label="LIVE" tone="live" /> : <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />}
    </>
  );
  return onPress ? (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.compactRow, pressed && styles.pressed]}>
      {row}
    </Pressable>
  ) : (
    <View style={styles.compactRow}>{row}</View>
  );
}

const MemoizedLiveCard = memo(LiveCard);
const MemoizedCompactScheduleRow = memo(CompactScheduleRow);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  page: { paddingTop: spacing.sm, gap: 24 },
  skeletonPage: { paddingHorizontal: spacing.md },
  headerInset: { marginHorizontal: spacing.md },
  pressed: { opacity: 0.78 },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logo: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.bgTertiary },
  brand: { color: colors.textPrimary, fontSize: 16, fontWeight: '800', letterSpacing: 1.1 },
  livePill: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgSecondary,
  },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#dc4d4d' },
  liveLabel: { color: colors.textPrimary, fontSize: 11, fontWeight: '800', letterSpacing: 0.7 },
  carousel: { gap: spacing.md },
  dots: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { width: 20, backgroundColor: colors.accentGold },
  section: { gap: spacing.sm },
  liveRail: { paddingHorizontal: spacing.md, gap: spacing.sm },
  liveCard: { height: 178, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.bgTertiary },
  liveCardContent: { flex: 1, justifyContent: 'space-between', padding: spacing.md },
  liveCardTime: { color: colors.accentGold, fontSize: 11, fontWeight: '700' },
  liveCardTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '700', marginTop: 3 },
  liveCardCategory: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },
  progressTrack: { height: 3, backgroundColor: 'rgba(255,255,255,0.24)' },
  progressFill: { height: 3, backgroundColor: colors.accentGold },
  categoryRail: { paddingHorizontal: spacing.md, gap: spacing.sm },
  posterRail: { paddingHorizontal: spacing.md, gap: spacing.sm },
  scheduleList: { paddingHorizontal: spacing.md, gap: spacing.xs },
  compactRow: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgSecondary,
  },
  compactTime: { width: 62, color: colors.accentGold, fontSize: 12, fontWeight: '700' },
  compactText: { flex: 1, gap: 3 },
  compactTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: '600' },
  compactCategory: { color: colors.textSecondary, fontSize: 11 },
  error: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  errorTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  muted: { color: colors.textSecondary, textAlign: 'center' },
  retry: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg, borderRadius: radius.md, backgroundColor: colors.buttonGreen },
  retryText: { color: colors.textPrimary, fontWeight: '700' },
});
