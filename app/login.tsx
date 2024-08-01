import {
    View,
    StyleSheet,
    Dimensions,
    Button,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { hp } from '../util/responseUnit';
import InputField from '../components/InputField';
import CustomButton from '../components/ui/CustomButton';
import { useAuth } from '../context/AuthProvider';
import { Image } from 'expo-image';

const login = () => {
    const [loginScreen, setLoginScreen] = useState(false);
    const [formdata, setFormData] = useState({
        name: 'test',
        email: 'azhermurad@gmail.com',
        password: 'azherali',
    });

    const { signIn, signUp } = useAuth();
    const loginHandler = () => {
        if (loginScreen) {
            signIn({ email: formdata.email, password: formdata.password });
        } else {
            signUp({
                email: formdata.email,
                password: formdata.password,
                name: formdata.name,
            });
        }
    };

    const valueHandler = (value: string, name: string) => {
        console.log(value, name);
        setFormData((pre) => {
            return { ...pre, [name]: value } as any;
        });
    };
    const switchScreenHandler = () => {
        setLoginScreen((pre) => !pre);
        setFormData({
            name: '',
            email: '',
            password: '',
        });
    };
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
                <Image
                    style={[styles.imageStyle]}
                    source={require('../assets/images/login.png')}
                    contentFit='cover'
                />
                {!loginScreen && (
                    <InputField
                        name='name'
                        valueHandler={valueHandler}
                        value={formdata.name}
                        iconName='users'
                        placeholder='Enter your Name'
                    />
                )}

                <InputField
                    name='email'
                    valueHandler={valueHandler}
                    value={formdata.email}
                    iconName='email'
                    secureTextEntry={false}
                    placeholder='Enter your email'
                />
                <InputField
                    name='password'
                    valueHandler={valueHandler}
                    value={formdata.password}
                    iconName='lock'
                    secureTextEntry={true}
                    placeholder='Enter your Password'
                />

                <View style={styles.buttonContiner}>
                    <CustomButton
                        title={loginScreen ? 'login' : 'signUp'}
                        onpress={loginHandler}
                        backgroundColor='#2F2F31'
                        IconShow={false}
                    />
                    {/* <Button title='signup' onPress={loginHandler} /> */}
                </View>
                <View
                    style={{
                        marginVertical: 10,
                        // alignItems: 'flex-end',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                    }}
                >
                    <Text style={styles.accountTitle}>
                        {loginScreen
                            ? "Dont't have an account?"
                            : 'Already have an account?'}
                    </Text>
                    <TouchableOpacity onPress={switchScreenHandler}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: 'blue',
                            }}
                        >
                            {loginScreen ? '  Signup' : 'SignIn'}
                        </Text>
                    </TouchableOpacity>
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
        marginTop: 15,
    },
    title: {
        fontSize: hp(8),
        fontWeight: 'bold',
    },
    imageStyle: {
        width: 200,
        aspectRatio: 1,
        alignSelf: 'center',
    },
    accountTitle: {
        fontWeight: '300',
        color: 'gray',
    },
});
