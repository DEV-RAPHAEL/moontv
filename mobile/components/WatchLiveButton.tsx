import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { getStreamUrl } from '../lib/api';
import { colors, radius, spacing } from '../lib/theme';

const streamUrl = getStreamUrl();

export default function WatchLiveButton() {
  const disabled = !streamUrl;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={disabled ? 'Watch Live unavailable' : 'Watch Live'}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        if (streamUrl) void Linking.openURL(streamUrl).catch(() => {});
      }}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.disabled : styles.available,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={[styles.indicator, disabled && styles.indicatorDisabled]} />
      <Text style={[styles.label, disabled && styles.disabledLabel]}>Watch Live</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 40,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    borderColor: colors.border,
    backgroundColor: colors.bgSecondary,
  },
  available: {
    borderColor: colors.buttonGreenHover,
    backgroundColor: colors.buttonGreen,
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#f06464',
  },
  indicatorDisabled: {
    backgroundColor: colors.textSecondary,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
  },
  disabledLabel: {
    color: colors.textSecondary,
  },
});
