import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swipeout from 'react-native-swipeout-rtl';
import {primaryDark} from "../constants/colors";
import images from '@assets/images';

function BtnSwipe({icon, color, text, corner}) {
    return (
            <View style={{backgroundColor: '#f5f1f1', paddingTop: 10, paddingBottom: 6, flex: 1}}>
                <View
                    style={[styles.btn, {backgroundColor: color}, {
                        borderTopEndRadius: corner ? 10 : 0,
                        borderBottomEndRadius: corner ? 10 : 0,
                    }]}
                >
                <Image
                    source={icon}
                    style={{
                        height: 24,
                        width: 24,
                        tintColor: 'white'
                    }}
                />
                <Text
                    style={{
                        fontSize: 14,
                        color: 'white',
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    );
}

export default class IOSSwipeCard extends PureComponent {
    constructor(props) {
        super(props);
        console.warn("****** SwipeCard constructor props.onDelete: ", props.onDelete);
        const deleteBtn = props.onDelete ? {
            text: 'حذف',
            component: (<BtnSwipe corner icon={images.binIcon} color='#e95959' text='حذف'/>),
            // backgroundColor: 'red',
            onPress: () => {
                props.onDelete()
            },
            disabled: !props.permission.deleteAccess
        } : false;
        const moreBtn = props.onMore ? {
            component: (<BtnSwipe icon={images.moreIcon} color='#8a7e7e' text='بیشتر'/>),
            onPress: () => {
                props.onMore()
            },
            disabled: !props.permission.writeAccess

        } : false;
        this.swipeBtnsLeft = [];
        if (moreBtn) this.swipeBtnsLeft.push(moreBtn);
        if (deleteBtn) this.swipeBtnsLeft.push(deleteBtn);

    }

    render() {
        const {title, permission, onItemPress, bgTitleColor = primaryDark, index, idSwipeOpened} = this.props;
        return (
            <Swipeout
                autoClose={true}
                right={this.swipeBtnsLeft}
                style={[styles.container, this.props.style]}
                disabled={permission && !permission.deleteAccess && !permission.writeAccess}
                onOpen={() => {
                    this.props.onOpen(index);
                }}
                onClose={() => {
                    this.props.onClose(index);
                }}
                close={index !== idSwipeOpened}
            >
                <TouchableOpacity
                    onPress={onItemPress}
                    disabled={!onItemPress}
                    style={{borderTopEndRadius: 10,
                        borderBottomEndRadius: 10,
                        overflow: 'hidden',}}
                >
                    {title && (
                        <View
                            style={[styles.title, {backgroundColor: bgTitleColor}]}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 16,
                                }}
                            >
                                {title}
                            </Text>
                        </View>
                    )}
                    {this.props.children}
                </TouchableOpacity>
            </Swipeout>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: '#f5f1f1',
        borderTopEndRadius: 7,
        borderBottomEndRadius: 7,
    },
    title: {
        // paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: 10,
        // maxHeight: 99
    }
});
