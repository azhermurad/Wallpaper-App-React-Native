import { Dimensions, ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CustomButton from './ui/CustomButton';
import { hp, wp } from '@/util/responseUnit';
import { Colors } from '@/constants';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Intro = () => {
    const { width } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    console.log(insets);
    return (
        <ImageBackground
            source={require('../assets/images/into.jpg')}
            style={{
                width: width,
                height: '100%',
            }}
            resizeMode='cover'
        >
            <LinearGradient
                // Button Linear Gradient
                style={{
                    width: width,
                    height: '100%',
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
                colors={['transparent', 'white']}
                start={{ x: 0.1, y: 0.2 }}
                end={{ x: 0.1, y: 0.9 }}
            >
                <View
                    style={{
                        width: wp(90),
                        position: 'absolute',
                        borderWidth: 2,
                        borderColor: 'transparent', // Making the border transparent
                        bottom: hp(10),
                    }}
                >
                    <Animated.View
                        entering={FadeInDown.duration(300).springify()}
                    >
                        <CustomButton
                            backgroundColor={Colors.skyBlue200}
                            onpress={() => {
                                router.push({
                                    pathname: '/login',
                                    params: { id: 'azher' },
                                });
                            }}
                            title="let's explorer"
                        />
                    </Animated.View>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};

export default Intro;
