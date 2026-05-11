import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
} from 'react-native';

import {
    overlayColor,
    primary,
    primaryDark,
} from '../constants/colors';

import * as Progress from 'react-native-progress';

export default class LoadingPopUp extends Component {
    render() {
        const {visible = false, onFinish} = this.props;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onDismiss={onFinish}
                // onShow={}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: overlayColor,
                }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            elevation: 7,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.8,
                            minWidth: 270,
                            borderRadius: 4
                        }}
                    >
                        <View style={{padding: 16, alignItems: 'center'}}>
                            <Progress.CircleSnail duration={700} spinDuration={3000}
                                                  color={[primary, 'red', primaryDark]}/>
                            <Text style={{color: primaryDark, fontSize: 14}}>
                                {this.props.message}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>

        );
    }
}
