import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useResponsive } from '../../theme';

export default function SettingsScreen() {
  const { width, font, isDesktop } = useResponsive();

  const settingsGroups = [
    {
      title: 'TASKS & NOTIFICATIONS',
      items: [
        { label: 'Task Assignment Alerts', value: 'Instant Push & Email' },
        { label: 'Daily Standup Ping', value: '11:00 AM' },
        { label: 'Sprint Review Reminders', value: 'Every Friday' },
      ],
    },
    {
      title: 'SECURITY & WORKSPACE DOMAIN',
      items: [
        { label: 'Domain Restriction', value: '@silicon.ac.in Active' },
        { label: 'Session Management', value: 'Google SSO Verified' },
      ],
    },
    {
      title: 'WORKSPACE & ENTERPRISE',
      items: [
        { label: 'Platform Portal', value: 'hbplus.fit Enterprise' },
        { label: 'Campus Unit', value: 'Silicon University, Bhubaneswar' },
        { label: 'App Version', value: 'v1.0.0 (Build 2026.1)' },
      ],
    },
  ];

  const containerPadding = isDesktop ? 32 : Math.min(28, Math.max(16, width * 0.045));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { padding: containerPadding }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.maxContainer}>
        <Text style={[styles.headerTitle, { fontSize: font(isDesktop ? 26 : 22) }]}>
          Workspace Preferences
        </Text>
        <Text style={[styles.headerSubtitle, { fontSize: font(13) }]}>
          Manage your tasks, employee notifications, and campus sync
        </Text>

        {settingsGroups.map((group, idx) => (
          <View key={idx} style={styles.groupContainer}>
            <Text style={[styles.groupTitle, { fontSize: font(11) }]}>
              {group.title}
            </Text>
            <View style={styles.groupCard}>
              {group.items.map((item, itemIdx) => (
                <React.Fragment key={itemIdx}>
                  <View style={styles.itemRow}>
                    <Text style={[styles.itemLabel, { fontSize: font(13) }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.itemValue, { fontSize: font(12) }]}>
                      {item.value}
                    </Text>
                  </View>
                  {itemIdx < group.items.length - 1 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.brandFooter}>
          <Text style={[styles.brandFooterText, { fontSize: font(11) }]}>
            HB+ Enterprise • Silicon Campus Task & Employee Portal
          </Text>
        </View>
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
    paddingBottom: 40,
    alignItems: 'center',
  },
  maxContainer: {
    width: '100%',
    maxWidth: 640,
  },
  headerTitle: {
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: '#858585',
    marginBottom: 24,
  },
  groupContainer: {
    marginBottom: 24,
    width: '100%',
  },
  groupTitle: {
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 1,
    marginBottom: 8,
  },
  groupCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  itemLabel: {
    color: '#1A1A1A',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  itemValue: {
    color: '#858585',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  brandFooter: {
    alignItems: 'center',
    marginTop: 20,
  },
  brandFooterText: {
    color: '#A1A1AA',
    fontWeight: '500',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});
