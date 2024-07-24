// now we have to create bottom sheet in this file

import React, { useCallback, useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';

import CustomBackdrop from './CustomBackdrop';
import FilterView from './FilterView';
import { hp, wp } from '../../util/responseUnit';
import AntDesign from '@expo/vector-icons/AntDesign';

interface IProps {
    bottomSheetModalRef: React.RefObject<BottomSheetModal>;
    filterHandler(search: string): void;
}

const BottomSheetModel: React.FC<IProps> = ({
    bottomSheetModalRef,
    filterHandler,
}) => {
    // variables
    const snapPoints = useMemo(() => ['75%'], []);

    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
    });

    const closeModelHandler = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                enableDismissOnClose={true}
                // enableOverDrag={false}
                // activeOffsetX={[-999, 999]}
                // activeOffsetY={[-5, 5]}
                onDismiss={() => {
                    // Ensure modal is marked as closed
                    console.log('Modal dismissed');
                }}
                ref={bottomSheetModalRef}
                index={0}
                backdropComponent={CustomBackdrop}
                snapPoints={snapPoints}
                // animationConfigs={animationConfigs}
                detached={true}
                style={{ width: wp(100) }}
                enablePanDownToClose={true}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <AntDesign
                        style={styles.closecircle}
                        name='closecircle'
                        size={32}
                        color='black'
                        onPress={closeModelHandler}
                    />
                    <Text style={styles.title}>Filters</Text>
                    <FilterView filterHandler={filterHandler} />
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: wp(2),
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    closecircle: {
        position: 'absolute',
        right: 30,
        top: -4,
    },
});
export default BottomSheetModel;
