import { memo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { colors, radius, spacing } from '../lib/theme';
import { resolveImageUrl } from '../lib/api';

const posterGradients = [
  [colors.bgTertiary, '#183724'],
  [colors.bgSecondary, '#26361c'],
  ['#10241f', '#28402e'],
  ['#111c15', '#30452b'],
] as const;

function gradientIndex(title: string): number {
  let hash = 0;
  for (let index = 0; index < title.length; index += 1) {
    hash = (hash * 31 + title.charCodeAt(index)) | 0;
  }
  return Math.abs(hash) % posterGradients.length;
}

function hasUsableImage(uri?: string | null): boolean {
  return Boolean(uri && !uri.endsWith('/hero_bg.jpg') && !uri.endsWith('hero_bg.jpg'));
}

export function PosterArtwork({
  title,
  uri,
  style,
}: {
  title: string;
  uri?: string | null;
  style: StyleProp<ViewStyle>;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUri = resolveImageUrl(uri);

  if (hasUsableImage(imageUri) && !imageFailed) {
    return (
      <View style={[style, styles.posterArtwork]}>
        <Image
          source={{ uri: imageUri }}
          style={styles.posterArtworkImage}
          contentFit="cover"
          transition={180}
          onError={() => setImageFailed(true)}
        />
      </View>
    );
  }

  return (
    <View style={[style, styles.posterArtwork]}>
      <LinearGradient
        colors={posterGradients[gradientIndex(title)]}
        style={styles.posterFallback}
      >
        <Text style={styles.posterFallbackTitle} numberOfLines={3}>
          {title}
        </Text>
      </LinearGradient>
    </View>
  );
}

type CardBaseProps = {
  title: string;
  image?: string | null;
  onPress?: PressableProps['onPress'];
  style?: ViewStyle;
  titleStyle?: TextStyle;
  accessibilityLabel?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

function usePressScale() {
  const scale = useSharedValue(1);
  const reducedMotion = useReducedMotion();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reducedMotion ? 1 : scale.value }],
  }));
  return {
    animatedStyle,
    onPressIn: () => {
      scale.value = withSpring(0.97, { damping: 18, stiffness: 240 });
    },
    onPressOut: () => {
      scale.value = withSpring(1, { damping: 16, stiffness: 220 });
    },
  };
}

export type PosterCardProps = CardBaseProps & {
  width: number;
  category?: string;
  host?: string;
  compact?: boolean;
};

function PosterCardComponent({
  title,
  image,
  onPress,
  width,
  category,
  host,
  compact = false,
  style,
  accessibilityLabel,
  isFavorite,
  onToggleFavorite,
}: PosterCardProps) {
  const press = usePressScale();
  const content = (
    <View style={styles.posterCard}>
      <PosterArtwork title={title} uri={image} style={[styles.posterImage, { height: width * 9 / 16 }]} />
      {category ? <Text style={styles.posterCategory} numberOfLines={1}>{category}</Text> : null}
      <Text style={[styles.posterTitle, compact && styles.posterTitleCompact]} numberOfLines={1}>
        {title}
      </Text>
      {host ? <Text style={styles.posterHost} numberOfLines={1}>{host}</Text> : null}
    </View>
  );
  const card = onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {content}
    </Pressable>
  ) : content;

  return (
    <Animated.View style={onPress ? press.animatedStyle : undefined}>
      <View style={[styles.posterCardOuter, { width }, style]}>
        {card}
        {onToggleFavorite ? (
          <FavoriteToggle
            selected={Boolean(isFavorite)}
            onPress={onToggleFavorite}
            style={styles.posterFavorite}
          />
        ) : null}
      </View>
    </Animated.View>
  );
}

export const PosterCard = memo(PosterCardComponent);

export type WideCardProps = CardBaseProps & {
  width: number;
  subtitle?: string;
};

function WideCardComponent({
  title,
  image,
  onPress,
  width,
  subtitle,
  isFavorite,
  onToggleFavorite,
}: WideCardProps) {
  const press = usePressScale();
  const card = (
    <View style={[styles.wideCard, { width, height: width * 9 / 16 }]}>
      <PosterArtwork title={title} uri={image} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={['transparent', 'rgba(5, 11, 7, 0.88)']}
        style={styles.wideGradient}
      />
      <View style={styles.wideCopy}>
        {subtitle ? <Text style={styles.wideSubtitle} numberOfLines={1}>{subtitle}</Text> : null}
        <Text style={styles.wideTitle} numberOfLines={2}>{title}</Text>
      </View>
    </View>
  );
  return (
    <Animated.View style={onPress ? press.animatedStyle : undefined}>
      <View style={[styles.wideCardOuter, { width, height: width * 9 / 16 }]}>
        {onPress ? (
          <Pressable onPress={onPress} onPressIn={press.onPressIn} onPressOut={press.onPressOut}>
            {card}
          </Pressable>
        ) : card}
        {onToggleFavorite ? (
          <FavoriteToggle
            selected={Boolean(isFavorite)}
            onPress={onToggleFavorite}
            style={styles.wideFavorite}
          />
        ) : null}
      </View>
    </Animated.View>
  );
}

export const WideCard = memo(WideCardComponent);

export function FavoriteToggle({
  selected,
  onPress,
  style,
}: {
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={selected ? 'Remove from favourites' : 'Add to favourites'}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.favoriteToggle, style, pressed && styles.pressed]}
    >
      <Ionicons
        name={selected ? 'heart' : 'heart-outline'}
        size={21}
        color={selected ? colors.accentGold : colors.textPrimary}
      />
    </Pressable>
  );
}

export function SectionHeader({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle} numberOfLines={1}>{title}</Text>
      {onSeeAll ? (
        <Pressable
          accessibilityRole="button"
          onPress={onSeeAll}
          style={({ pressed }) => [styles.seeAll, pressed && styles.pressed]}
        >
          <Text style={styles.seeAllText}>See all</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function CategoryPill({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.categoryPill,
        selected && styles.categoryPillSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.categoryPillText, selected && styles.categoryPillTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function SkeletonBlock({ style }: { style?: ViewStyle }) {
  return <View style={[styles.skeleton, style]} />;
}

export function Badge({
  label,
  tone = 'accent',
}: {
  label: string;
  tone?: 'accent' | 'live' | 'muted';
}) {
  return (
    <View style={[styles.badge, styles[`badge_${tone}`]]}>
      {tone === 'live' ? <View style={styles.liveDot} /> : null}
      <Text style={[styles.badgeText, styles[`badgeText_${tone}`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  posterCard: {
    flexShrink: 0,
  },
  posterCardOuter: {
    position: 'relative',
    flexShrink: 0,
  },
  wideCardOuter: {
    position: 'relative',
  },
  posterFavorite: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  wideFavorite: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  favoriteToggle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(5,11,7,0.78)',
  },
  posterImage: {
    width: '100%',
    borderRadius: radius.lg,
    backgroundColor: colors.bgTertiary,
  },
  posterFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  posterFallbackTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '800',
    textAlign: 'center',
  },
  posterCategory: {
    color: colors.accentGold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginTop: spacing.sm,
  },
  posterTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  posterTitleCompact: {
    marginTop: 6,
  },
  posterHost: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  wideCard: {
    borderRadius: radius.lg,
    backgroundColor: colors.bgTertiary,
    overflow: 'hidden',
  },
  wideGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: '35%',
  },
  posterArtwork: {
    overflow: 'hidden',
  },
  posterArtworkImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  wideCopy: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    gap: spacing.xs,
  },
  wideSubtitle: {
    color: colors.accentGold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  wideTitle: {
    color: colors.textPrimary,
    fontSize: 19,
    lineHeight: 23,
    fontWeight: '700',
  },
  sectionHeader: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  sectionTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '700',
  },
  seeAll: {
    minHeight: 44,
    justifyContent: 'center',
    paddingLeft: spacing.sm,
  },
  seeAllText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  categoryPill: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgSecondary,
  },
  categoryPillSelected: {
    borderColor: colors.accentGold,
    backgroundColor: colors.accentGold,
  },
  categoryPillText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryPillTextSelected: {
    color: colors.bgPrimary,
  },
  skeleton: {
    borderRadius: radius.lg,
    backgroundColor: colors.bgTertiary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    minHeight: 24,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    borderRadius: 999,
  },
  badge_accent: {
    backgroundColor: colors.accentGold,
  },
  badge_live: {
    backgroundColor: '#c83e3e',
  },
  badge_muted: {
    backgroundColor: colors.bgTertiary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  badgeText_accent: {
    color: colors.bgPrimary,
  },
  badgeText_live: {
    color: colors.textPrimary,
  },
  badgeText_muted: {
    color: colors.textSecondary,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },
  pressed: {
    opacity: 0.75,
  },
});
