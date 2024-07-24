import { Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CustomButton from './ui/CustomButton';
import { hp } from '@/util/responseUnit';
import { Colors } from '@/constants';
import { router } from 'expo-router';

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
                colors={['transparent', 'white']}
                start={{ x: 0.1, y: 0.2 }}
                end={{ x: 0.1, y: 0.9 }}
            >
                <Animated.View
                    entering={FadeInDown.duration(100).springify().damping(20)}
                    style={{
                        position: 'absolute',
                        width: '90%',
                        bottom: hp(5),
                    }}
                >
                    <CustomButton
                        backgroundColor={Colors.skyBlue200}
                        onpress={() => {
                            router.push({
                                pathname: '/home',
                                params: { id: 'azher' },
                            });
                        }}
                        title="let's explorer"
                    />
                </Animated.View>
            </LinearGradient>
        </ImageBackground>
    );
};

export default Intro;
