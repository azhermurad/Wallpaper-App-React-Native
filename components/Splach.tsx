import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { View } from 'react-native';

interface ISplash {
    onFinish(isCancelled: boolean): void;
}
const Splach = ({ onFinish }: ISplash) => {
    const animation = useRef<LottieView>(null);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
            }}
        >
            <LottieView
                ref={animation}
                autoPlay
                onAnimationFinish={onFinish}
                loop={false}
                style={{
                    width: 300,
                    height: 300,
                    backgroundColor: 'white',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../assets/loading.json')}
            />
        </View>
    );
};

export default Splach;
