import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { FC, forwardRef, Ref } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
{
    /* <Feather name="lock" size={24} color="black" /> */
}

interface InputFieldProps {
    iconName: string;
    placeholder: string;
    secureTextEntry: boolean;
}

const icons: any = {
    email: <Fontisto name='email' size={25} color='#ccc' />,
    lock: <Feather name='lock' size={24} color='#ccc' />,
};
const InputField = (
    { placeholder, secureTextEntry, iconName }: InputFieldProps,
    ref: Ref<TextInput>
) => {
    let icon: React.JSX.Element;
    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                {icons[iconName]}
                <TextInput
                    ref={ref}
                    placeholder={placeholder}
                    style={styles.email}
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
        padding: 15,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    email: {
        paddingHorizontal: 10,
        flex: 1,
    },
});
