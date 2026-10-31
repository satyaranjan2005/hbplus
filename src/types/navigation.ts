import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type DashboardTabParamList = {
  Home: undefined;
  Analytics: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Dashboard: NavigatorScreenParams<DashboardTabParamList> | undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type DashboardTabProps<T extends keyof DashboardTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<DashboardTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
