import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity,
    Share,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';
import { hp, wp } from '../util/responseUnit';
import { Image } from 'expo-image';
import { AntDesign } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';
import downloadImage, {
    DownloadImageFunctionProps,
} from '../util/downloadImage';

const imageDetail = () => {
    const params = useLocalSearchParams();

    const [imageUri, setImageUri] = useState(null);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [permissionResponse, requestPermission] =
        MediaLibrary.usePermissions();

    console.log(downloadProgress, imageUri);
    const downloadImageHandler = (url: string) => {
        const params: DownloadImageFunctionProps = {
            imageUrl: url,
            setDownloadProgress,
            permissionResponse,
            requestPermission,
            setImageUri,
        };
        downloadImage(params);
    };

    const shareHandler = async () => {
        try {
            const result = await Share.share({
                message: `${params.src}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(
                        'Shared with activity type: ',
                        result.activityType
                    );
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const openLocalImage = async () => {
        if (imageUri) {
            // Use Linking to open the image in the default viewer
            const supported = await Linking.canOpenURL(imageUri);
            if (supported) {
                await Linking.openURL(imageUri);
            } else {
                Alert.alert('Error', 'Cannot open this file!');
            }
        }
    };

    return (
        <Animated.View
            style={styles.container}
            entering={FadeIn.springify().damping(40).duration(500)}
        >
            <BlurView
                intensity={100}
                tint='dark'
                style={styles.blurContainer}
                // experimentalBlurMethod='dimezisBlurView'
            >
                <Image
                    transition={100}
                    style={[
                        {
                            width: wp(93),
                            aspectRatio: 1,
                            borderRadius: wp(2),
                        },
                    ]}
                    source={params.src}
                />
                <View style={styles.controlBox}>
                    <TouchableOpacity
                        onPress={() => {
                            downloadImageHandler(params.src as string);
                        }}
                    >
                        <AntDesign
                            name='clouddownload'
                            size={25}
                            color='white'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareHandler}>
                        <AntDesign name='sharealt' size={25} color='white' />
                    </TouchableOpacity>
                </View>
                {downloadProgress > 0 && downloadProgress < 1 && (
                    <Text style={{ color: 'white' }}>
                        Downloading: {(downloadProgress * 100).toFixed(2)}%
                    </Text>
                )}
                {imageUri && (
                    <TouchableOpacity onPress={openLocalImage}>
                        <Text style={{ color: 'white' }}>
                            Image Downloaded!!!
                        </Text>
                    </TouchableOpacity>
                )}
            </BlurView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    blurContainer: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    text: {
        fontSize: 30,
    },
    controlBox: {
        marginVertical: hp(3),
        flexDirection: 'row',
        columnGap: 10,
    },
});
export default imageDetail;
