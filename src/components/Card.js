import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Color from '../constants/colors';

export default class Card extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: .5,
        margin: 4,
        padding: 16,
        backgroundColor: Color.white,
    },
});
