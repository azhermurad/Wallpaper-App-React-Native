import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MainLayout = () => {
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
            </Stack>
            {/* content */}
        </GestureHandlerRootView>
    );
};

export default MainLayout;
