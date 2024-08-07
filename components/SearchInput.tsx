import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { wp, hp } from '../util/responseUnit';
import { ForwardedRef, Ref, forwardRef, useState } from 'react';

interface ISearchInput {
    searchValue: string;
    onTextChange(text: string): void;
    clearQuery(): void;
    placeholder: string;
    isSearchValue: boolean;
}

const SearchInput = forwardRef(
    (
        {
            searchValue,
            onTextChange,
            clearQuery,
            placeholder,
            isSearchValue,
        }: ISearchInput,
        ref: Ref<TextInput>
    ) => {
        const [inputStyle, setInputStyle] = useState({});

        return (
            <View style={[styles.searchConatiner, inputStyle]}>
                <View style={styles.searchIcon}>
                    <Ionicons name='search-outline' size={26} color='black' />
                </View>
                <TextInput
                    value={searchValue}
                    style={[styles.textInput]}
                    placeholder={placeholder}
                    keyboardType='twitter'
                    placeholderTextColor='#888'
                    onChangeText={onTextChange}
                    ref={ref}
                    onFocus={() => {
                        setInputStyle({ borderColor: 'black', borderWidth: 2 });
                    }}
                    onBlur={() => {
                        setInputStyle({});
                    }}
                />

                {isSearchValue && (
                    <Pressable style={styles.closeIcon} onPress={clearQuery}>
                        <Ionicons name='close' size={26} color='white' />
                    </Pressable>
                )}
            </View>
        );
    }
);

export default SearchInput;

const styles = StyleSheet.create({
    searchConatiner: {
        marginHorizontal: wp(2),
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#ccc',
        alignItems: 'center',
        padding: 5,

        borderRadius: 10,
        backgroundColor: 'white',
    },
    searchIcon: {
        padding: 6,
    },
    textInput: {
        fontSize: hp(2),
        flex: 1,
        fontWeight: '400',
        paddingHorizontal: 10,
    },
    closeIcon: {
        backgroundColor: 'black',
        padding: 6,
        borderRadius: 10,
    },
});
