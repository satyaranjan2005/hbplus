import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { DashboardTabProps } from '../../types/navigation';
import { getCurrentUser } from '../../services/firebase/auth';
import { signOutGoogle } from '../../services/firebase/googleSignIn';
import { useResponsive } from '../../theme';

declare const window: any;

export default function ProfileScreen({ navigation }: DashboardTabProps<'Profile'>) {
  const [loggingOut, setLoggingOut] = useState(false);
  const user = getCurrentUser();
  const { width, font, moderateScale, isDesktop, theme } = useResponsive();

  const handleLogout = async () => {
    const performLogout = async () => {
      setLoggingOut(true);
      try {
        await signOutGoogle();
      } catch (e) {
        console.error('[Profile] Sign-out error:', e);
      } finally {
        setLoggingOut(false);
        navigation.replace('Login');
      }
    };

    if (Platform.OS === 'web') {
      const confirmed =
        typeof window !== 'undefined'
          ? window.confirm('Are you sure you want to sign out of the Employee Workspace?')
          : true;
      if (confirmed) {
        await performLogout();
      }
      return;
    }

    Alert.alert('Sign Out', 'Are you sure you want to sign out of the Employee Workspace?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: performLogout,
      },
    ]);
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Employee';
  const initial = displayName.charAt(0).toUpperCase();

  const containerPadding = isDesktop ? 32 : Math.min(32, Math.max(16, width * 0.05));
  const avatarSize = Math.min(96, Math.max(68, moderateScale(76)));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { padding: containerPadding }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.maxContainer}>
        {/* Profile Header */}
        <View style={styles.avatarGlowContainer}>
          <View
            style={[
              styles.avatarContainer,
              { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
            ]}
          >
            <Text style={[styles.avatarText, { fontSize: font(avatarSize * 0.4) }]}>
              {initial}
            </Text>
          </View>
        </View>

        <Text style={[styles.name, { fontSize: font(isDesktop ? 26 : 22) }]}>
          {displayName}
        </Text>
        <Text style={[styles.email, { fontSize: font(13) }]}>
          {user?.email || 'No email associated'}
        </Text>

        <View style={styles.membershipPill}>
          <Text style={[styles.membershipPillText, { fontSize: font(10) }]}>
            HB+ VERIFIED EMPLOYEE
          </Text>
        </View>

        {/* Employee Details Card */}
        <View style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Image
              source={require('../../assets/images/hbplus-logo.png')}
              style={{
                width: moderateScale(24),
                height: moderateScale(24),
                marginRight: 8,
                resizeMode: 'contain',
              }}
            />
            <Image
              source={require('../../assets/images/hbplus-wordmark.png')}
              style={[
                styles.brandWordmark,
                { width: moderateScale(100), height: moderateScale(24) },
              ]}
            />
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontSize: font(13) }]}>Role</Text>
            <Text style={[styles.infoValue, { fontSize: font(13) }]}>
              Technical Specialist & Staff
            </Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontSize: font(13) }]}>Department</Text>
            <Text style={[styles.infoValueHighlight, { fontSize: font(13) }]}>
              Engineering & Campus Ops
            </Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontSize: font(13) }]}>Affiliation</Text>
            <Text style={[styles.infoValue, { fontSize: font(13) }]}>HB+</Text>
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { fontSize: font(13) }]}>Platform</Text>
            <Text style={[styles.infoValue, { fontSize: font(13) }]}>
              hbplus.fit Enterprise
            </Text>
          </View>
          {user?.uid ? (
            <>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { fontSize: font(13) }]}>Employee ID</Text>
                <Text
                  style={[styles.infoValueSubtle, { fontSize: font(12) }]}
                  numberOfLines={1}
                >
                  {user.uid.slice(0, 14)}...
                </Text>
              </View>
            </>
          ) : null}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            { height: moderateScale(48) },
            theme.web.cursorPointer,
            loggingOut && styles.disabledButton,
          ]}
          onPress={handleLogout}
          disabled={loggingOut}
          activeOpacity={0.7}
        >
          {loggingOut ? (
            <ActivityIndicator color="#2563EB" />
          ) : (
            <Text style={[styles.logoutText, { fontSize: font(14) }]}>
              Sign Out of Workspace
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 40,
  },
  maxContainer: {
    width: '100%',
    maxWidth: 580,
    alignItems: 'center',
  },
  avatarGlowContainer: {
    padding: 3,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#2563EB',
    marginBottom: 14,
  },
  avatarContainer: {
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#2563EB',
    fontWeight: '800',
  },
  name: {
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    color: '#858585',
    marginBottom: 12,
    textAlign: 'center',
  },
  membershipPill: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  membershipPillText: {
    color: '#2563EB',
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 24,
  },
  brandWordmark: {
    resizeMode: 'contain',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  infoLabel: {
    color: '#858585',
    fontWeight: '500',
  },
  infoValue: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  infoValueHighlight: {
    fontWeight: '700',
    color: '#2563EB',
  },
  infoValueSubtle: {
    color: '#858585',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  logoutText: {
    color: '#64748B',
    fontWeight: '600',
  },
});
