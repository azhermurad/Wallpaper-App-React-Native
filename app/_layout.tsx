import { Slot, useRouter, useSegments } from 'expo-router';
import AuthProvider, { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

export default function Root() {
    return (
        <AuthProvider>
            <Layout />
        </AuthProvider>
    );
}

function Layout() {
    const { isAuthanticated } = useAuth();
    const router = useRouter();
    const segments = useSegments();
    const appGroup = segments[0] == '(app)';
    useEffect(() => {
        console.log('use', isAuthanticated, segments);
        if (isAuthanticated && !appGroup) {
            router.replace('/home');
        } else if (isAuthanticated == false) {
            router.replace('intro');
        }
    }, [isAuthanticated]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name='(app)/home'
                    options={{
                        // Set the presentation mode to modal for our modal route.
                        headerShown: false,
                        presentation: 'modal',
                    }}
                />

                <Stack.Screen
                    name='index'
                    options={{
                        navigationBarHidden: true,
                        navigationBarColor: 'transparent',
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name='(app)/imageDetail'
                    options={{
                        // Set the presentation mode to modal for our modal route.
                        headerShown: false,
                        presentation: 'transparentModal',
                    }}
                />

                <Stack.Screen
                    name='login'
                    options={{
                        // Set the presentation mode to modal for our modal route.
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='intro'
                    options={{
                        // Set the presentation mode to modal for our modal route.
                        headerShown: false,
                        navigationBarHidden: true,
                        navigationBarColor: 'transparent',
                    }}
                />
            </Stack>
            {/* content */}
        </GestureHandlerRootView>
    );
}
