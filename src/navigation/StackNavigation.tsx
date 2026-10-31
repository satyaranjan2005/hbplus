import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigation from './TabNavigation';
import type { RootStackParamList } from '../types/navigation';
import { subscribeToAuthChanges, getCurrentUser } from '../services/firebase/auth';
import { signOutGoogle } from '../services/firebase/googleSignIn';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = subscribeToAuthChanges(async (currentUser) => {
      try {
        if (currentUser) {
          const email = currentUser.email?.toLowerCase().trim() || '';
          if (!email.endsWith('@silicon.ac.in')) {
            await signOutGoogle();
            if (isMounted) setUser(null);
            if (isMounted && initializing) setInitializing(false);
            return;
          }
        }
        if (isMounted) setUser(currentUser);
      } catch (err) {
        console.error('[StackNavigation] Auth state change error:', err);
      } finally {
        if (isMounted && initializing) {
          setInitializing(false);
        }
      }
    });

    // Timeout safety fallback: don't leave the user hanging if network stalls
    const timeoutTimer = setTimeout(() => {
      if (isMounted && initializing) {
        setInitializing(false);
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutTimer);
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [initializing]);

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Dashboard' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={TabNavigation} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
