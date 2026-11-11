import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSiteOrigin } from '../../lib/api';
import { colors, radius, spacing } from '../../lib/theme';

const links = [
  { title: 'About Moon TV', path: '/about', icon: 'information-circle-outline' as const },
  { title: 'Contact', path: '/contact', icon: 'mail-outline' as const },
  { title: 'Advertise', path: '/advertise', icon: 'megaphone-outline' as const },
  { title: 'Join the waitlist', path: '/', icon: 'notifications-outline' as const },
];

export default function MoreScreen() {
  const origin = getSiteOrigin();

  async function open(path: string) {
    if (!origin) {
      Alert.alert('Website unavailable', 'Set EXPO_PUBLIC_API_URL to the Moon TV website address.');
      return;
    }
    try {
      await Linking.openURL(`${origin}${path}`);
    } catch (error) {
      Alert.alert('Could not open link', error instanceof Error ? error.message : 'Please try again.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>DISCOVER MORE</Text>
        <Text style={styles.heading}>More from Moon TV</Text>
        <Text style={styles.caption}>Culture, connection and stories that bring us together.</Text>
        <View style={styles.list}>
          {links.map((link) => (
            <Pressable
              key={link.path}
              accessibilityRole="link"
              onPress={() => void open(link.path)}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
            >
              <View style={styles.iconWrap}>
                <Ionicons name={link.icon} size={21} color={colors.accentGold} />
              </View>
              <Text style={styles.rowTitle}>{link.title}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.bgPrimary },
  content: { padding: spacing.md, paddingTop: spacing.xl, gap: spacing.sm },
  eyebrow: { color: colors.buttonGreenHover, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  heading: { color: colors.textPrimary, fontSize: 28, lineHeight: 34, fontWeight: '800' },
  caption: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: spacing.lg },
  list: { gap: spacing.sm },
  row: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgSecondary,
  },
  iconWrap: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: colors.bgTertiary },
  rowTitle: { flex: 1, color: colors.textPrimary, fontSize: 15, fontWeight: '600' },
  pressed: { opacity: 0.75 },
});
