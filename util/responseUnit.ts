import { Dimensions } from 'react-native';

export const wp = (number: number): number => {
    const { width } = Dimensions.get('window');
    return width * (number / 100);
};
export const hp = (number: number) => {
    const { height } = Dimensions.get('window');
    return height * (number / 100);
};


