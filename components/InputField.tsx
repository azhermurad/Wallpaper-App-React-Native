import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { FC, forwardRef, Ref } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
{
    /* <Feather name="lock" size={24} color="black" /> */
}

interface InputFieldProps {
    name: string;
    iconName: string;
    placeholder: string;
    value: string;
    secureTextEntry?: boolean;
    valueHandler(value: string, name: string): void;
}

const icons: any = {
    email: <Fontisto name='email' size={20} color='#ccc' />,
    lock: <Feather name='lock' size={20} color='#ccc' />,
};
const InputField = (
    {
        placeholder,
        secureTextEntry,
        iconName,
        value,
        valueHandler,
        name,
    }: InputFieldProps,
    ref: Ref<TextInput>
) => {
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                {icons[iconName]}
                <TextInput
                    onChangeText={(value) => {
                        valueHandler(value, name);
                    }}
                    value={value}
                    ref={ref}
                    placeholder={placeholder}
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    );
};

export default forwardRef(InputField);

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
    },
    input: {
        paddingHorizontal: 10,
        flex: 1,
    },
});
