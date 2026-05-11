import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, AsyncStorage, ImageBackground} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

import images from '@assets/images';
import {primaryBg} from '../constants/colors';
import {persistStore, Building, accountsStore, userStore} from '../stores';
import {sleep, fetchStore} from '../utils';

export default class Splash extends Component {
    state = {configMode: false};

    async componentWillMount() {
        await fetchStore();
        console.warn("**** Splash Start componentWillMount **** ", persistStore.token);
        if (persistStore.token) {
            console.warn("**** Have Token ****");

                this.navigateToMain();
        } else {
            console.warn("*** not have Token ***");
            this.navigateToLogin();
        }
    }

    navigateToMain() {
        if (this.state.configMode) return;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Main'})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    async navigateToLogin() {
        await sleep(3000);
        console.warn("*** navigat login Start ***");
        if (this.state.configMode) return;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Welcome'})],
        });

        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={images.bg} style={{width: '100%', height: '100%'}}>
                    <View style={styles.logoContainer}>
                        <Image source={images.logo} style={styles.logo}/>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    goToConfig() {
        this.setState({configMode: true});
        this.props.navigation.navigate('Config');
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: primaryBg},
    background: {
        flex: 1,
        width: null,
        height: null,
        alignItems: 'center',
        resizeMode: 'stretch',
        marginBottom: 16,
    },
    logoContainer: {
        flex: 1,
        marginTop: 72,
        alignItems: 'center',
    },
    logo: {
        height: 204,
        width: 204,
        resizeMode: 'contain',
    },
});
