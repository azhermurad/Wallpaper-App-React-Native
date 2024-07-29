import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';

const InputField = () => {
    return (
        <View>
            <Text>InputField</Text>
            <View>
                <Fontisto name='email' size={24} color='black' />
                <TextInput
                    placeholder='Enter your email'
                    style={styles.email}
                />
            </View>
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    email: {
        borderWidth: 1,
        borderColor: 'black',
    },
});
