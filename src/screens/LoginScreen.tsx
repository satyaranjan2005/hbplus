import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackScreenProps } from '../types/navigation';
import {
  configureGoogleSignIn,
  signInWithGoogle,
} from '../services/firebase/googleSignIn';
import { useResponsive } from '../theme';
import Config from 'react-native-config';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { width, height, font, moderateScale, theme, isSmallScreen, isDesktop } = useResponsive();
  const domain = (Config.AUTHORIZED_EMAIL_DOMAIN || 'hbplus.fit').toLowerCase().trim();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMessage('');
    try {
      const user = await signInWithGoogle();
      if (user) {
        navigation.replace('Dashboard');
      }
    } catch (error: any) {
      setErrorMessage(error?.message || 'Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const logoSize = Math.min(84, Math.max(60, moderateScale(72)));
  const horizontalPadding = Math.min(48, Math.max(24, width * 0.08));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Top Header Title Bar for Web */}
      {isDesktop && (
        <View style={styles.webTopHeader}>
          <View style={styles.webTopHeaderInner}>
            <View style={styles.webBrandRow}>
              <Image
                source={require('../assets/images/hbplus-logo.png')}
                style={styles.webLogoIcon}
              />
              <Text style={styles.webBrandTitle}>HB+ Enterprise</Text>
            </View>
            <View style={styles.webBadge}>
              <Text style={styles.webBadgeText}>Employee Workspace</Text>
            </View>
          </View>
        </View>
      )}

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: horizontalPadding,
            minHeight: height - (StatusBar.currentHeight || 24),
          },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.contentWrapper}>
          {/* Top Logo */}
          <View style={[styles.logoSection, { marginTop: moderateScale(isSmallScreen ? 16 : isDesktop ? 40 : 24) }]}>
            <Image
              source={require('../assets/images/hbplus-logo.png')}
              style={[styles.logoImage, { width: logoSize, height: logoSize }]}
            />
          </View>

          {/* Center Content */}
          <View style={styles.contentSection}>
            <Text style={[styles.heading, { fontSize: font(26) }]}>Welcome to HB+</Text>
            <Text
              style={[
                styles.subheading,
                {
                  fontSize: font(14),
                  lineHeight: font(20),
                  maxWidth: 360,
                },
              ]}
            >
              HB+ Employee Workspace & Task Management Portal
            </Text>

            {errorMessage ? (
              <View style={styles.errorBox}>
                <View style={styles.errorHeaderRow}>
                  <Text style={styles.errorIcon}>!</Text>
                  <Text style={styles.errorTitle}>Sign-In Notice</Text>
                  <TouchableOpacity
                    onPress={() => setErrorMessage('')}
                    style={styles.errorDismissBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.errorDismissText}>×</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.errorText, { fontSize: font(12) }]}>{errorMessage}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[
                styles.googleBtn,
                { height: Math.min(54, Math.max(48, moderateScale(52))) },
                theme.web.cursorPointer,
                googleLoading && styles.btnDisabled,
              ]}
              onPress={handleGoogleSignIn}
              disabled={googleLoading}
              activeOpacity={0.7}
            >
              {googleLoading ? (
                <ActivityIndicator color={theme.colors.primary} />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.googleG}>G</Text>
                  <Text style={[styles.btnText, { fontSize: font(15) }]}>Sign in with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={[styles.domainNote, { fontSize: font(12) }]}>
              Restricted to <Text style={styles.domainHighlight}>@{domain}</Text> accounts
            </Text>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { paddingBottom: moderateScale(28) }]}>
            <Image
              source={require('../assets/images/hbplus-wordmark.png')}
              style={styles.footerWordmark}
            />
            <Text style={[styles.footerText, { fontSize: font(11) }]}>hbplus.fit Enterprise</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webTopHeader: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  webTopHeaderInner: {
    width: '100%',
    maxWidth: 1100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  webBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  webLogoIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
    resizeMode: 'contain',
  },
  webBrandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.3,
  },
  webBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  webBadgeText: {
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
  },
  contentSection: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 16,
  },
  heading: {
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subheading: {
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 18,
    width: '100%',
    maxWidth: 360,
  },
  errorHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  errorIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 18,
    marginRight: 6,
  },
  errorTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#991B1B',
    flex: 1,
  },
  errorDismissBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  errorDismissText: {
    fontSize: 16,
    color: '#991B1B',
    fontWeight: '700',
  },
  errorText: {
    color: '#DC2626',
    lineHeight: 18,
  },
  googleBtn: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleG: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4285F4',
    marginRight: 10,
  },
  btnText: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  domainNote: {
    marginTop: 16,
    color: '#94A3B8',
  },
  domainHighlight: {
    color: '#2563EB',
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerWordmark: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  footerText: {
    color: '#94A3B8',
    fontWeight: '500',
  },
});
