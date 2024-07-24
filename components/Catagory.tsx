import { FlatList, StyleSheet } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { wp } from '../util/responseUnit';
import CatagoryItem from './CategoryItem';

export const DATA = [
    'Nature',
    'Ocean',
    'Tigers',
    'Computer',
    'Pears',
    'Montains',
];
interface ICatagory {
    categoryHander(activeCategory: string | null): void;
}

// nVLKnD8axHxA5eGQwIlsHbIdMyQFHoRiOB9ddItisSMk4Vt1VYqjxLIL
const Catagory: FC<ICatagory> = ({ categoryHander }) => {
    const [activeCategory, setCategory] = useState<string | null>(null);

    const handleActiveCategoy = useCallback((title: string) => {
        console.log(title);
        setCategory(title);
        categoryHander(title);
    }, []);

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
