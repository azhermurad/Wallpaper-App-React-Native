import { Text, StyleSheet, Pressable, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { wp } from '../../util/responseUnit';
import { FilterData } from './FilterView';

interface ICatagoryItem {
    title: string;
    handleActiveCategoy(headerTitle: string, title: string): void;
    index: number;
    filterData: FilterData | any;
    headerTitle: string;
    resetFilterData(data?: FilterData): void;
}

const FilterItem = ({
    title,
    handleActiveCategoy,
    index,
    filterData,
    headerTitle,
    resetFilterData,
}: ICatagoryItem): React.JSX.Element => {
    return (
        <Animated.View
            entering={FadeInRight.delay(index * 180)
                .damping(30)
                .springify()}
        >
            <Pressable
                style={[
                    styles.itemConatiner,
                    {
                        backgroundColor:
                            filterData[headerTitle]?.title !== title
                                ? 'transparent'
                                : 'black',
                    },
                ]}
                onPress={() => {
                    // handleActiveCategoy(activeCategory == title ? null : title);
                    console.log(filterData[headerTitle]?.title == title);
                    if (filterData[headerTitle]?.title == title) {
                        delete filterData[headerTitle];
                        resetFilterData(filterData);
                        return;
                    }

                    handleActiveCategoy(headerTitle, title);
                }}
            >
                <Text
                    style={[
                        styles.itemTitle,
                        {
                            color:
                                filterData[headerTitle]?.title !== title
                                    ? 'black'
                                    : 'white',
                        },
                    ]}
                >
                    {title}
                </Text>
            </Pressable>
        </Animated.View>
    );
};
export default FilterItem;

const styles = StyleSheet.create({
    itemConatiner: {
        padding: wp(3),
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: wp(3),
    },
    pressed: { opacity: 0.5 },
});
