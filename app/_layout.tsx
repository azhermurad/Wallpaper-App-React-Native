import { Stack } from 'expo-router';

const MainLayout = () => {
    return <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name='index' options={{navigationBarHidden: true,navigationBarColor:"transparent"}}/>
    </Stack>;
};

export default MainLayout;