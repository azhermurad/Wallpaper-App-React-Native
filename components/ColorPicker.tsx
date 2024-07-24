import { View, Text, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import ColorPicker, { Swatches, PreviewText } from 'reanimated-color-picker';
import { wp } from '../util/responseUnit';
import { FILTERCOLORS } from '../constants';

interface IPickColor {
    onColorSelect(color: string): void;
}
const PickerColor: FC<IPickColor> = ({ onColorSelect }) => {
    const [color, setColor] = useState('green');
    return (
        <View style={styles.container}>
            <ColorPicker
                style={styles.colorPickerStyle}
                value={color}
                onComplete={({ hex }) => {
                    setColor(hex);
                    onColorSelect(hex);
                }}
            >
                <Swatches
                    colors={[color]}
                    swatchStyle={[styles.swatchesColorBox, { width: 60 }]}
                    style={{ alignSelf: 'center' }}
                />
                <PreviewText />
                <Swatches
                    colors={FILTERCOLORS}
                    swatchStyle={styles.swatchesColorBox}
                    style={styles.swatchesStyles}
                />
            </ColorPicker>
        </View>
    );
};

export default PickerColor;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    colorPickerStyle: {
        width: wp(90),
        alignSelf: 'center',
    },
    swatchesColorBox: {
        width: 40,
        borderRadius: wp(1),
    },
    swatchesStyles: {
        justifyContent: 'flex-start',
    },
});
