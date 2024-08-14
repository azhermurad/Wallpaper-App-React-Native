import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/responseUnit';
import { FC, forwardRef, useCallback } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Entypo from '@expo/vector-icons/Entypo';
import { auth } from '../../firebaseConfig';

interface IHeader {
    bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}
const Header: FC<IHeader> = ({ bottomSheetModalRef }) => {
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const sigoutHandler = () => {
        auth.signOut();
    };
    return (
        <>
            <View style={styles.container}>
                <Pressable
                    onPress={() => {
                        Alert.alert('button is pressed!!');
                    }}
                >
                    <Text style={styles.title}>WallPaper</Text>
                </Pressable>
                <View style={styles.iconContainer}>
                    <Pressable
                        android_ripple={{ color: 'tranparenet' }}
                        onPress={handlePresentModalPress}
                    >
                        <Ionicons name='filter' size={30} color='black' />
                    </Pressable>
                    <Pressable
                        style={{
                            marginLeft: 10,
                            borderRadius: 10,
                            overflow: 'hidden',
                        }}
                        android_ripple={{ color: 'tranparenet' }}
                        onPress={sigoutHandler}
                    >
                        <Entypo name='log-out' size={25} color='black' />
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(2),
        paddingBottom: hp(3),
    },
    title: {
        fontSize: hp(3),
        fontWeight: '700',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

// interface in typescrpt
