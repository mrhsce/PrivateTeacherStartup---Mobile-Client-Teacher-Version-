/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';


type Props = {};
import images from '@assets/images';
export default class Welcome extends Component<Props> {

    constructor() {
        super();
    }

    componentWillMount() {
        // this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.banner}
                    source={images.logo}
                />
                <View
                    style={styles.button_container}>
                    <TouchableOpacity
                        style={styles.login_button_container}
                        onPress={() => {
                            //TODO this is temporary
                            // this.props.navigation.navigate('Login');
                            this.props.navigation.navigate('SignIn');
                        }}
                    >
                        <Text style={styles.login_button_title}>ورود به حساب کاربری</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.signup_button_container}
                        onPress={() => {
                            this.props.navigation.navigate('SignUp');
                        }}
                    >
                        <Text style={styles.signup_button_title}>ساخت حساب کاربری</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FBA802',
    },
    button_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_button_container: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 7,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    login_button_title:{
        fontSize: 20,
        color: '#FFFFFF',
    },
    signup_button_container: {
        marginTop: 20,
    },
    signup_button_title: {
        fontSize: 15,
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    },
    banner:{
        marginTop: 20,
       width: 400,
        height: 400,
    },

});
