import { router } from 'expo-router';
import { useMemo, useState } from 'react';
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
import { EmptyState } from '../../components/States';
import { PosterCard, SectionHeader, SkeletonBlock } from '../../components/StreamingUI';
import { fetchProgrammes } from '../../lib/api';
import { colors, spacing } from '../../lib/theme';
import type { Programme } from '../../lib/types';
import { useRequest } from '../../lib/useRequest';

const loadProgrammes = () => fetchProgrammes();

export default function ProgrammesScreen() {
  const { width } = useWindowDimensions();
  const { data, error, loading, refreshing, refresh, retry } = useRequest(loadProgrammes);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return (data ?? []).filter((item) => item.title.toLocaleLowerCase().includes(query));
  }, [data, search]);
  const categories = [...new Set(filtered.map((item) => item.category).filter(Boolean))].sort();
  const posterWidth = width * 0.34;

  if (loading) return <ProgrammesSkeleton />;
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>Couldn’t load programmes</Text>
          <Text style={styles.muted}>{error}</Text>
          <Pressable onPress={retry} style={styles.retry}><Text style={styles.retryText}>Try again</Text></Pressable>
        </View>
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
              {[0, 1, 2].map((card) => <SkeletonBlock key={card} style={{ width: 120, height: 225 }} />)}
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  errorTitle: { color: colors.textPrimary, fontSize: 20, fontWeight: '700' },
  muted: { color: colors.textSecondary, textAlign: 'center' },
  retry: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg, borderRadius: 12, backgroundColor: colors.buttonGreen },
  retryText: { color: colors.textPrimary, fontWeight: '700' },
});
