import React, {PureComponent} from 'react';
import {Modal, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';

import {drawerItem, overlayColor, primaryDark} from '../constants/colors';
import {Overlay} from "./index";

export default class AlertMessage extends PureComponent {

    render() {
        const {
            visible,
            title,
            message,
            onConfirm,
            onDismiss,
            onFinish,
            confirmTitle,
            dismissTitle = 'انصراف',
            onModal = false
        } = this.props;


        if (onModal)
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visible}
                    presentationStyle="overFullScreen"
                    onRequestClose={onDismiss}
                    onDismiss={onFinish}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: overlayColor,
                    }}>
                        <TouchableWithoutFeedback
                            onPress={onDismiss}>
                            <View
                                style={{
                                    flex: 1,
                                    ...StyleSheet.absoluteFillObject,
                                }}
                                pointerEvents={'auto'}
                            />
                        </TouchableWithoutFeedback>
                        <Content
                            title={title}
                            message={message}
                            onDismiss={onDismiss}
                            dismissTitle={dismissTitle}
                            onConfirm={onConfirm}
                            confirmTitle={confirmTitle}
                        />
                    </View>
                </Modal>
            );
        else if (visible)
            return (
                <Overlay catchTouch={true} onPress={onDismiss}>
                    <Content
                        title={title}
                        message={message}
                        onDismiss={onDismiss}
                        dismissTitle={dismissTitle}
                        onConfirm={onConfirm}
                        confirmTitle={confirmTitle}
                    />
                </Overlay>
            );
        else
            return <View/>;
    }
}

function Content({title, message, onDismiss, dismissTitle, onConfirm, confirmTitle}) {
    return (
        <View
            style={{
                backgroundColor: 'white',
                paddingHorizontal: 24,
                // width: minWidth,
                minHeight: 77,
                borderRadius: 10,
                paddingTop: 21,
                paddingBottom: 13,
                marginHorizontal: 24
            }}
        >
            {title && (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={[styles.title]}>{title}</Text>
                </View>
            )}
            <Text style={[styles.message]}>
                {message}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 24, justifyContent: 'flex-end'}}>

                <TouchableOpacity style={[styles.btn]} onPress={onDismiss}>
                    <Text>{dismissTitle}</Text>
                </TouchableOpacity>
                {confirmTitle && (
                    <TouchableOpacity style={[styles.btn]} onPress={onConfirm}>
                        <Text style={{color: primaryDark}}>{confirmTitle}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 6,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
        fontSize: 20,
        marginVertical: 8,
        alignSelf: 'flex-start',
    },
    message: {
        alignSelf: 'flex-start',
        marginTop: 16,
        fontSize: 16,
        color: drawerItem,
    }
});

