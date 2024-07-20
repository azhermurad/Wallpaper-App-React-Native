import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    RefreshControl,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../util/responseUnit';
import Header from '../components/home/Header';
import SearchInput from '../components/SearchInput';
import { useEffect, useRef, useState } from 'react';
import Catagory from '../components/Catagory';
import MasonaryList from '../components/MasonaryList';

export interface ImageReturn {
    id: string;
    src: {
        large: string;
    };
    width: number;
    height: number;
}

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isloading, setLoading] = useState(false);
    const searchInputRef = useRef<TextInput>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [images, setImages] = useState<ImageReturn[] | null>(null);
    const [nextPage, setNextPage] = useState(
        'https://api.pexels.com/v1/search?query=nature&per_page=15'
    );

    const clearQuery = () => {
        setSearchQuery('');
    };
    // FETCHING IMAGES FROM
    useEffect(() => {
        FetchImages();
    }, []);

    const onRefresh = async () => {
        console.log('called');
        setRefreshing(true);
        // fetch data
        await FetchImages();
        setRefreshing(false);
    };

    async function FetchImages() {
        if (isloading) return; // this will stop to call on on
        try {
            console.log('fetchimage is calling');
            setLoading(true);
            const respose = await axios.get(nextPage, {
                headers: {
                    Authorization: process.env.EXPO_PUBLIC_API_KEY,
                },
            });
            setImages((pre) => {
                if (!pre) {
                    return [...respose.data.photos];
                }
                return [...pre, ...respose.data.photos];
            });
            setNextPage(respose.data.next_page);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        colors={['white']}
                        progressBackgroundColor={'gray'}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        // progressViewOffset={150}
                    />
                }
                contentContainerStyle={{
                    gap: 15,
                }}
                onScroll={(event) => {
                    const isAtAnd =
                        event.nativeEvent.contentOffset.y +
                            event.nativeEvent.layoutMeasurement.height ===
                        event.nativeEvent.contentSize.height;

                    if (isAtAnd) {
                        FetchImages();
                        return;
                    }
                }}
            >
                <SearchInput
                    isSearchValue={!!searchQuery}
                    searchValue={searchQuery}
                    onTextChange={setSearchQuery}
                    clearQuery={clearQuery}
                    placeholder='Search For Photos'
                    ref={searchInputRef}
                />
                <View style={styles.horizontalSpace}>
                    <Catagory />
                </View>
                <View>
                    {images && (
                        <MasonaryList image={images} isLoading={isloading} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: hp(1),
    },
    horizontalSpace: {
        marginHorizontal: wp(3),
    },
});
