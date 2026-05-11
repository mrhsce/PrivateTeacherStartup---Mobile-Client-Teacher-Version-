/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Toolbar} from "../components";
import {MKTextField} from "react-native-material-kit";
import {mapNumbersToEnglish} from "../utils";
import images from '@assets/images';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class Login extends Component<Props> {

    constructor() {
        super();
        this.state = {
            state: "enter-number",
            mobileNumber: null,
            otp: null
        }
    }

    componentWillMount() {
        // this.props.navigation.navigate('Login');
    }

    render() {
        const toolbarStyle = {
            start: {
                onPress: this.onBackPressed.bind(this),
                content: images.ic_back,
            },
            center: {
                isImage: false,
                content: 'ورود به حساب کاربری',
            },
        };
        return (
            <View style={{flex: 1}}>
                <Toolbar customStyle={toolbarStyle} />
                {this.state.state == "enter-number" &&
                <View style={styles.container}>
                    <Text style={styles.top_text_title}>لطفا شماره همراه خود را وارد کنید</Text>
                    <MKTextField
                        style={{flex: 1}}
                        multiline={false}
                        maxLength={11}
                        keyboardType='number-pad'
                        numberOfLines={1}
                        returnKeyType="next"
                        floatingLabelEnable={true}
                        // tintColor={placeholderTextColor}
                        textInputStyle={{
                            fontSize: 14,
                            color: 'black',
                            textAlign: 'center',
                        }}
                        underlineSize={1}
                        placeholder='09XXXXXXXXX'
                        onEndEditing={(e) => {
                            if (e.nativeEvent.text !== '') {
                                let text = mapNumbersToEnglish(e.nativeEvent.text);
                                this.setState({mobileNumber: text})
                            }
                        }}
                        // highlightColor={primaryDark}
                        value={this.state.mobileNumber}
                    />
                    <Text style={{textAlign: 'center', fontSize: 11, paddingHorizontal: 40, flex: 3}}>پس از وارد کردن شماره همراه خود، یک کد ۵ رقمی جهت
                        راستی‌آزمایی برای شما ارسال خواهد شد که باید آن را وارد نمایید.</Text>
                    <TouchableOpacity
                        style={styles.request_button_container}
                        onPress={() => {
                            this.getOTP();
                        }}
                    >
                        <Text style={styles.request_button_title}>درخواست کد راستی‌آزمایی</Text>

                    </TouchableOpacity>

                </View>

                }
                {this.state.state == "enter-otp" &&
                <View style={styles.container}>
                    <Text style={styles.top_text_title}>کد ارسال شده به شماره همراه خود را وارد نمایید</Text>
                    <MKTextField
                        style={{flex: 1}}
                        multiline={false}
                        maxLength={5}
                        keyboardType='number-pad'
                        numberOfLines={1}
                        returnKeyType="next"
                        floatingLabelEnable={true}
                        // tintColor={placeholderTextColor}
                        textInputStyle={{
                            fontSize: 14,
                            color: 'black',
                            textAlign: 'center',
                        }}
                        underlineSize={1}
                        placeholder='XXXXX'
                        onEndEditing={(e) => {
                            if (e.nativeEvent.text !== '') {
                                let text = mapNumbersToEnglish(e.nativeEvent.text);
                                this.setState({otp: text})
                            }
                        }}
                        // highlightColor={primaryDark}
                        value={this.state.mobileNumber}
                    />
                    <TouchableOpacity
                        style={{ flex: 2}}
                        onPress={() => {
                            // this.getOTP();
                        }}
                    >
                        <Text style={{textAlign: 'center', fontSize: 14, textDecorationLine: 'underline'}}>درخواست دوباره کد</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.request_button_container}
                        onPress={() => {
                            this.checkOTP();
                        }}
                    >
                        <Text style={styles.request_button_title}>تایید کد راستی‌آزمایی</Text>

                    </TouchableOpacity>
                </View>
                }
            </View>
        );
    }

    getOTP() {
        this.setState({state: "enter-otp"})
    }

    checkOTP() {
        alert("خوبه؟");
    }

    onBackPressed() {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    top_text_title:{
        textAlign: 'center',textAlignVertical: 'center',fontSize: 19, flex: 0.5
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    request_button_container:{
        backgroundColor: '#000000',
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        flex: 0.2
    },
    request_button_title:{
        fontSize: 18,
        color: '#FFFFFF'
    }
});
