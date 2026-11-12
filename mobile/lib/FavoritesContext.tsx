import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import {
  cancelFavoriteShowNotifications,
  refreshFavoriteShowNotifications,
  requestFavoriteShowNotificationPermission,
} from './favorite-show-notifications';

const STORAGE_KEY = 'moontv:favorites:v1';
const NOTIFICATIONS_KEY = 'moontv:favorite-show-notifications:v1';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

type FavoritesContextValue = {
  favorites: string[];
  ready: boolean;
  storageError: string | null;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const favoritesRef = useRef<string[]>([]);
  const writeQueue = useRef<Promise<void>>(Promise.resolve());
  const notificationQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(NOTIFICATIONS_KEY)])
      .then(async ([stored, notificationPreference]) => {
        if (!active) return;
        const parsed: unknown = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(parsed) || parsed.some((slug) => typeof slug !== 'string')) {
          throw new Error('Stored favourites data is not a list of programme slugs.');
        }
        favoritesRef.current = [...new Set(parsed)];
        setFavorites(favoritesRef.current);
        if (notificationPreference === 'true' && Platform.OS !== 'web') {
          const permission = await Notifications.getPermissionsAsync();
          if (active && (
            permission.granted
            || permission.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
          )) setNotificationsEnabledState(true);
        }
      })
      .catch((cause: unknown) => {
        const message = cause instanceof Error ? cause.message : 'Could not load saved favourites.';
        console.error('Failed to load Moon TV favourites', cause);
        if (active) setStorageError(message);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const setNotificationsEnabled = useCallback(async (enabled: boolean) => {
    if (enabled) await requestFavoriteShowNotificationPermission();
    else await cancelFavoriteShowNotifications();
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, String(enabled));
    setNotificationsEnabledState(enabled);
  }, []);

  useEffect(() => {
    if (!ready) return;
    notificationQueue.current = notificationQueue.current
      .catch(() => undefined)
      .then(() => notificationsEnabled
        ? refreshFavoriteShowNotifications(favorites)
        : cancelFavoriteShowNotifications())
      .catch((cause: unknown) => {
        console.error('Failed to update favourite show reminders', cause);
      });
  }, [favorites, notificationsEnabled, ready]);

  const toggleFavorite = useCallback((slug: string) => {
    if (!ready) return;
    const next = favoritesRef.current.includes(slug)
      ? favoritesRef.current.filter((item) => item !== slug)
      : [...favoritesRef.current, slug];
    favoritesRef.current = next;
    setFavorites(next);
    setStorageError(null);
    writeQueue.current = writeQueue.current
      .then(() => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesRef.current)))
      .catch((cause: unknown) => {
        const message = cause instanceof Error ? cause.message : 'Could not save your favourites.';
        console.error('Failed to save Moon TV favourites', cause);
        setStorageError(message);
        Alert.alert('Favourites could not be saved', 'Check your device storage and try again.');
      });
  }, [ready]);

  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    ready,
    storageError,
    notificationsEnabled,
    setNotificationsEnabled,
    isFavorite: (slug) => favorites.includes(slug),
    toggleFavorite,
  }), [favorites, notificationsEnabled, ready, setNotificationsEnabled, storageError, toggleFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider.');
  return context;
}
