import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getCurrentUser } from '../../services/firebase/auth';
import { useResponsive } from '../../theme';
import { CheckIcon, ClockIcon, PlusIcon } from '../../components/Icons';

interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'In Progress' | 'Pending' | 'Completed';
  dueTime: string;
}

export default function HomeScreen() {
  const user = getCurrentUser();
  const userName = user?.displayName || user?.email?.split('@')[0] || 'Employee';
  const { width, font, moderateScale, isSmallScreen, isDesktop, theme } = useResponsive();

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: 'Review hbplus domain security & auth checks',
      category: 'Security & DevOps',
      priority: 'High',
      status: 'In Progress',
      dueTime: 'Today 2:00 PM',
    },
    {
      id: '2',
      title: 'Finalize HB+ student health & wellness schedule',
      category: 'Operations',
      priority: 'Medium',
      status: 'Pending',
      dueTime: 'Today 4:30 PM',
    },
    {
      id: '3',
      title: 'Sync Sprint 14 deliverables with Tech Lead',
      category: 'Engineering',
      priority: 'High',
      status: 'In Progress',
      dueTime: 'Today 5:00 PM',
    },
    {
      id: '4',
      title: 'Prepare monthly employee onboarding deck',
      category: 'HR & People',
      priority: 'Low',
      status: 'Completed',
      dueTime: 'Yesterday',
    },
  ]);

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'Completed' ? 'In Progress' : 'Completed',
            }
          : t
      )
    );
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const completionPercentage = Math.round((completedCount / tasks.length) * 100);

  const containerPadding = isDesktop ? 32 : Math.min(28, Math.max(16, width * 0.045));

  // Render Velocity Card
  const renderVelocityCard = () => (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <View>
          <Text style={[styles.progressTitle, { fontSize: font(14) }]}>
            Daily Task Velocity
          </Text>
          <Text style={[styles.progressSubtitle, { fontSize: font(12) }]}>
            {completedCount} of {tasks.length} tasks completed today
          </Text>
        </View>
        <View style={styles.progressBadge}>
          <Text style={[styles.progressBadgeText, { fontSize: font(12) }]}>
            {completionPercentage}%
          </Text>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${completionPercentage}%` },
          ]}
        />
      </View>
    </View>
  );

  // Render Team Presence Card
  const renderTeamCard = () => (
    <View style={styles.teamCard}>
      <View style={styles.teamHeaderRow}>
        <Text style={[styles.teamTitle, { fontSize: font(14) }]}>
          HB+ Tech & Ops Team
        </Text>
        <Text style={[styles.teamCount, { fontSize: font(11) }]}>
          18 / 20 Online
        </Text>
      </View>
      <Text style={[styles.teamSub, { fontSize: font(12) }]}>
        Team standup scheduled at 11:30 AM via Google Meet
      </Text>
      <View style={styles.teamActionBar}>
        <TouchableOpacity
          style={[styles.primaryActionBtn, { height: moderateScale(42) }, theme.web.cursorPointer]}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PlusIcon size={12} color="#FFFFFF" />
            <Text style={[styles.primaryActionBtnText, { fontSize: font(13), marginLeft: 6 }]}>
              Create Task
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.secondaryActionBtn, { height: moderateScale(42) }, theme.web.cursorPointer]}
          activeOpacity={0.7}
        >
          <Text style={[styles.secondaryActionBtnText, { fontSize: font(13) }]}>
            Team Roster
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render Priority Tasks
  const renderTaskList = () => (
    <View style={styles.taskListWrapper}>
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { fontSize: font(12) }]}>
          TODAY'S PRIORITY TASKS
        </Text>
        <Text style={[styles.sectionSub, { fontSize: font(11) }]}>
          Tap to toggle status
        </Text>
      </View>

      <View style={styles.taskListContainer}>
        {tasks.map(task => {
          const isDone = task.status === 'Completed';
          const isPriorityHigh = task.priority === 'High';

          return (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.taskCard,
                isDone && styles.taskCardDone,
                theme.web.cursorPointer,
              ]}
              onPress={() => toggleTaskStatus(task.id)}
              activeOpacity={0.7}
            >
              <View style={styles.taskLeftSection}>
                <View style={[styles.checkbox, isDone && styles.checkboxDone]}>
                  {isDone ? <CheckIcon size={12} color="#FFFFFF" /> : null}
                </View>
                <View style={styles.taskInfo}>
                  <Text
                    style={[
                      styles.taskTitle,
                      { fontSize: font(13), lineHeight: font(18) },
                      isDone && styles.taskTitleDone,
                    ]}
                    numberOfLines={2}
                  >
                    {task.title}
                  </Text>
                  <View style={styles.taskMetaRow}>
                    <Text style={[styles.taskCategory, { fontSize: font(11) }]}>
                      {task.category}
                    </Text>
                    <Text style={styles.metaDot}>•</Text>
                    <ClockIcon size={11} color="#858585" />
                    <Text style={[styles.taskDueTime, { fontSize: font(11), marginLeft: 4 }]}>
                      {task.dueTime}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.priorityBadge,
                  isPriorityHigh ? styles.priorityHigh : styles.priorityMedium,
                  isDone && styles.priorityDone,
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    { fontSize: font(10) },
                    isPriorityHigh ? styles.priorityTextHigh : styles.priorityTextMedium,
                    isDone && styles.priorityTextDone,
                  ]}
                >
                  {task.status}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { padding: containerPadding }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.maxContainer}>
        {/* Top Welcome Banner */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Image
                source={require('../../assets/images/hbplus-logo.png')}
                style={{
                  width: moderateScale(26),
                  height: moderateScale(26),
                  marginRight: 8,
                  resizeMode: 'contain',
                }}
              />
              <Image
                source={require('../../assets/images/hbplus-wordmark.png')}
                style={[
                  styles.brandWordmark,
                  { width: moderateScale(95), height: moderateScale(22), marginBottom: 0 },
                ]}
              />
            </View>
            <Text style={[styles.greetingText, { fontSize: font(11) }]}>
              WORKPLACE PORTAL
            </Text>
            <Text
              style={[
                styles.userNameText,
                { fontSize: font(isDesktop ? 26 : 22) },
              ]}
              numberOfLines={1}
            >
              {userName}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.greenDot} />
            <Text style={[styles.statusText, { fontSize: font(11) }]}>
              On Duty • HB+
            </Text>
          </View>
        </View>

        {/* Responsive Employee Quick Stats Grid */}
        <View
          style={[
            styles.statsRow,
            isSmallScreen && styles.statsRowWrap,
          ]}
        >
          <View style={[styles.statCard, isSmallScreen && styles.statCardHalf]}>
            <Text style={[styles.statLabel, { fontSize: font(9) }]}>ASSIGNED</Text>
            <Text style={[styles.statValue, { fontSize: font(20) }]}>{tasks.length}</Text>
            <Text style={[styles.statSub, { fontSize: font(10) }]}>Total Tasks</Text>
          </View>

          <View style={[styles.statCard, isSmallScreen && styles.statCardHalf]}>
            <Text style={[styles.statLabel, { color: '#2563EB', fontSize: font(9) }]}>
              ACTIVE
            </Text>
            <Text style={[styles.statValue, { color: '#2563EB', fontSize: font(20) }]}>
              {inProgressCount}
            </Text>
            <Text style={[styles.statSub, { fontSize: font(10) }]}>In Progress</Text>
          </View>

          <View style={[styles.statCard, isSmallScreen && styles.statCardHalf]}>
            <Text style={[styles.statLabel, { color: '#16A34A', fontSize: font(9) }]}>
              DONE
            </Text>
            <Text style={[styles.statValue, { color: '#16A34A', fontSize: font(20) }]}>
              {completedCount}
            </Text>
            <Text style={[styles.statSub, { fontSize: font(10) }]}>Completed</Text>
          </View>

          <View style={[styles.statCard, isSmallScreen && styles.statCardHalf]}>
            <Text style={[styles.statLabel, { color: '#D97706', fontSize: font(9) }]}>
              QUEUE
            </Text>
            <Text style={[styles.statValue, { color: '#D97706', fontSize: font(20) }]}>
              {pendingCount}
            </Text>
            <Text style={[styles.statSub, { fontSize: font(10) }]}>Pending</Text>
          </View>
        </View>

        {/* On Web/Desktop: Two-Column Responsive Split */}
        {isDesktop ? (
          <View style={styles.desktopColumnsRow}>
            {/* Left Column: Tasks */}
            <View style={styles.desktopLeftCol}>
              {renderTaskList()}
            </View>

            {/* Right Column: Velocity & Team */}
            <View style={styles.desktopRightCol}>
              {renderVelocityCard()}
              {renderTeamCard()}
            </View>
          </View>
        ) : (
          /* On Mobile/Tablet: Stacked */
          <>
            {renderVelocityCard()}
            {renderTaskList()}
            {renderTeamCard()}
          </>
        )}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
    marginRight: 10,
  },
  brandWordmark: {
    resizeMode: 'contain',
    marginBottom: 8,
  },
  greetingText: {
    color: '#2563EB',
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  userNameText: {
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginRight: 6,
  },
  statusText: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statsRowWrap: {
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    minWidth: 70,
  },
  statCardHalf: {
    flexBasis: '48%',
    flexGrow: 1,
    marginBottom: 8,
  },
  statLabel: {
    fontWeight: '700',
    color: '#858585',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  statSub: {
    color: '#858585',
  },
  desktopColumnsRow: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'flex-start',
  },
  desktopLeftCol: {
    flex: 1.25,
  },
  desktopRightCol: {
    flex: 0.95,
  },
  progressCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  progressSubtitle: {
    color: '#858585',
    marginTop: 2,
  },
  progressBadge: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressBadgeText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  taskListWrapper: {
    marginBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: 0.8,
  },
  sectionSub: {
    color: '#858585',
  },
  taskListContainer: {
    marginBottom: 6,
  },
  taskCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskCardDone: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    opacity: 0.75,
  },
  taskLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#858585',
  },
  taskMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCategory: {
    color: '#64748B',
    fontWeight: '500',
  },
  metaDot: {
    marginHorizontal: 6,
    color: '#CBD5E1',
    fontSize: 10,
  },
  taskDueTime: {
    color: '#858585',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityHigh: {
    backgroundColor: '#EFF6FF',
  },
  priorityMedium: {
    backgroundColor: '#FEF3C7',
  },
  priorityDone: {
    backgroundColor: '#F1F5F9',
  },
  priorityText: {
    fontWeight: '700',
  },
  priorityTextHigh: {
    color: '#2563EB',
  },
  priorityTextMedium: {
    color: '#B45309',
  },
  priorityTextDone: {
    color: '#64748B',
  },
  teamCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  teamHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  teamTitle: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  teamCount: {
    fontWeight: '600',
    color: '#16A34A',
  },
  teamSub: {
    color: '#64748B',
    marginBottom: 14,
  },
  teamActionBar: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryActionBtn: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryActionBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryActionBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryActionBtnText: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
});
