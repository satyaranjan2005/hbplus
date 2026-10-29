import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function AnalyticsScreen() {
  const isDark = useColorScheme() === 'dark';

  const theme = {
    bg: isDark ? '#0F172A' : '#F8FAFC',
    card: isDark ? '#1E293B' : '#FFFFFF',
    textPrimary: isDark ? '#F8FAFC' : '#0F172A',
    textSecondary: isDark ? '#94A3B8' : '#64748B',
    border: isDark ? '#334155' : '#E2E8F0',
  };

  const trafficChannels = [
    { name: 'Organic Search', percentage: 48, visitors: '14.2k', color: '#4F46E5' },
    { name: 'Direct Traffic', percentage: 28, visitors: '8.3k', color: '#06B6D4' },
    { name: 'Referral & Affiliates', percentage: 14, visitors: '4.1k', color: '#10B981' },
    { name: 'Social Campaigns', percentage: 10, visitors: '2.9k', color: '#F59E0B' },
  ];

  const weeklyData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 82 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 75 },
    { day: 'Sat', value: 50 },
    { day: 'Sun', value: 60 },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Title */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Performance & Analytics
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Real-time metrics, traffic insights, and conversion rates
        </Text>
      </View>

      {/* Bar Chart Overview */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={styles.chartHeader}>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Weekly Activity
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textSecondary }]}>
              Average +22% vs last week
            </Text>
          </View>
          <View style={styles.growthBadge}>
            <Text style={styles.growthBadgeText}>+22%</Text>
          </View>
        </View>

        {/* Custom Native Bar Representation */}
        <View style={styles.barChartContainer}>
          {weeklyData.map((item, index) => (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${item.value}%`,
                      backgroundColor:
                        item.value >= 80 ? '#4F46E5' : '#818CF8',
                    },
                  ]}
                />
              </View>
              <Text style={[styles.barLabel, { color: theme.textSecondary }]}>
                {item.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Traffic Sources */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
          Traffic Acquisition
        </Text>
        <Text
          style={[
            styles.cardSubtitle,
            { color: theme.textSecondary, marginBottom: 18 },
          ]}
        >
          Top channels contributing to user engagement
        </Text>

        {trafficChannels.map((channel, i) => (
          <View key={i} style={styles.channelRow}>
            <View style={styles.channelMeta}>
              <View
                style={[styles.channelColorDot, { backgroundColor: channel.color }]}
              />
              <Text
                style={[styles.channelName, { color: theme.textPrimary }]}
              >
                {channel.name}
              </Text>
              <Text
                style={[styles.channelVisitors, { color: theme.textSecondary }]}
              >
                {channel.visitors} ({channel.percentage}%)
              </Text>
            </View>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${channel.percentage}%`,
                    backgroundColor: channel.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 18,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
  },
  growthBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  growthBadgeText: {
    color: '#15803D',
    fontWeight: '700',
    fontSize: 12,
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingTop: 10,
    paddingHorizontal: 6,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    height: 120,
    width: 24,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 8,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '600',
  },
  channelRow: {
    marginBottom: 16,
  },
  channelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  channelColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  channelName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  channelVisitors: {
    fontSize: 12,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
