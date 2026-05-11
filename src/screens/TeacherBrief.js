/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import {Image, Platform, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


type Props = {};
import images from '@assets/images';
import {bgScreen, primaryDark, subTextItem, textDisabled} from "../constants/colors";
import {AndroidBackButton, LoadingPopUp, Toolbar} from "../components";
import {setTeacherBrief, getInfo} from "../network/Queries";
import {teacherStore} from '../stores';

const BRIEF_LIMIT = 140;
const DESCRIPTION_LIMIT = 500;

export default class TeacherBrief extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            brief: teacherStore.brief ? teacherStore.brief :'',
            description: teacherStore.description ? teacherStore.description :'',
        }
    }

    render() {
        const toolbarStyle = {
            start: {
                onPress: this.onBackPressed.bind(this),
                content: images.ic_back,
            },
            title: 'معرفی خود',

        };

        return (
            <View style={{flex: 1, backgroundColor: bgScreen}}>
                <Toolbar customStyle={toolbarStyle} />
                <AndroidBackButton
                    onPress={() => {
                        if (this.state.showSearchType) {
                            this.setState({showSearchType: false});
                            return true;
                        }
                        this.onBackPressed();
                        return true;
                    }}
                />
                {/*<KeyboardAwareScrollView keyboardDismissMode='on-drag'>*/}

                <View style={{flex: 1, backgroundColor: '#F5F1F1', }}>


                        <View
                            style={{
                                backgroundColor: 'white',
                                flex: 1,
                                margin: 20,
                                marginBottom: 0,
                                borderRadius: 10,
                            }}
                        >
                            <View
                                style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 15}}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({brief: ''})}
                                >
                                <Image
                                    source={images.ic_close}
                                    style={{tintColor: '#8A7E7E', width: 24, height: 24,}}
                                />
                                </TouchableOpacity>

                                <Text
                                    style={{
                                        color: '#5D4A4A',
                                        fontSize: 12,
                                    }}>
                                    {this.state.brief.length} / {BRIEF_LIMIT}
                                </Text>

                            </View>

                            <TextInput
                                placeholder="خودتان را در چند کلمه معرفی کنید: اینکه معلم خصوصی چه درسی هستید، از چه زمانی تدریس می‌کنید."
                                // placeholderTextColor={placeholderTextColor}
                                autoFocus = {true}
                                blurOnSubmit={false}
                                autoCorrect={false}
                                maxLength={BRIEF_LIMIT}
                                numberOfLines={5}
                                style={{
                                    borderColor: '#E5DEDE',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    marginHorizontal: 10,
                                    backgroundColor: 'white',
                                    textAlignVertical: 'top',
                                    textAlign: 'right',
                                    color: '#262020',
                                    placeholderTextColor: '#8A7E7E',
                                    fontSize: 14,
                                    fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum' : 'IRANYekanRegular(FaNum)',
                                }}
                                multiline={true}
                                onChangeText={text => this.setState({
                                    brief: text,
                                    pristine: false,
                                })}
                                returnKeyType="done"
                                value={this.state.brief}
                            />



                        </View>

                        <View
                            style={{
                                backgroundColor: 'white',
                                flex: 2,
                                margin: 20,
                                borderRadius: 10,
                            }}
                        >
                            <View
                                style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15, marginHorizontal: 15}}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({description: ''})}
                                >
                                    <Image
                                        source={images.ic_close}
                                        style={{tintColor: '#8A7E7E', width: 24, height: 24,}}
                                    />
                                </TouchableOpacity>

                                <Text
                                    style={{
                                        color: '#5D4A4A',
                                        fontSize: 12,
                                    }}>
                                    {this.state.description.length} / {DESCRIPTION_LIMIT}
                                </Text>

                            </View>

                            <TextInput
                                placeholder="توضیحات بیشتر: شرح خوبی از خودتان بدهید، شانس انتخاب شدن خود را بالا ببرید!
مثال: من در ۵ سال گذشته مشغول تدریس ریاضی هستم. بیش از ۳۰ دانش‌آموز داشته‌ام و همه آن‌ها در امتحاناتشان بسیار خوب عمل کرده‌اند.
من علاوه بر ریاضی، دروس فیزیک و شیمی را نیز تدریس می‌کنم.
من دوران کارشناسی خود را در دانشگاه تهران گذرانده‌ام و حال در شریف مشغول تحصیل کارشناسی ارشد هستم."
                                // placeholderTextColor={placeholderTextColor}
                                blurOnSubmit={false}
                                autoCorrect={false}
                                maxLength={DESCRIPTION_LIMIT}
                                numberOfLines={15}
                                style={{
                                    borderColor: '#E5DEDE',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    marginHorizontal: 10,
                                    backgroundColor: 'white',
                                    textAlignVertical: 'top',
                                    textAlign: 'right',
                                    color: '#262020',
                                    placeholderTextColor: '#8A7E7E',
                                    fontSize: 12,
                                    fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum' : 'IRANYekanRegular(FaNum)',
                                }}
                                multiline={true}
                                onChangeText={text => this.setState({
                                    description: text,
                                    pristine: false,
                                })}
                                returnKeyType="done"
                                value={this.state.description}
                            />



                        </View>
                </View>

                    {/*</KeyboardAwareScrollView>*/}

                    <TouchableOpacity
                        onPress={this.submit.bind(this)}
                        disabled={!(this.state.brief && this.state.description)}
                                            >
                        <View style={{flexDirection: 'row'}}>
                            <View
                                style={{
                                    flex: 1,
                                    height: 60,
                                    backgroundColor: (this.state.brief && this.state.description) ? primaryDark : '#D5CBCB',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                    marginVertical: 5,
                                }}
                            >
                                <Text style={{fontSize: 18, color: 'white'}}>ثبت</Text>
                            </View>
                        </View>
                    </TouchableOpacity>



                <LoadingPopUp
                    visible={this.state.loading}
                    message={this.state.loadingMessage}
                />
            </View>
        );
    }

    showLoading(message = 'در حال دریافت اطلاعات...') {
        this.setState({loading: true, loadingMessage: message});
    }

    hideLoading() {
        this.setState({loading: false});
    }

    onBackPressed() {
        this.props.navigation.goBack();
    }

    async submit(){
        this.showLoading();
        await setTeacherBrief(this.state.brief, this.state.description)
            .then(() => {
                alert('success');
                // this.onBackPressed();
                // this.setState({showNotification: true, notificationType: 'success'});
            })
            .catch(e => {
                alert('failed');
                // this.setState({showNotification: true, notificationType: 'error'});
            })
            .finally(() => {this.hideLoading(); getInfo()});
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
