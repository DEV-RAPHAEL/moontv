import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, ErrorState } from '../../components/States';
import { PosterCard, SkeletonBlock } from '../../components/StreamingUI';
import { fetchProgrammes } from '../../lib/api';
import { colors, spacing } from '../../lib/theme';
import { useFavorites } from '../../lib/FavoritesContext';
import { useRequest } from '../../lib/useRequest';

const loadProgrammes = () => fetchProgrammes();

export default function ProgrammeCategoryScreen() {
  const params = useLocalSearchParams<{ category: string | string[] }>();
  const category = Array.isArray(params.category) ? params.category[0] : params.category;
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data, error, loading, refreshing, refresh, retry } = useRequest(loadProgrammes);
  const programmes = useMemo(
    () => (data ?? []).filter((item) => item.category === category),
    [category, data],
  );
  const cardWidth = (width - spacing.md * 2 - spacing.sm) / 2;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.grid}>
          {[0, 1, 2, 3, 4, 5].map((item) => <SkeletonBlock key={item} style={{ width: cardWidth, height: cardWidth * 9 / 16 }} />)}
        </View>
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ErrorState message={error} onRetry={retry} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={programmes}
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
            <Text style={styles.eyebrow}>MOON TV · CATEGORY</Text>
            <Text style={styles.heading}>{category}</Text>
          </View>
        }
        ListEmptyComponent={<EmptyState message="No programmes in this category." />}
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
      />
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
});
