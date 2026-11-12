import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FavoritesProvider } from '../lib/FavoritesContext';
import { colors, spacing } from '../lib/theme';

const ONBOARDING_KEY = 'moontv:onboarding-complete:v1';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <StatusBar style="light" />
          <AppNavigation />
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppNavigation() {
  const router = useRouter();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const [rootLaidOut, setRootLaidOut] = useState(false);
  const [minimumSplashElapsed, setMinimumSplashElapsed] = useState(false);
  const isOnboardingRoute = segments[0] === 'onboarding';
  const routeResolved = onboardingComplete !== null
    && Boolean(navigationState?.key)
    && minimumSplashElapsed
    && (onboardingComplete || isOnboardingRoute);

  useEffect(() => {
    if (!navigationState?.key || !lastNotificationResponse) return;
    if (lastNotificationResponse.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) return;
    const slug = lastNotificationResponse.notification.request.content.data?.slug;
    if (typeof slug !== 'string') return;
    router.push({ pathname: '/programme/[slug]', params: { slug } });
    void Notifications.clearLastNotificationResponseAsync();
  }, [lastNotificationResponse, navigationState?.key, router]);

  useEffect(() => {
    const timer = setTimeout(() => setMinimumSplashElapsed(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => {
        if (active) setOnboardingComplete(value === 'true');
      })
      .catch((cause: unknown) => {
        console.error('Failed to read onboarding state', cause);
        if (active) setOnboardingComplete(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (onboardingComplete === null || onboardingComplete || !navigationState?.key || isOnboardingRoute) return;

    let active = true;
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value) => {
        if (!active) return;
        if (value === 'true') {
          setOnboardingComplete(true);
        } else {
          router.replace('/onboarding');
        }
      })
      .catch((cause: unknown) => {
        console.error('Failed to confirm onboarding state', cause);
        if (active) router.replace('/onboarding');
      });

    return () => {
      active = false;
    };
  }, [isOnboardingRoute, navigationState?.key, onboardingComplete, router]);

  useEffect(() => {
    if (!rootLaidOut || !routeResolved) return;
    SplashScreen.hideAsync().catch((cause: unknown) => {
      console.error('Failed to hide native splash screen', cause);
    });
  }, [rootLaidOut, routeResolved]);

  return (
    <View style={styles.root} onLayout={() => setRootLaidOut(true)}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgPrimary },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="programme/[slug]" />
        <Stack.Screen name="programmes/[category]" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="account" />
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="watch" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
      {!routeResolved ? <LaunchSplash /> : null}
    </View>
  );
}

function LaunchSplash() {
  return (
    <View style={styles.splash}>
      <LinearGradient
        colors={['#10251a', colors.bgPrimary, '#030704']}
        locations={[0, 0.56, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.splashHalo} />
      <View style={styles.splashContent}>
        <Image source={require('../assets/icon.png')} style={styles.splashLogo} contentFit="contain" />
        <Text style={styles.splashBrand}>MOON TV</Text>
        <View style={styles.splashDivider} />
        <Text style={styles.splashTagline}>Stories that unite a nation.</Text>
      </View>
      <View style={styles.splashFooter}>
        <View style={styles.splashProgressTrack}>
          <View style={styles.splashProgress} />
        </View>
        <Text style={styles.splashFooterText}>CULTURE · CONNECTION · STORY</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgPrimary },
  splash: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.bgPrimary,
  },
  splashHalo: {
    position: 'absolute',
    width: 340,
    height: 340,
    top: '25%',
    borderRadius: 170,
    borderWidth: 1,
    borderColor: 'rgba(216,182,66,0.12)',
    backgroundColor: 'rgba(216,182,66,0.025)',
  },
  splashContent: { alignItems: 'center', marginTop: -spacing.xl },
  splashLogo: { width: 156, height: 156, borderRadius: 78 },
  splashBrand: { marginTop: spacing.lg, color: colors.textPrimary, fontSize: 24, fontWeight: '900', letterSpacing: 4 },
  splashDivider: { width: 38, height: 2, marginTop: spacing.md, backgroundColor: colors.accentGold },
  splashTagline: { marginTop: spacing.md, color: colors.textSecondary, fontSize: 14, letterSpacing: 0.35 },
  splashFooter: { position: 'absolute', left: 52, right: 52, bottom: 56, alignItems: 'center', gap: spacing.md },
  splashProgressTrack: { width: 92, height: 2, borderRadius: 1, overflow: 'hidden', backgroundColor: colors.border },
  splashProgress: { width: '62%', height: '100%', backgroundColor: colors.accentGold },
  splashFooterText: { color: '#668071', fontSize: 9, fontWeight: '700', letterSpacing: 1.7 },
});
