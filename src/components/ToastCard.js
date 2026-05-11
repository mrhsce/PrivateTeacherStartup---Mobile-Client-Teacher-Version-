import {Animated, Image, Keyboard, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {PureComponent} from 'react';
import images from '@assets/images';


class Content extends PureComponent {

    constructor() {
        super();
        this.init = false;
        this.animatedFromBottom = new Animated.Value(0);

        //for get keyboard height
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (frames) => {
            if (!frames.endCoordinates) {
                return;
            }
            this.setState({keyboardSpace: frames.endCoordinates.height});
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (frames) => {
            this.setState({keyboardSpace: 0});
        });

        this.state = {
            keyboardSpace: 0,
            value: null,
        };
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    componentWillMount(): void {
        const {type = 'success', title, message} = this.props;

        switch (type) {
            case 'success':
                this.title = 'تبریک!';
                this.message = 'عملیات با موفقیت انجام شد';
                this.titleColor = '#00A28C';
                this.messageColor = '#1CC4AD';
                this.image = images.bg_ntf_Success;
                this.timeOut = 4000;
                break;
            case 'warning':
                this.title = 'عه!';
                this.message = 'خطایی رخ داده، لطفا دوباره سعی کنید';
                this.titleColor = '#C73618';
                this.messageColor = '#FF9D88';
                this.image = images.bg_ntf_Warning;
                this.timeOut = 6000;
                break;
            case 'error':
                this.title = 'خطایی رخ داد';
                this.message = 'متاسفانه اینکار انجام نشد';
                this.titleColor = '#B28600';
                this.messageColor = '#FFC107';
                this.image = images.bg_ntf_Error;
                this.timeOut = 10000;
                break;
        }

        if (title) {
            this.title = title;
        }

        if (message) {
            this.message = message;
        }
    }

    componentDidMount() {
        this.animateSnake(true, () => {
        });

        setTimeout(function () {
            this.animateSnake(false, () => this.props.onClose());
        }.bind(this), this.timeOut);
    }

    animateSnake(open, fn) {
        Animated.timing(
            this.animatedFromBottom,
            {
                toValue: open ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            },
        ).start(fn);
    }

    render() {
        const {onClose} = this.props;
        const animateTranslateY = this.animatedFromBottom.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0],
        });

        return (
            <View style={{
                position: 'absolute',
                bottom: 10,
                width: '100%',

            }}>
                <Animated.View
                    style={{
                        transform: [{translateY: animateTranslateY}],
                        minHeight: 120,
                        maxHeight: 120,
                        position: 'absolute',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        bottom: Platform.OS === 'ios' ? this.state.keyboardSpace : 0,
                        left: 0,
                        right: 0,

                    }}
                >

                    <View
                        style={[styles.actionIcon, {
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: 'white',
                            height: 60,
                            backgroundColor: 'white',
                            marginHorizontal: 24,
                            borderRadius: 10,
                            overflow: 'hidden',
                            elevation: 4,
                        }]}>

                        <Image
                            source={this.image}
                            style={{position: 'absolute', start: 0, top: 0, height: 57, width: 57}}
                        />

                        <TouchableWithoutFeedback
                            onPress={() => this.animateSnake(false, () => onClose())}
                        >

                            <View
                                style={{
                                    position: 'absolute',
                                    end: 2,
                                    padding: 10,
                                }}
                            >
                                <Image
                                    source={images.ic_close}
                                    style={{
                                        tintColor: '#BFACAC',
                                        height: 16,
                                        width: 16,
                                    }}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                        <Text style={{
                            color: this.titleColor,
                            fontSize: 16,
                            fontFamily: Platform.OS === 'ios' ? 'IRANYekan-ExtraBold' : 'IRANYekanExtraBold',

                            position: 'absolute',
                            start: 52,
                            top: 1,
                        }}>{this.title}</Text>

                        <Text style={{
                            color: this.messageColor,
                            fontSize: 12,

                            position: 'absolute',
                            start: 57,
                            bottom: 8,
                        }}>{this.message}</Text>
                    </View>


                </Animated.View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 13,
        paddingStart: 13,
        height: 45,
    },
    rowTitle: {
        flex: 1,
    },
    button: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 4,
        height: 33,
        marginHorizontal: 7,
    },
    fromTop: {
        top: 0,
    },
    fromBottom: {
        bottom: 0,
    },
    img: {
        tintColor: 'black',
        height: 24,
        width: 24,
        marginEnd: 24,
    },
    actionIcon: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
        height: '100%',
    },

});


export default class ToastCard extends PureComponent {

    constructor() {
        super();
    }

    render() {
        const {onClose, type, title, message} = this.props;

        return (
            <View>
                {this.props.visible &&
                <Content
                    onClose={onClose}
                    type={type}
                    title={title}
                    message={message}
                />
                }
            </View>

        );
    }
}
