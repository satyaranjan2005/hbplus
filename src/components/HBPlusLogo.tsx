import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface HBPlusLogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
  variant?: 'mark' | 'wordmark' | 'both';
}

export default function HBPlusLogo({
  size = 'medium',
  showTagline = true,
  variant = 'both',
}: HBPlusLogoProps) {
  const dimensions = {
    small: { mark: 44, wordmarkW: 130, wordmarkH: 30, tag: 10 },
    medium: { mark: 72, wordmarkW: 180, wordmarkH: 41, tag: 12 },
    large: { mark: 100, wordmarkW: 230, wordmarkH: 52, tag: 13 },
  }[size];

  return (
    <View style={styles.container}>
      {/* Official HB+ Logo Symbol */}
      {(variant === 'mark' || variant === 'both') && (
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/hbplus-logo.png')}
            style={{
              width: dimensions.mark,
              height: dimensions.mark,
              resizeMode: 'contain',
            }}
          />
        </View>
      )}

      {/* Official HB+ Horizontal Wordmark */}
      {(variant === 'wordmark' || variant === 'both') && (
        <View style={styles.wordmarkWrapper}>
          <Image
            source={require('../assets/images/hbplus-wordmark.png')}
            style={{
              width: dimensions.wordmarkW,
              height: dimensions.wordmarkH,
              resizeMode: 'contain',
            }}
          />
        </View>
      )}

      {/* Official hbplus.fit Slogan & URL */}
      {showTagline && (
        <View style={styles.taglineContainer}>
          <Text style={[styles.taglineText, { fontSize: dimensions.tag }]}>
            Workouts &bull; Physiotherapy &bull; Nutrition &bull; Mental Wellness
          </Text>
          <Text style={styles.portalUrl}>hbplus.fit</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    marginBottom: 8,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  wordmarkWrapper: {
    marginTop: 4,
    marginBottom: 6,
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  taglineText: {
    color: '#858585',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  portalUrl: {
    color: '#E11D48',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 4,
    textTransform: 'lowercase',
  },
});
