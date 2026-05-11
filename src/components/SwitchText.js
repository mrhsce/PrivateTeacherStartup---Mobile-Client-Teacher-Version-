import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Animated, Platform,
} from 'react-native';

import {textDisabled, borderSeparate} from '../constants/colors';


export default class SwitchText extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.firsSet = true;
        this.state = {
            // value: props.value,
            backgroundMove: new Animated.Value(props.value ? 1 : 0),
            backgroundWidth: new Animated.Value(props.value ? 1 : 0),
            activeWidth: 0,
            inactiveWidth: 0,

        };
    }

    componentDidMount() {
        // const {value} = this.props;
        // this.animateSwitch(value, () => null);
    }

    componentDidUpdate() {
        this.animateSwitch(this.props.value, () => null);
    }


    handleSwitch(value) {
        // const {value} = this.state;
        const {
            onValueChange,
            disabled,
            // value: propValue
        } = this.props;
        if (disabled) {
            return;
        }

        this.animateSwitch(!value, () => onValueChange(!value));
    };

    animateSwitch = (value, cb = () => {
    }) => {
        Animated.parallel([
            Animated.timing(this.state.backgroundMove, {
                toValue: value ? 0 : 1,
                duration: 200,
            }),
            Animated.timing(this.state.backgroundWidth, {
                toValue: value ? 0 : 1,
                duration: 200,
            })
        ]).start(cb);
    };

    render() {
        const {
            backgroundMove,
            backgroundWidth,
        } = this.state;
        const {value, activeText, inactiveText, backgroundActive, backgroundInactive, activeTextStyle, inactiveTextStyle, big} = this.props;

        // if (this.firsSet && value !== this.state.value) {
        //     this.handleSwitch();
        //     this.firsSet = false;
        // }

        const moveBackground = backgroundMove.interpolate({
            inputRange: [0, 1],
            outputRange: [0, this.state.activeWidth]
        });
        const widthBackground = backgroundWidth.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.activeWidth, this.state.inactiveWidth]
        });
        // read SOLID, dont need title, impl Sample: AddSetting.js
        return (
            <View style={{flex: 1}}>


                <TouchableWithoutFeedback
                    onPress={() => this.handleSwitch(value)}
                >
                    <View
                        style={[
                            styles.radiosRight,
                            styles.radiosLeft,
                            {
                                backgroundColor: backgroundInactive,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                minHeight: this.props.height ? this.props.height : 24,
                                borderWidth: 1,
                                borderColor: borderSeparate
                            }]}
                    >
                        <Animated.View
                            style={[
                                value ? styles.radiosLeft : styles.radiosRight,
                                {
                                    position: 'absolute',
                                    backgroundColor: backgroundActive,
                                    height: '100%',
                                    width: widthBackground,
                                    left: moveBackground,

                                }]}>
                        </Animated.View>
                        <View
                            onLayout={(event) => {
                                let {x, y, width, height} = event.nativeEvent.layout;
                                this.setState({activeWidth: width})
                            }}
                            style={[styles.item]}>
                            <Text
                                style={[styles.text, {color: value ? 'white' : textDisabled,
                                    fontFamily: value ? Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)' : Platform.OS === 'ios' ? 'IRANYekanFaNum' : 'IRANYekanRegular(FaNum)',
                                    fontSize: big ? value ? 16 : 14 : 14
                                }, activeTextStyle]}>{activeText}</Text>

                        </View>
                        <View
                            onLayout={(event) => {
                                let {x, y, width, height} = event.nativeEvent.layout;
                                this.setState({inactiveWidth: width})
                            }}
                            style={[styles.item]}>
                            <Text
                                style={[styles.text, {color: value ? textDisabled : 'white',
                                    fontFamily: !value ? Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)' : Platform.OS === 'ios' ? 'IRANYekanFaNum' : 'IRANYekanRegular(FaNum)',
                                    fontSize: big ? !value ? 16 : 14 : 14
                                }, inactiveTextStyle]}>{inactiveText}</Text>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        paddingHorizontal: 7,
        paddingVertical: 2
    },
    radiosRight: {
        // borderTopRightRadius: 7,
        // borderBottomRightRadius: 7
        borderRadius: 20,
    },
    radiosLeft: {
        // borderTopLeftRadius: 7,
        // borderBottomLeftRadius: 7
        borderRadius: 20,
    }

});
