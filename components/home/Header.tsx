import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { hp, wp } from '../../util/responseUnit';

const Header = () => {
    return (
        <>
            <View style={styles.container}>
                <Pressable
                    onPress={() => {
                        Alert.alert('button is pressed!!');
                    }}
                >
                    <Text style={styles.title}>Company</Text>
                </Pressable>
                <Pressable android_ripple={{ color: 'tranparenet' }}>
                    <Ionicons name='filter' size={30} color='black' />
                </Pressable>
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
});

// interface in typescrpt
