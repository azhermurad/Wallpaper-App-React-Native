import { View, Text, Dimensions, Button, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CustomButton from './ui/CustomButton';

const Intro = () => {
    const { width, height } = Dimensions.get('screen'); 
    return (
        <ImageBackground
            source={require('../assets/images/into.jpg')}
            style={{
                width: width,
                height: height,
            }}
            resizeMode='cover'
        >
            <LinearGradient
                // Button Linear Gradient
                style={{
                    width: width,
                    height: height,
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
                colors={['transparent', 'black']}
                start={{ x: 0.1, y: 0.9 }}
            >
                <Animated.View
                    entering={FadeInDown.duration(400).springify().damping(20)}
                    style={{
                        position: 'absolute',
                        width: '90%',
                        marginBottom:30
                    }}
                >
                    <CustomButton onpress={() => {}} title="let's explorer" />
                </Animated.View>
            </LinearGradient>
        </ImageBackground>
    );
};

export default Intro;
