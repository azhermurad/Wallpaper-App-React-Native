import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Splach from '../components/Splach';

// Keep the splash screen visible while we fetch resources
const MainLayout = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [animaationFinish, setAnimationFinish] = useState(false);

    const [loaded, error] = useFonts({
        // 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    });

    // Prevent the splash screen from auto-hiding

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
            setAppIsReady(true);
        }
    }, [loaded, error]);

    const handleSplashFinish = useCallback((isCancelled: boolean) => {
        if (!isCancelled) {
            setAnimationFinish(true);
        }
    }, []);

    // if (!appIsReady || !animaationFinish) {
    //     console.log('application is not ready');
    //     return <Splach onFinish={handleSplashFinish} />;
    // }

    if (!appIsReady) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name='index'
                    options={{
                        navigationBarHidden: true,
                        navigationBarColor: 'transparent',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name='home'
                    options={{
                        // Set the presentation mode to modal for our modal route.
                        headerShown: false,
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen
                    name='imageDetail'
                    options={{
                        // Set the presentation mode to modal for our modal route.
                        headerShown: false,
                        presentation: 'transparentModal',
                    }}
                />
            </Stack>
            {/* content */}
        </GestureHandlerRootView>
    );
};

export default MainLayout;
