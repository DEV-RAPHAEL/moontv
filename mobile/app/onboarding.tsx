import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import {
  FlatList,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../lib/theme';

const ONBOARDING_KEY = 'moontv:onboarding-complete:v1';

const slides = [
  {
    eyebrow: 'WELCOME TO MOON TV',
    title: 'Stories that bring us together.',
    body: 'Discover the people, places and ideas shaping the spirit of our nation.',
    icon: 'sparkles-outline' as const,
  },
  {
    eyebrow: 'MADE FOR YOUR MOMENTS',
    title: 'Find your next favourite.',
    body: 'Explore drama, culture, food, conversation and more — all in one place.',
    icon: 'compass-outline' as const,
  },
  {
    eyebrow: 'ALWAYS SOMETHING ON',
    title: 'Stay close to the story.',
    body: 'Follow the schedule, save the shows you love and tune in live.',
    icon: 'radio-outline' as const,
  },
];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<(typeof slides)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) setActiveIndex(index);
  }

  function goNext() {
    if (activeIndex < slides.length - 1) {
      void Haptics.selectionAsync();
      listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      void finishOnboarding();
    }
  }

  async function finishOnboarding() {
    if (saving) return;
    setSaving(true);
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
      router.replace('/(tabs)');
    } catch (cause) {
      console.error('Failed to save onboarding state', cause);
      Alert.alert('Could not save your setup', 'Please try again before starting Moon TV.');
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />
      <LinearGradient
        colors={['#10231a', colors.bgPrimary, '#030704']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.topBar}>
        <View style={styles.brandLockup}>
          <Image source={require('../assets/icon.png')} style={styles.logo} contentFit="contain" />
          <Text style={styles.brandName}>MOON TV</Text>
        </View>
        {activeIndex < slides.length - 1 ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => void finishOnboarding()}
            disabled={saving}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        ) : <View style={styles.skipButton} />}
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.eyebrow}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.artwork}>
              <View style={[styles.orbit, styles.orbitOuter]} />
              <View style={[styles.orbit, styles.orbitInner]} />
              <View style={styles.artGlow} />
              <View style={styles.artMoon}>
                <Image source={require('../assets/icon.png')} style={styles.artLogo} contentFit="contain" />
              </View>
              <View style={styles.artIcon}>
                <Ionicons name={item.icon} size={22} color={colors.bgPrimary} />
              </View>
              <View style={[styles.artSpark, styles.sparkOne]} />
              <View style={[styles.artSpark, styles.sparkTwo]} />
              <View style={[styles.artSpark, styles.sparkThree]} />
              <Text style={styles.artIndex}>0{index + 1}</Text>
            </View>
            <View style={styles.copy}>
              <Text style={styles.eyebrow}>{item.eyebrow}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomBar}>
        <View style={styles.pagination}>
          {slides.map((slide, index) => (
            <View
              key={slide.eyebrow}
              style={[styles.dot, index === activeIndex && styles.dotActive]}
            />
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={goNext}
          disabled={saving}
          style={({ pressed }) => [styles.nextButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.nextLabel}>
            {saving ? 'Getting things ready…' : activeIndex === slides.length - 1 ? 'Start watching' : 'Continue'}
          </Text>
          {!saving ? <Ionicons name={activeIndex === slides.length - 1 ? 'play' : 'arrow-forward'} size={18} color={colors.bgPrimary} /> : null}
        </Pressable>
        <Text style={styles.footer}>CULTURE · CONNECTION · STORY</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  topBar: { height: 58, paddingHorizontal: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logo: { width: 30, height: 30, borderRadius: 15 },
  brandName: { color: colors.textPrimary, fontSize: 13, fontWeight: '800', letterSpacing: 1.5 },
  skipButton: { width: 52, height: 44, alignItems: 'flex-end', justifyContent: 'center' },
  skipText: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  slide: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'center', paddingBottom: spacing.md },
  artwork: { height: '48%', minHeight: 260, maxHeight: 380, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  orbit: { position: 'absolute', borderRadius: 999, borderWidth: 1 },
  orbitOuter: { width: 290, height: 290, borderColor: 'rgba(216,182,66,0.12)' },
  orbitInner: { width: 226, height: 226, borderColor: 'rgba(216,182,66,0.2)' },
  artGlow: { position: 'absolute', width: 174, height: 174, borderRadius: 87, backgroundColor: 'rgba(216,182,66,0.09)' },
  artMoon: { width: 142, height: 142, alignItems: 'center', justifyContent: 'center', borderRadius: 71, borderWidth: 1, borderColor: 'rgba(216,182,66,0.58)', backgroundColor: '#f0e5aa', shadowColor: colors.accentGold, shadowOpacity: 0.24, shadowRadius: 34, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  artLogo: { width: 92, height: 92, borderRadius: 46 },
  artIcon: { position: 'absolute', right: '22%', bottom: '19%', width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24, backgroundColor: colors.accentGold, borderWidth: 4, borderColor: colors.bgPrimary },
  artSpark: { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accentGold },
  sparkOne: { top: '20%', left: '28%' },
  sparkTwo: { top: '32%', right: '21%', width: 4, height: 4 },
  sparkThree: { bottom: '24%', left: '22%', width: 3, height: 3 },
  artIndex: { position: 'absolute', bottom: 4, color: '#577563', fontSize: 10, fontWeight: '700', letterSpacing: 3 },
  copy: { alignItems: 'center', paddingHorizontal: spacing.sm },
  eyebrow: { color: colors.accentGold, fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  title: { maxWidth: 340, marginTop: spacing.md, color: colors.textPrimary, fontSize: 32, lineHeight: 38, fontWeight: '800', textAlign: 'center' },
  body: { maxWidth: 320, marginTop: spacing.md, color: colors.textSecondary, fontSize: 15, lineHeight: 23, textAlign: 'center' },
  bottomBar: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.md, alignItems: 'center' },
  pagination: { height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  dotActive: { width: 22, backgroundColor: colors.accentGold },
  nextButton: { width: '100%', minHeight: 54, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: 16, backgroundColor: colors.accentGold },
  nextLabel: { color: colors.bgPrimary, fontSize: 15, fontWeight: '800' },
  buttonPressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  footer: { marginTop: spacing.xs, color: '#668071', fontSize: 9, fontWeight: '700', letterSpacing: 1.5 },
});
