import React, {PureComponent} from 'react';
import {Animated, Image, TouchableWithoutFeedback,} from 'react-native';
import {
    fab,
    textItem
} from '../constants/colors';

export default class Fab extends PureComponent {
    constructor(props) {
        super(props);
        this.handlePressIn = this.handlePressIn.bind(this);
        this.handlePressOut = this.handlePressOut.bind(this);
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(1)
    }

    handlePressIn() {
        Animated.spring(this.animatedValue, {
            toValue: .5,
            useNativeDriver: true,
        }).start()
    }

    handlePressOut() {
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start()
    }

    render() {
        const {bgColor = fab, onPress, icon, iconColor = textItem} = this.props;
        const animatedStyle = {
            transform: [{scale: this.animatedValue}]
        };
        return (
            <TouchableWithoutFeedback
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                onPress={onPress}

            >
                <Animated.View
                    style={[animatedStyle, {
                        padding: 16,
                        backgroundColor: bgColor,
                        elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.8,
                        borderRadius: 32,
                    }]}
                >
                    <Image
                        source={icon}
                        style={{height: 24, width: 24, tintColor: iconColor}}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}
