import { Dimensions, PixelRatio, Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Baseline reference dimensions (mobile standard)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Linear scale based on screen width (clamped for web/desktop)
 */
export const scale = (size: number): number => {
  const boundedWidth = Math.min(SCREEN_WIDTH, 480);
  return (boundedWidth / BASE_WIDTH) * size;
};

/**
 * Linear scale based on screen height
 */
export const verticalScale = (size: number): number => {
  const boundedHeight = Math.min(SCREEN_HEIGHT, 900);
  return (boundedHeight / BASE_HEIGHT) * size;
};

/**
 * Moderate scale with dampening factor
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Responsive Font Size - normalized for pixel density and font scale
 */
export const responsiveFontSize = (fontSize: number, factor = 0.5): number => {
  const scaled = moderateScale(fontSize, factor);
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

/**
 * Unified Theme Tokens
 */
export const theme = {
  colors: {
    primary: '#2563EB',
    primaryDark: '#1D4ED8',
    primaryLight: '#EFF6FF',
    primaryBorder: '#DBEAFE',
    primaryText: '#1E40AF',

    background: '#FFFFFF',
    surface: '#FAFAFA',
    surfaceElevated: '#FFFFFF',
    surfaceBorder: '#EEEEEE',
    divider: '#F0F0F0',

    textPrimary: '#1A1A1A',
    textSecondary: '#64748B',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',

    success: '#16A34A',
    successLight: '#F0FDF4',
    successBorder: '#DCFCE7',
    successText: '#15803D',

    warning: '#D97706',
    warningLight: '#FEF3C7',
    warningBorder: '#FDE68A',
    warningText: '#B45309',

    error: '#DC2626',
    errorLight: '#FEF2F2',
    errorBorder: '#FECACA',
    errorText: '#B91C1C',

    track: '#E2E8F0',
    border: '#E2E8F0',
    iconInactive: '#858585',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  web: {
    cursorPointer: Platform.select<{ cursor?: 'pointer' }>({
      web: { cursor: 'pointer' },
      default: {},
    }),
    userSelectNone: Platform.select<{ userSelect?: 'none' }>({
      web: { userSelect: 'none' },
      default: {},
    }),
  },
};

/**
 * Hook for responsive layouts across Mobile, Tablet, and Web
 */
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isWeb = Platform.OS === 'web';
  const isSmallScreen = width < 360;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isLargeDesktop = width >= 1440;
  const isLandscape = width > height;

  // Clamped scaling so text and elements don't bloat uncontrollably on ultra-wide web monitors
  const boundedWidth = Math.min(width, isDesktop ? 600 : 480);
  const dynamicScale = (size: number) => (boundedWidth / BASE_WIDTH) * size;
  const dynamicModerateScale = (size: number, factor = 0.5) =>
    size + (dynamicScale(size) - size) * factor;

  const font = (size: number, factor = 0.4) =>
    Math.round(PixelRatio.roundToNearestPixel(dynamicModerateScale(size, factor)));

  // Maximum content width for web layouts to maintain readability
  const maxWebWidth = Math.min(1100, Math.max(320, width - 48));

  return {
    width,
    height,
    insets,
    isWeb,
    isSmallScreen,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isLandscape,
    maxWebWidth,
    scale: dynamicScale,
    moderateScale: dynamicModerateScale,
    font,
    theme,
  };
};

export default theme;
