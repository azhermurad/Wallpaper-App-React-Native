import { View } from 'react-native';
import { ActivityIndicator } from 'react-native';

const intailRouter = () => {
    console.log('initailrouter is running');
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <ActivityIndicator size='large' color='#2F2F31' />
        </View>
    );
};

export default intailRouter;
