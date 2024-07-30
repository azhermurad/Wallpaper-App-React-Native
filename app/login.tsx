import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TextInput,
} from 'react-native';
import React, { useRef } from 'react';
import Svg, { Path } from 'react-native-svg';
import { hp } from '../util/responseUnit';
import InputField from '../components/InputField';
import CustomButton from '../components/ui/CustomButton';

const login = () => {
    const emailRef = useRef<TextInput>(null);
    console.log(emailRef);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Svg
                    height={hp(30)}
                    width={Dimensions.get('screen').width}
                    viewBox='0 0 1440 320'
                    style={
                        {
                            position: 'absoulte',
                            top: hp(0),
                        } as any
                    }
                >
                    <Path
                        fill='#2F2F31'
                        d='M0,288L21.8,288C43.6,288,87,288,131,256C174.5,224,218,160,262,160C305.5,160,349,224,393,234.7C436.4,245,480,203,524,154.7C567.3,107,611,53,655,64C698.2,75,742,149,785,176C829.1,203,873,181,916,186.7C960,192,1004,224,1047,250.7C1090.9,277,1135,299,1178,293.3C1221.8,288,1265,256,1309,224C1352.7,192,1396,160,1418,144L1440,128L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z'
                    />
                </Svg>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10,
                }}
            >
                <InputField
                    iconName='email'
                    secureTextEntry={false}
                    ref={emailRef}
                    placeholder='Enter your email'
                />
                <InputField
                    iconName='lock'
                    secureTextEntry={true}
                    ref={emailRef}
                    placeholder='Enter your email'
                />
                <View style={styles.buttonContiner}>
                    <CustomButton
                        title='Login'
                        backgroundColor='#454547'
                        onpress={() => {}}
                    />
                </View>
            </View>
        </View>
    );
};

export default login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        backgroundColor: 'green',
    },

    box: {
        backgroundColor: '#2F2F31',
        // backgroundColor: '#2471A3',
        height: hp(10),
    },
    buttonContiner: {
        marginTop: 20,
    },
    title: {
        fontSize: hp(8),
        fontWeight: 'bold',
    },
});
