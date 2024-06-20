import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Intro from '@/components/Intro';

const index = () => {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Intro />
            <StatusBar style='auto' />
        </View>
    );
};

export default index;
