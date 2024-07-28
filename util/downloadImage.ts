import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export interface DownloadImageFunctionProps {
    imageUrl: string;
    setDownloadProgress?: React.Dispatch<React.SetStateAction<number>>;
    setImageUri?: React.Dispatch<React.SetStateAction<null>>;
    permissionResponse: MediaLibrary.PermissionResponse | null;
    requestPermission(): Promise<MediaLibrary.PermissionResponse>;
}

const downloadImage = async ({
    setDownloadProgress,
    setImageUri,
    permissionResponse,
    requestPermission,
    imageUrl: url,
}: DownloadImageFunctionProps) => {
    try {
        const imageUrl = url; // Replace with your image URL
        const fileUri = FileSystem.documentDirectory + 'image.jpeg';

        // Create a download resumable object
        const downloadResumable = FileSystem.createDownloadResumable(
            imageUrl,
            fileUri,
            {},
            (progress) => {
                const progressPercent =
                    progress.totalBytesWritten /
                    progress.totalBytesExpectedToWrite;
                if (setDownloadProgress) {
                    setDownloadProgress(progressPercent);
                }
            }
        );

        // Download the image
        const { uri }: any = await downloadResumable.downloadAsync();
        console.log('Finished downloading to ', uri);

        // Save the file to the device's media library

        if (permissionResponse?.status !== 'granted') {
            await requestPermission();
        }
        const asset = await MediaLibrary.createAssetAsync(uri); //  to save images
        const album = await MediaLibrary.getAlbumAsync('wallpaperApp');
        if (!album) {
            await MediaLibrary.createAlbumAsync('wallpaperApp', asset, false);
            return;
        }
        await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
        if (setImageUri) {
            setImageUri(uri);
        }
    } catch (e) {
        console.error('Error downloading image:', e);
    }
};

export default downloadImage;
