import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/dashboard/HomeScreen';
import AnalyticsScreen from '../screens/dashboard/AnalyticsScreen';
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import type { DashboardTabParamList } from '../types/navigation';
import { useResponsive } from '../theme';
import {
  BriefcaseIcon,
  ChartIcon,
  SettingsIcon,
  UserIcon,
} from '../components/Icons';

const Tab = createBottomTabNavigator<DashboardTabParamList>();

export default function TabNavigation() {
  const insets = useSafeAreaInsets();
  const { font, isTablet, isDesktop } = useResponsive();

  const bottomInset = Math.max(Platform.OS === 'android' ? 6 : 8, insets.bottom);
  const tabHeight = (isDesktop ? 60 : 54) + bottomInset;

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: isDesktop ? 'left' : 'center',
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
          height: isDesktop ? 68 : isTablet ? 64 : undefined,
          paddingHorizontal: isDesktop ? 24 : undefined,
        },
        headerTitleStyle: {
          color: '#1A1A1A',
          fontWeight: '700',
          fontSize: font(isTablet ? 20 : 18),
          letterSpacing: -0.3,
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: tabHeight,
          paddingBottom: bottomInset,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#858585',
        tabBarLabelStyle: {
          fontSize: font(11),
          fontWeight: '600',
          letterSpacing: 0.2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Employee Workspace',
          tabBarLabel: 'Overview',
          tabBarIcon: ({ color }) => <BriefcaseIcon size={font(20)} color={color} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Task & Team Analytics',
          tabBarLabel: 'Tasks & KPIs',
          tabBarIcon: ({ color }) => <ChartIcon size={font(20)} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Employee Profile',
          tabBarLabel: 'Employee',
          tabBarIcon: ({ color }) => <UserIcon size={font(20)} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Workspace Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <SettingsIcon size={font(20)} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
