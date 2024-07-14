import { Stack } from 'expo-router';

const MainLayout = () => {
    return (
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
    );
};

export default MainLayout;
