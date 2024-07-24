import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    View,
    Text,
} from 'react-native';
import React from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { ImageReturn } from '../app/home';
import { wp } from '../util/responseUnit';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Feather from '@expo/vector-icons/Feather';

interface IMasonaryP {
    image: ImageReturn[] | null;
    isLoading: boolean;
}
const WIDTH = Dimensions.get('window').width / 2 - 5;

const calculateHeight = (width: any, height: any) => {
    const aspectRatio = height / width;
    return WIDTH * aspectRatio;
};

const MasonaryList: React.FC<IMasonaryP> = ({ image, isLoading }) => {
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
                                right: -2,
                                top: -2,
                                height: 30,
                                width: 30,
                                zIndex: 10,
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottomLeftRadius: 10,
                            }}
                        >
                            <Feather name='heart' size={20} color='white' />
                        </View>
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
