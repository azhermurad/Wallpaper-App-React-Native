import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    View,
    Text,
    Pressable,
} from 'react-native';
import React from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { ImageReturn } from '../app/(app)/home';
import { wp } from '../util/responseUnit';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

interface IMasonaryP {
    image: ImageReturn[] | null;
    isLoading: boolean;
}

export interface DetailImage {
    height: number;
    id: string;
    photographer_url: string;
    src: {
        large: string;
    };
    width: string;
}
const WIDTH = Dimensions.get('window').width / 2 - 5;

export const calculateHeight = (width: any, height: any) => {
    const aspectRatio = height / width;
    return WIDTH * aspectRatio;
};

const MasonaryList: React.FC<IMasonaryP> = ({ image, isLoading }) => {
    const router = useRouter();

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator style={{ margin: 10 }} />;
    };

    return (
        <MasonryFlashList
            data={image as any}
            numColumns={2}
            contentContainerStyle={styles.contentContainerStyle}
            // onEndReachedThreshold={0.5}
            // onEndReached={() => {
            //     // onEndRe
            //     console.log('onloading more function is callieng from bottom');
            // }}
            ListEmptyComponent={() => <Text>No Imges Found!</Text>}
            ListFooterComponent={renderFooter}
            renderItem={({
                item,
                index,
            }: {
                item: ImageReturn;
                index: number;
            }) => {
                return (
                    <Animated.View
                        entering={FadeInDown.delay(index * 10)
                            .damping(30)
                            .springify()}
                        style={[
                            {
                                marginLeft: (index + 1) % 2 == 0 ? 3 : 0,
                            },
                            styles.imageContainer,
                        ]}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                right: 7,
                                top: 7,
                                height: 30,
                                width: 30,
                                zIndex: 1,
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                                elevation: 4,
                            }}
                        >
                            <Feather name='heart' size={18} color='white' />
                        </View>
                        <Pressable
                            onPress={() => {
                                router.push({
                                    pathname: 'imageDetail',
                                    params: {
                                        ...item,
                                        src: item.src.large,
                                    } as any,
                                });
                            }}
                        >
                            <Image
                                style={[
                                    styles.imageStyle,
                                    {
                                        height: calculateHeight(
                                            item.width,
                                            item.height
                                        ),
                                    },
                                ]}
                                source={item.src.large}
                                contentFit='cover'
                            />
                        </Pressable>
                    </Animated.View>
                );
            }}
            estimatedItemSize={200}
        />
    );
};

export default MasonaryList;

const styles = StyleSheet.create({
    contentContainerStyle: {
        paddingHorizontal: wp(3),
    },
    imageContainer: {
        marginBottom: 3,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    imageStyle: {
        width: '100%',
    },
});
