import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { wp } from '../util/responseUnit';
import CatagoryItem from './CategoryItem';

const DATA = ['Nature', 'Ocean', 'Tigers', 'Computer', 'Pears', 'Montains'];

// nVLKnD8axHxA5eGQwIlsHbIdMyQFHoRiOB9ddItisSMk4Vt1VYqjxLIL
const Catagory = () => {
    const [activeCategory, setCategory] = useState<number | null>(null);

    const handleActiveCategoy = (index: number) => {
        setCategory(index);
    };

    return (
        <FlatList
            horizontal
            data={DATA}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item, index }) => {
                return (
                    <CatagoryItem
                        title={item}
                        handleActiveCategoy={handleActiveCategoy}
                        index={index}
                        activeCategory={activeCategory}
                    />
                );
            }}
            keyExtractor={(__, index) => index + 'indexkey'}
        />
    );
};

const styles = StyleSheet.create({
    contentContainerStyle: {
        columnGap: wp(2),
    },
});

export default Catagory;
