import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState, ErrorState } from '../../components/States';
import { PosterCard, SectionHeader, SkeletonBlock } from '../../components/StreamingUI';
import { fetchProgrammes } from '../../lib/api';
import { colors, spacing } from '../../lib/theme';
import { useFavorites } from '../../lib/FavoritesContext';
import type { Programme } from '../../lib/types';
import { useRequest } from '../../lib/useRequest';

const loadProgrammes = () => fetchProgrammes();

export default function ProgrammesScreen() {
  const params = useLocalSearchParams<{ search?: string | string[] }>();
  const routeSearch = Array.isArray(params.search) ? params.search[0] : params.search;
  const { width } = useWindowDimensions();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data, error, loading, refreshing, refresh, retry } = useRequest(loadProgrammes);
  const [searchOpen, setSearchOpen] = useState(Boolean(routeSearch));
  const [search, setSearch] = useState(routeSearch ?? '');
  useEffect(() => {
    if (routeSearch === undefined) return;
    setSearch(routeSearch);
    setSearchOpen(true);
  }, [routeSearch]);
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (data ?? []).filter((item) => item.title.toLocaleLowerCase().includes(query));
  }, [data, search]);
  const categories = [...filtered.reduce((counts, item) => {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    return counts;
  }, new Map<string, number>())]
    .sort(([categoryA, countA], [categoryB, countB]) =>
      countB - countA || categoryA.localeCompare(categoryB),
    )
    .map(([category]) => category);
  const posterWidth = width * 0.62;

  if (loading) return <ProgrammesSkeleton />;
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ErrorState message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.accentGold} />}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>Programmes</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={searchOpen ? 'Close search' : 'Search programmes'}
            onPress={() => {
              setSearchOpen((open) => !open);
              setSearch('');
            }}
            style={styles.searchButton}
          >
            <Ionicons name={searchOpen ? 'close' : 'search'} size={21} color={colors.textPrimary} />
          </Pressable>
        </View>
        {searchOpen ? (
          <TextInput
            autoFocus
            value={search}
            onChangeText={setSearch}
            placeholder="Search programmes"
            placeholderTextColor={colors.textSecondary}
            returnKeyType="search"
            style={styles.searchInput}
          />
        ) : null}
        {categories.length ? categories.map((category) => {
          const items = filtered.filter((item) => item.category === category);
          return (
            <View key={category} style={styles.section}>
              <SectionHeader
                title={category}
                onSeeAll={() => router.push({ pathname: '/programmes/[category]', params: { category } })}
              />
              <FlatList
                horizontal
                data={items}
                keyExtractor={(programme) => programme.slug}
                renderItem={({ item: programme }) => (
                  <PosterCard
                    width={posterWidth}
                    title={programme.title}
                    image={programme.image}
                    host={programme.notableCast[0]}
                    compact
                    isFavorite={isFavorite(programme.slug)}
                    onToggleFavorite={() => toggleFavorite(programme.slug)}
                    onPress={() => router.push({ pathname: '/programme/[slug]', params: { slug: programme.slug } })}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.rail}
                initialNumToRender={4}
                maxToRenderPerBatch={4}
                windowSize={3}
              />
            </View>
          );
        }) : <EmptyState message={search ? 'No programmes match your search.' : 'No programmes available yet.'} />}
      </ScrollView>
    </SafeAreaView>
  );
}

function ProgrammesSkeleton() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <SkeletonBlock style={{ height: 56 }} />
        {[0, 1, 2].map((section) => (
          <View key={section} style={styles.skeletonSection}>
            <SkeletonBlock style={{ height: 28, width: '52%' }} />
            <View style={styles.rail}>
              {[0, 1, 2].map((card) => <SkeletonBlock key={card} style={{ width: 220, height: 220 * 9 / 16 }} />)}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  content: { paddingTop: spacing.md, paddingBottom: spacing.xl, gap: 24 },
  header: { minHeight: 60, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heading: { color: colors.textPrimary, fontSize: 30, lineHeight: 36, fontWeight: '800', marginTop: 3 },
  searchButton: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  searchInput: { height: 48, marginHorizontal: spacing.md, paddingHorizontal: spacing.md, borderRadius: 12, color: colors.textPrimary, backgroundColor: colors.bgSecondary, borderWidth: 1, borderColor: colors.border },
  section: { gap: spacing.sm },
  rail: { paddingHorizontal: spacing.md, gap: spacing.md },
  skeletonSection: { gap: spacing.md },
});
