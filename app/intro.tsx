import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Intro from '@/components/Intro';

const IntroScreen = () => {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Intro />
        </View>
    );
};

export default IntroScreen;

// import React, { useState } from 'react';
// import { View, Button, Image, Text } from 'react-native';
// import * as MediaLibrary from 'expo-media-library';
// import downloadImage, {
//     DownloadImageFunctionProps,
// } from '../util/downloadImage';

// const Index = () => {
//     const [imageUri, setImageUri] = useState(null);
//     const [downloadProgress, setDownloadProgress] = useState(0);
//     const [permissionResponse, requestPermission] =
//         MediaLibrary.usePermissions();

//     const downloadImageHandler = () => {
//         const params: DownloadImageFunctionProps = {
//             imageUrl: 'aa',
//             setDownloadProgress,
//             permissionResponse,
//             requestPermission,
//             setImageUri,
//         };
//         downloadImage(params);
//     };

//     return (
//         <View
//             style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//         >
//             <Button title='Download Image' onPress={downloadImageHandler} />
//             {downloadProgress > 0 && downloadProgress < 1 && (
//                 <Text>Downloading: {(downloadProgress * 100).toFixed(2)}%</Text>
//             )}
//             {imageUri && (
//                 <Image
//                     source={{ uri: imageUri }}
//                     style={{ width: 200, height: 200, marginTop: 20 }}
//                 />
//             )}
//         </View>
//     );
// };

// export default Index;
