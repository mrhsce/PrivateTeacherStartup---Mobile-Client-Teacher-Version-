import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {overlayColor} from '../constants/colors';

const {width} = Dimensions.get('window');

export default class Overlay extends Component {
    render() {
        const {onPress, catchTouch} = this.props;
        return (
            <View
                pointerEvents="box-none"
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: overlayColor,
                    flex: 1,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.5,
                }}>


                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <TouchableWithoutFeedback onPress={onPress}>
                        <View
                            style={{
                                flex: 1,
                                ...StyleSheet.absoluteFillObject,
                            }}
                            pointerEvents={catchTouch ? 'auto' : 'box-none'}
                        />
                    </TouchableWithoutFeedback>
                    <View style={{minWidth: width}}>{this.props.children}</View>
                </View>
            </View>


        );
    }
}
