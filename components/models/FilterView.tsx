import React, { FC, useCallback, useState } from 'react';
import { SectionList, Text, View, StyleSheet, FlatList } from 'react-native';
import { hp, wp } from '../../util/responseUnit';
import { FILTERDATA } from '../../constants';
import FilterItem from './FilterItem';
import PickerColor from '../ColorPicker';
import CustomButton from '../ui/CustomButton';

export interface FilterData {
    Order?: { header: string; title: string };
    Orientation?: { header: string; title: string };
    Size?: { header: string; title: string };
}

interface IProps {
    filterHandler(search: string): void;
}
const FilterView: FC<IProps> = ({ filterHandler }) => {
    const [filterData, setFilterData] = useState<FilterData>({});

    const handleFilter = useCallback(
        (headerTitle: string, title: string) => {
            setFilterData((prevState) => {
                return {
                    ...prevState,
                    [headerTitle]: { header: headerTitle, title: title },
                };
            });
        },
        [filterData]
    );

    const resetFilterData = useCallback(
        (data?: FilterData) => {
            if (data) {
                console.log('res', data);
                setFilterData({ ...data });
                return;
            }
            setFilterData({});
        },
        [filterData]
    );

    const fetchFilterDataHandler = () => {
        let search: string[] = [];
        Object.values(filterData).forEach((item) => {
            let query = `${item.header.toLocaleLowerCase()}=${item.title}`;
            search.push(query);
        });
        filterHandler(search.join('&'));
    };

    return (
        <>
            <SectionList
                sections={FILTERDATA}
                keyExtractor={(item, index) => item + index}
                renderItem={() => null}
                renderSectionHeader={({ section: { title, data } }) => (
                    <View style={styles.sectionContainer}>
                        <Text style={styles.header}>{title}</Text>
                        {title == 'Colors' ? (
                            <PickerColor
                                onColorSelect={(color: string) => {
                                    handleFilter('Color', color);
                                }}
                            />
                        ) : (
                            <FlatList
                                data={data}
                                horizontal // Enable horizontal scrolling
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    columnGap: wp(3),
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <FilterItem
                                            headerTitle={title}
                                            title={item}
                                            handleActiveCategoy={handleFilter}
                                            index={index}
                                            filterData={filterData}
                                            resetFilterData={resetFilterData}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index) => item + index}
                            />
                        )}
                    </View>
                )}
            />
            <View
                style={{
                    width: wp(50),
                    alignSelf: 'center',
                    marginVertical: hp(3),
                }}
            >
                <CustomButton
                    IconShow={false}
                    backgroundColor='black'
                    title='Apply'
                    onpress={fetchFilterDataHandler}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },

    header: {
        fontSize: 20,
        backgroundColor: '#fff',
        paddingTop: hp(1),
        alignSelf: 'flex-start',
        borderBottomWidth: 3,
        borderBottomColor: 'orange',
        marginBottom: hp(1),
    },
});

export default FilterView;
