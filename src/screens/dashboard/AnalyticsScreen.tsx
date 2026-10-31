import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useResponsive } from '../../theme';

export default function AnalyticsScreen() {
  const { width, font, moderateScale, isDesktop } = useResponsive();

  const departmentWorkload = [
    { name: 'Engineering & Mobile Dev', percentage: 42, value: '28 tasks', color: '#2563EB' },
    { name: 'Campus Operations & Support', percentage: 26, value: '18 tasks', color: '#0284C7' },
    { name: 'Product Quality & Security', percentage: 18, value: '12 tasks', color: '#4F46E5' },
    { name: 'Employee Wellness & Admin', percentage: 14, value: '9 tasks', color: '#16A34A' },
  ];

  const weeklyTaskThroughput = [
    { day: 'Mon', completed: 6, target: 8 },
    { day: 'Tue', completed: 9, target: 8 },
    { day: 'Wed', completed: 8, target: 8 },
    { day: 'Thu', completed: 11, target: 8 },
    { day: 'Fri', completed: 8, target: 8 },
    { day: 'Sat', completed: 4, target: 8 },
    { day: 'Sun', completed: 2, target: 8 },
  ];

  const maxTaskVal = 12;
  const containerPadding = isDesktop ? 32 : Math.min(28, Math.max(16, width * 0.045));
  const chartHeight = isDesktop ? 180 : Math.min(200, Math.max(130, moderateScale(150)));
  const contentWidth = isDesktop ? Math.min(1100, width - 64) : width - containerPadding * 2;
  const chartAvailableWidth = isDesktop ? contentWidth * 0.55 - 40 : contentWidth - 40;
  const barTrackWidth = Math.max(16, Math.min(36, Math.floor(chartAvailableWidth / 7 - 10)));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { padding: containerPadding }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.maxContainer}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: font(isDesktop ? 26 : 22) }]}>
            Task & Team Analytics
          </Text>
          <Text style={[styles.subtitle, { fontSize: font(13) }]}>
            Employee sprint velocity, task turnaround, and project workload
          </Text>
        </View>

        {/* KPI Overview Grid */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={[styles.kpiLabel, { fontSize: font(10) }]}>SPRINT VELOCITY</Text>
            <Text style={[styles.kpiValue, { fontSize: font(24) }]}>48 pts</Text>
            <Text style={[styles.kpiBadge, { fontSize: font(11) }]}>+14% vs last sprint</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={[styles.kpiLabel, { fontSize: font(10) }]}>AVG TURNAROUND</Text>
            <Text style={[styles.kpiValue, { fontSize: font(24) }]}>1.4 days</Text>
            <Text style={[styles.kpiBadge, { fontSize: font(11) }]}>Target Met</Text>
          </View>
        </View>

        {/* Desktop Web: Side-by-Side Analytics Grid */}
        <View style={[styles.analyticsGrid, isDesktop && styles.analyticsGridDesktop]}>
          {/* Weekly Throughput Bar Chart */}
          <View style={[styles.card, isDesktop && styles.cardDesktopHalf]}>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleCol}>
                <Text style={[styles.cardTitle, { fontSize: font(16) }]}>
                  Daily Task Throughput
                </Text>
                <Text style={[styles.cardSubtitle, { fontSize: font(12) }]}>
                  Target: 8 tasks resolved / day
                </Text>
              </View>
              <View style={styles.growthBadge}>
                <Text style={[styles.growthBadgeText, { fontSize: font(11) }]}>
                  92% EFFICIENCY
                </Text>
              </View>
            </View>

            {/* Custom Bar Chart */}
            <View style={[styles.barChartContainer, { height: chartHeight + 32 }]}>
              {weeklyTaskThroughput.map((item, index) => {
                const heightPercent = Math.min(100, Math.round((item.completed / maxTaskVal) * 100));
                const isMet = item.completed >= item.target;

                return (
                  <View key={index} style={styles.barColumn}>
                    <View style={[styles.barTrack, { height: chartHeight, width: barTrackWidth }]}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: `${heightPercent}%`,
                            backgroundColor: isMet ? '#2563EB' : '#93C5FD',
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.barLabel,
                        { fontSize: font(11) },
                        isMet && styles.barLabelActive,
                      ]}
                    >
                      {item.day}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Department Workload Distribution */}
          <View style={[styles.card, isDesktop && styles.cardDesktopHalf]}>
            <Text style={[styles.cardTitle, { fontSize: font(16) }]}>
              Department Workload
            </Text>
            <Text style={[styles.cardSubtitle, { fontSize: font(12), marginBottom: 18 }]}>
              Current task allocation across team units
            </Text>

            {departmentWorkload.map((dept, i) => (
              <View key={i} style={styles.channelRow}>
                <View style={styles.channelMeta}>
                  <View style={[styles.channelColorDot, { backgroundColor: dept.color }]} />
                  <Text style={[styles.channelName, { fontSize: font(13) }]}>
                    {dept.name}
                  </Text>
                  <Text style={[styles.channelVisitors, { fontSize: font(12) }]}>
                    {dept.value} ({dept.percentage}%)
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${dept.percentage}%`,
                        backgroundColor: dept.color,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
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
    maxWidth: 1100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#858585',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  kpiLabel: {
    color: '#2563EB',
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  kpiValue: {
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  kpiBadge: {
    color: '#16A34A',
    fontWeight: '600',
  },
  analyticsGrid: {
    width: '100%',
  },
  analyticsGridDesktop: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'stretch',
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FAFAFA',
    padding: 20,
    marginBottom: 18,
  },
  cardDesktopHalf: {
    flex: 1,
    marginBottom: 0,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitleCol: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: '#858585',
  },
  growthBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  growthBadgeText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 4,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barLabel: {
    marginTop: 8,
    fontWeight: '600',
    color: '#858585',
  },
  barLabelActive: {
    color: '#2563EB',
    fontWeight: '700',
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
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  channelVisitors: {
    color: '#858585',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
