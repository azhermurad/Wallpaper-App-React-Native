import Animated, {
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1]),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: 'rgba(0,0,0,0.8)',
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return (
        <Animated.View style={containerStyle}>
            <BlurView
                intensity={30}
                tint='dark'
                // tint='light'
                style={[StyleSheet.absoluteFill]}
                experimentalBlurMethod='dimezisBlurView'
            ></BlurView>
        </Animated.View>
    );
};

export default CustomBackdrop;
