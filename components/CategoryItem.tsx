import { Text, StyleSheet, Pressable, View } from 'react-native';
import { wp } from '../util/responseUnit';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface ICatagoryItem {
    title: string;
    handleActiveCategoy(title: string | null): void;
    index: number;
    activeCategory: null | string;
}

const CatagoryItem = ({
    title,
    handleActiveCategoy,
    index,
    activeCategory,
}: ICatagoryItem): React.JSX.Element => {
    return (
        <Animated.View
            entering={FadeInRight.delay(index * 180)
                .damping(30)
                .springify()}
        >
            <Pressable
                style={[
                    styles.itemConatiner,
                    {
                        backgroundColor:
                            activeCategory !== title ? 'transparent' : 'black',
                    },
                ]}
                onPress={() => {
                    handleActiveCategoy(activeCategory == title ? null : title);
                }}
            >
                <Text
                    style={[
                        styles.itemTitle,
                        {
                            color: activeCategory !== title ? 'black' : 'white',
                        },
                    ]}
                >
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    );
};
export default CatagoryItem;

const styles = StyleSheet.create({
    itemConatiner: {
        padding: wp(3),
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: wp(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        color: 'black',
        fontWeight: 'bold',
    },
    pressed: { opacity: 0.5 },
});
