import {
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    RefreshControl,
    Text,
} from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../util/responseUnit';
import Header from '../../components/home/Header';
import SearchInput from '../../components/SearchInput';
import { useCallback, useEffect, useRef, useState } from 'react';
import Catagory from '../../components/Catagory';
import MasonaryList from '../../components/MasonaryList';
import _ from 'lodash';
import { useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetModel from '../../components/models/BottomSheetModel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

export interface ImageReturn {
    id: string;
    src: {
        large: string;
    };
    width: number;
    height: number;
}

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const HomeScreen = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isloading, setLoading] = useState(false);
    const searchInputRef = useRef<TextInput>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [images, setImages] = useState<ImageReturn[] | null>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [showBackIcon, setShowBackIcon] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const [nextPage, setNextPage] = useState(
        'https://api.pexels.com/v1/search?query=nature'
    );

    const clearQuery = () => {
        setSearchQuery('');
    };
    const functionDebounce = useCallback(
        _.debounce((url) => FetchImages(url, true), 500),
        []
    );

    useEffect(() => {
        const queryUrl = `${BASE_URL}?query=${searchQuery}`;
        console.log(queryUrl, 'queryurl for fetch the mimage for the server');

        if (searchQuery) {
            functionDebounce(queryUrl);
            return;
        }
        console.log('hello');
        FetchImages(`${BASE_URL}?query=nature`, true);
    }, [searchQuery]);

    // categoryHander
    const categoryHander = useCallback((activeCategory: null | string) => {
        console.log(activeCategory, 'hellof');
        const query = activeCategory ? activeCategory : 'nature';
        FetchImages(`${BASE_URL}?query=${query}`, true);
    }, []);

    // on Pull refresh data
    const onRefresh = async () => {
        setRefreshing(true);
        await FetchImages(nextPage);
        setRefreshing(false);
    };
    // fetchImage login
    async function FetchImages(url: string, search: boolean = false) {
        console.log(url);
        if (isloading) return; // this will stop to call on on
        try {
            console.log('fetchimage is calling');
            setLoading(true);
            const respose = await axios.get(url, {
                headers: {
                    Authorization: process.env.EXPO_PUBLIC_API_KEY,
                },
            });
            setImages((pre) => {
                if (!pre) {
                    return [...respose.data.photos];
                }
                if (search) {
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

    const filterHandler = useCallback((search: string) => {
        if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }

        FetchImages(`${BASE_URL}?query=all&${search}`, true);
    }, []);

    // Function to scroll back to the top when the icon is pressed
    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header bottomSheetModalRef={bottomSheetModalRef} />

            <ScrollView
                ref={scrollViewRef}
                scrollEventThrottle={16} // Update scroll event frequency
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
                    const offsetY = event.nativeEvent.contentOffset.y;

                    // Set a threshold for showing the back icon (e.g., 100 pixels) move down word
                    setShowBackIcon(offsetY > 100);
                    const isAtAnd =
                        event.nativeEvent.contentOffset.y +
                            event.nativeEvent.layoutMeasurement.height ===
                        event.nativeEvent.contentSize.height;
                    console.log(isAtAnd);
                    if (isAtAnd) {
                        FetchImages(nextPage);
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
                    <Catagory categoryHander={categoryHander} />
                </View>
                <View>
                    {images && (
                        <MasonaryList image={images} isLoading={isloading} />
                    )}
                </View>
            </ScrollView>

            {/* Back icon */}
            {showBackIcon && (
                <TouchableOpacity style={styles.backIcon} onPress={scrollToTop}>
                    <Entypo
                        name='arrow-with-circle-up'
                        size={32}
                        color='black'
                    />
                </TouchableOpacity>
            )}
            <BottomSheetModel
                bottomSheetModalRef={bottomSheetModalRef}
                filterHandler={filterHandler}
            />
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
    backIcon: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 5,
        elevation: 5, // Add shadow for better visibility
    },
});
