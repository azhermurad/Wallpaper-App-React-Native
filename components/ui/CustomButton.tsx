import {
    View,
    Text,
    TouchableOpacity,
    TextProps,
    StyleSheet,
} from 'react-native';
import React from 'react';
import { hp } from '@/util/responseUnit';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants';

type IPrpos = {
    title: string;
    backgroundColor?: string;
    color?: string;
    iconName?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    iconSize?: number;
    IconShow?: boolean;
    onpress: () => void;
};

const CustomButton = ({
    title,
    iconName = 'arrow-forward-circle-outline',
    iconColor = 'white',
    IconShow = true,
    iconSize = 25,
    onpress,
    backgroundColor = 'orange',
}: IPrpos) => {
    return (
        <View style={styles.button}>
            <TouchableOpacity
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: backgroundColor,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 3,
                }}
                onPress={onpress}
            >
                <Text style={styles.text}>{title}</Text>

                {IconShow && (
                    <Ionicons
                        style={{ fontWeight: 'bold' }}
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 3,
        // borderWidth: 4,
        // borderColor: Colors.skyBlue100,
    },
    text: {
        color: '#FFFFFF',
        fontSize: hp(3),
        fontWeight: 'bold',
        marginRight: 10,
        textTransform: 'capitalize',
    },
});

export default CustomButton;
