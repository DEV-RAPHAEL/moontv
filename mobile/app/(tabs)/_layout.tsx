import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../lib/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bgPrimary },
        tabBarActiveTintColor: colors.accentGold,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.bar,
          {
            height: 62 + insets.bottom,
            paddingBottom: Math.max(insets.bottom, spacing.xs),
          },
        ],
        tabBarItemStyle: styles.item,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="programmes"
        options={{
          title: 'Programmes',
          tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: () => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Watch live"
              onPress={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/watch');
              }}
              style={({ pressed }) => [styles.liveButtonSlot, pressed && styles.liveButtonPressed]}
            >
              <View style={styles.liveButton}>
                <Ionicons name="play" size={22} color={colors.bgPrimary} />
              </View>
              <Text style={styles.liveButtonLabel}>Live</Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={String(color)} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <Ionicons name="ellipsis-horizontal" size={size} color={String(color)} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.bgSecondary,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 12,
  },
  item: {
    minHeight: 54,
    paddingTop: spacing.xs,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 1,
  },
  liveButtonSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 3,
  },
  liveButton: {
    position: 'absolute',
    top: -19,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentGold,
    borderWidth: 4,
    borderColor: colors.bgPrimary,
    shadowColor: colors.accentGold,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
  liveButtonPressed: {
    opacity: 0.8,
  },
  liveButtonLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
});
