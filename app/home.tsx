import {
    View,
    Text,
    Button,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { hp } from '../util/responseUnit';
import Header from '../components/home/Header';
import SearchInput from '../components/SearchInput';
import { useRef, useState } from 'react';

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef();

    const clearQuery = () => {
        setSearchQuery('');
    };

    // output  searchInputRef.current = A

    /// output searchQuery  = ''

    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <ScrollView
                contentContainerStyle={{
                    gap: 15,
                }}
            >
                <SearchInput
                    isSearchValue={!!searchQuery}
                    searchValue={searchQuery}
                    onTextChange={setSearchQuery}
                    clearQuery={clearQuery}
                    placeholder='Search For Photos'
                />
                <Text>sub container of the home page</Text>
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
});

// useCallback hook what is this?
