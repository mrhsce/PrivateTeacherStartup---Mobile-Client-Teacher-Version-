/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {MKTextField} from 'react-native-material-kit';
import {fetchStore, mapNumbersToEnglish} from '../utils';
import images from '@assets/images';
import {checkOTPforSignUp, getOTPforSignUp, signUp} from '../network/Queries';

import {black, drawerItem, placeholderTextColor, primaryDark,} from '../constants/colors';

import {LoadingPopUp, SwitchText, ToastCard, Toolbar} from '../components';
import persistStore from '../stores/PersistStore';

type Props = {};
export default class SignUp extends Component<Props> {
  constructor() {
    super();
    this.state = {
      state: 'enter-number',
      // state: "welcome",
      mobileNumber: null,
      // mobileNumber: '09393921260',
      otp: null,
      loading: false,
    };

    this.guid = null;
    // this.guid = "1678e396-4c0a-4e4e-afb3-8795e5c3253d";
  }

  async componentDidMount() {
    await fetchStore();

    let i = persistStore.token;
    if (i != null) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Main'})],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    const toolbarStyle = {
      start: {
        onPress: this.onBackPressed.bind(this),
        content: images.ic_back,
      },
      title: 'ایجاد حساب کاربری',
    };
    return (
      <View style={{flex: 1}}>
        {this.state.state != 'welcome' && (
          <Toolbar customStyle={toolbarStyle} />
        )}
        {this.state.state == 'enter-number' && (
          <View style={styles.container}>
            <Text style={styles.top_text_title}>
              لطفا شماره همراه خود را وارد کنید
            </Text>
            <MKTextField
              style={styles.input}
              multiline={false}
              maxLength={11}
              keyboardType="number-pad"
              numberOfLines={1}
              returnKeyType="next"
              floatingLabelEnable={true}
              // tintColor={placeholderTextColor}
              textInputStyle={{
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'IRANYekanFaNum'
                    : 'IRANYekanRegular(FaNum)',
                fontSize: 16,
                color: 'black',
                textAlign: 'center',
              }}
              underlineSize={1}
              placeholder="مثال ۰۹۱۲۲۲۲۲۲۲۲"
              onChangeText={text => {
                if (text != '') {
                  text = mapNumbersToEnglish(text);
                  this.setState({
                    mobileNumber: text,
                  });
                } else {
                  this.setState({
                    mobileNumber: null,
                  });
                }
              }}
              // highlightColor={primaryDark}
              value={this.state.mobileNumber}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 11,
                paddingHorizontal: 40,
                flex: 1,
              }}>
              پس از وارد کردن شماره همراه خود، یک کد ۵ رقمی جهت راستی‌آزمایی
              برای شما ارسال خواهد شد که باید آن را وارد نمایید.
            </Text>
            <TouchableOpacity
              disabled={
                !(
                  this.state.mobileNumber &&
                  this.state.mobileNumber.length == 11
                )
              }
              style={[
                styles.request_button_container,
                {
                  backgroundColor:
                    this.state.mobileNumber &&
                    this.state.mobileNumber.length == 11
                      ? primaryDark
                      : '#D5CBCB',
                },
              ]}
              onPress={() => {
                this.activateLoading(this.getOTP.bind(this));
              }}>
              <Text style={styles.request_button_title}>
                درخواست کد راستی‌آزمایی
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.state == 'enter-otp' && (
          <View style={styles.container}>
            <Text style={styles.top_text_title}>
              کد ارسال شده به شماره همراه خود را وارد نمایید
            </Text>
            <MKTextField
              style={styles.input}
              multiline={false}
              maxLength={5}
              keyboardType="number-pad"
              numberOfLines={1}
              returnKeyType="next"
              floatingLabelEnable={true}
              // tintColor={placeholderTextColor}
              textInputStyle={{
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'IRANYekanFaNum'
                    : 'IRANYekanRegular(FaNum)',
                fontSize: 16,
                color: 'black',
                textAlign: 'center',
              }}
              underlineSize={1}
              placeholder="کد ۵ رقمی"
              onChangeText={text => {
                if (text != '') {
                  text = mapNumbersToEnglish(text);
                  this.setState({
                    otp: text,
                  });
                } else {
                  this.setState({
                    otp: null,
                  });
                }
              }}
              // highlightColor={primaryDark}
              value={this.state.otp}
            />
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                this.getOTPAgain();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  textDecorationLine: 'underline',
                }}>
                درخواست دوباره کد
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!(this.state.otp && this.state.otp.length == 5)}
              style={[
                styles.request_button_container,
                {
                  backgroundColor:
                    this.state.otp && this.state.otp.length == 5
                      ? primaryDark
                      : '#D5CBCB',
                },
              ]}
              onPress={() => {
                this.activateLoading(this.checkOTP.bind(this));
              }}>
              <Text style={styles.request_button_title}>
                تایید کد راستی‌آزمایی
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.state == 'enter-info' && (
          <View style={styles.container}>
            <Text style={{color: 'black', textAlign: 'center'}}>
              لطفا اطلاعات خود را وارد نمایید
            </Text>

            <View
              style={{
                // backgroundColor: 'white',
                paddingTop: 16,
                paddingBottom: 20,
                paddingHorizontal: 10,
                // height: 370,
                flex: 1,
                // justifyContent: 'space-between',
                borderRadius: 4,
              }}>
              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  flexDirection: 'row',
                  marginEnd: 15,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.ic_important}
                    style={{height: 16, width: 16}}
                  />
                  <Image
                    source={images.ic_Information}
                    style={{tintColor: drawerItem, height: 24, width: 24}}
                  />
                  <Text style={{fontSize: 12}}>نام‌</Text>
                </View>
                <MKTextField
                  multiline={false}
                  maxLength={25}
                  numberOfLines={1}
                  returnKeyType="done"
                  floatingLabelEnable={true}
                  tintColor={placeholderTextColor}
                  textInputStyle={{
                    fontSize: 13,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'IRANYekanFaNum'
                        : 'IRANYekanRegular(FaNum)',
                    color: 'black',
                    textAlign: 'right',
                  }}
                  underlineSize={1}
                  placeholder="مثال حمید"
                  style={{flex: 3}}
                  onChangeText={text => {
                    if (text != '') {
                      text = mapNumbersToEnglish(text);
                      this.setState({name: text, pristine: false});
                    } else {
                      this.setState({name: null, pristine: false});
                    }
                  }}
                  highlightColor={primaryDark}
                  value={this.state.name}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  flexDirection: 'row',
                  marginEnd: 15,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.ic_important}
                    style={{height: 16, width: 16}}
                  />
                  <Image
                    source={images.ic_Information}
                    style={{tintColor: drawerItem, height: 24, width: 24}}
                  />
                  <Text style={{fontSize: 12}}>نام‌خانوادگی</Text>
                </View>
                <MKTextField
                  multiline={false}
                  maxLength={25}
                  numberOfLines={1}
                  returnKeyType="done"
                  floatingLabelEnable={true}
                  tintColor={placeholderTextColor}
                  textInputStyle={{
                    fontSize: 13,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'IRANYekanFaNum'
                        : 'IRANYekanRegular(FaNum)',
                    color: 'black',
                    textAlign: 'right',
                  }}
                  underlineSize={1}
                  placeholder="مثال حمیدی"
                  style={{flex: 3}}
                  onChangeText={text => {
                    if (text != '') {
                      text = mapNumbersToEnglish(text);
                      this.setState({family: text, pristine: false});
                    } else {
                      this.setState({family: null, pristine: false});
                    }
                  }}
                  highlightColor={primaryDark}
                  value={this.state.family}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginStart: 15,
                  marginEnd: 15,
                }}>
                <View
                  style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.ic_Kind}
                    style={{tintColor: drawerItem, height: 24, width: 24}}
                  />
                  <Text style={{fontSize: 12}}>جنسیت</Text>
                </View>
                <View style={{flex: 3}}>
                  <SwitchText
                    value={this.state.sex}
                    onValueChange={val => {
                      this.setState({sex: val, pristine: false});
                    }}
                    activeText={'آقا'}
                    inactiveText={'خانم'}
                    backgroundActive={primaryDark}
                    backgroundInactive={'white'}
                    activeTextStyle={{paddingHorizontal: 9, paddingVertical: 7}}
                    inactiveTextStyle={{
                      paddingHorizontal: 9,
                      paddingVertical: 7,
                    }}
                  />
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  flexDirection: 'row',
                  marginStart: 15,
                  marginEnd: 15,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.ic_Information}
                    style={{tintColor: drawerItem, height: 24, width: 24}}
                  />
                  <Text style={{fontSize: 12}}>مدرک تحصیلی</Text>
                </View>
                <MKTextField
                  multiline={false}
                  maxLength={25}
                  numberOfLines={1}
                  returnKeyType="done"
                  floatingLabelEnable={true}
                  tintColor={placeholderTextColor}
                  textInputStyle={{
                    fontSize: 13,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'IRANYekanFaNum'
                        : 'IRANYekanRegular(FaNum)',
                    color: 'black',
                    textAlign: 'right',
                  }}
                  underlineSize={1}
                  placeholder="مثال کارشناسی ارشد"
                  style={{flex: 3}}
                  onChangeText={text => {
                    if (text != '') {
                      text = mapNumbersToEnglish(text);
                      this.setState({degree: text, pristine: false});
                    } else {
                      this.setState({degree: null, pristine: false});
                    }
                  }}
                  highlightColor={primaryDark}
                  value={this.state.degree}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  flexDirection: 'row',
                  marginStart: 15,
                  marginEnd: 15,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={images.ic_Information}
                    style={{tintColor: drawerItem, height: 24, width: 24}}
                  />
                  <Text style={{fontSize: 12}}>رشته تحصیلی</Text>
                </View>
                <MKTextField
                  multiline={false}
                  maxLength={25}
                  numberOfLines={1}
                  returnKeyType="done"
                  floatingLabelEnable={true}
                  tintColor={placeholderTextColor}
                  textInputStyle={{
                    fontSize: 13,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'IRANYekanFaNum'
                        : 'IRANYekanRegular(FaNum)',
                    color: 'black',
                    textAlign: 'right',
                  }}
                  underlineSize={1}
                  placeholder="مثال مهندسی نرم‌افزار"
                  style={{flex: 3}}
                  onChangeText={text => {
                    if (text != '') {
                      text = mapNumbersToEnglish(text);
                      this.setState({fieldOfStudy: text, pristine: false});
                    } else {
                      this.setState({fieldOfStudy: null, pristine: false});
                    }
                  }}
                  highlightColor={primaryDark}
                  value={this.state.fieldOfStudy}
                />
              </View>

              <View
                  style={{
                    flex: 1,
                    marginVertical: 10,
                    flexDirection: 'row',
                    marginStart: 15,
                    marginEnd: 15,
                    alignItems: 'flex-start',
                  }}>
                <View
                    style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                      source={images.ic_Information}
                      style={{tintColor: drawerItem, height: 24, width: 24}}
                  />
                  <Text style={{fontSize: 12}}>ایمیل</Text>
                </View>
                <MKTextField
                    multiline={false}
                    maxLength={30}
                    numberOfLines={1}
                    returnKeyType="done"
                    floatingLabelEnable={true}
                    tintColor={placeholderTextColor}
                    textInputStyle={{
                      fontSize: 13,
                      fontFamily:
                          Platform.OS === 'ios'
                              ? 'IRANYekanFaNum'
                              : 'IRANYekanRegular(FaNum)',
                      color: 'black',
                      textAlign: 'right',
                    }}
                    underlineSize={1}
                    placeholder="مثال mymail@gmail.com"
                    style={{flex: 3}}
                    onChangeText={text => {
                      if (text != '') {
                        text = mapNumbersToEnglish(text);
                        this.setState({email: text, pristine: false});
                      } else {
                        this.setState({email: null, pristine: false});
                      }
                    }}
                    highlightColor={primaryDark}
                    value={this.state.email}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  flexDirection: 'row',
                  marginStart: 20,
                  marginEnd: 15,
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 12}}>کد معرف</Text>
                </View>
                <MKTextField
                  multiline={false}
                  maxLength={25}
                  numberOfLines={1}
                  returnKeyType="done"
                  floatingLabelEnable={true}
                  tintColor={placeholderTextColor}
                  textInputStyle={{
                    fontSize: 13,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'IRANYekanFaNum'
                        : 'IRANYekanRegular(FaNum)',
                    color: 'black',
                    textAlign: 'right',
                  }}
                  underlineSize={1}
                  placeholder="در صورت وجود"
                  style={{flex: 3}}
                  onChangeText={text => {
                    if (text != '') {
                      text = mapNumbersToEnglish(text);
                      this.setState({invitationCode: text, pristine: false});
                    } else {
                      this.setState({invitationCode: null, pristine: false});
                    }
                  }}
                  highlightColor={primaryDark}
                  value={this.state.invitationCode}
                />
              </View>
            </View>

            <TouchableOpacity
              disabled={
                !(
                  this.state.name &&
                  this.state.name !== '' &&
                  this.state.family &&
                  this.state.family !== ''
                )
              }
              style={[
                styles.request_button_container,
                {
                  backgroundColor:
                    this.state.name &&
                    this.state.name !== '' &&
                    this.state.family &&
                    this.state.family !== ''
                      ? primaryDark
                      : '#D5CBCB',
                },
              ]}
              onPress={() => {
                this.activateLoading(this.submit.bind(this));
              }}>
              <Text style={styles.request_button_title}>ثبت اطلاعات</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.state == 'welcome' && (
          <View style={styles.container}>
            <Text style={styles.top_text_title}>خوشامدگویی و تایید نهایی</Text>

            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 14,
                flex: 3,
              }}>
              در این صفحه یک سری قوانین اولیه و همچنین خوشامدگویی به مدرس به
              صورت متن به نمایش در می‌آید
            </Text>
            <TouchableOpacity
              style={styles.request_button_container}
              onPress={() => {
                this.enter();
              }}>
              <Text style={styles.request_button_title}>ورود به اپلیکیشن</Text>
            </TouchableOpacity>
          </View>
        )}
        <LoadingPopUp
          visible={this.state.loading}
          message={this.state.loadingMessage}
        />

        <ToastCard
          message={this.state.notificationMessage}
          visible={this.state.showNotification}
          type={this.state.notificationType}
          onClose={() => this.setState({showNotification: false})}
        />
      </View>
    );
  }

  async getOTP() {
    // TODO check before letting user through
    let number = this.state.mobileNumber;
    let response = await getOTPforSignUp(number);

    if (response) {
      this.setState({state: 'enter-otp'});
    } else {
      this.setState({
        showNotification: true,
        notificationType: 'error',
        notificationMessage: 'ایرادی پیش آمده است، لطفا دوباره تلاش کنید.',
      });
    }
  }

  getOTPAgain() {
    this.setState({state: 'enter-number'});
  }

  async checkOTP() {
    // TODO check before letting user through

    let number = this.state.mobileNumber;
    let otp = this.state.otp;
    let response = await checkOTPforSignUp(otp, number);

    if (response && response.Id) {
      this.guid = response.Id;
      this.setState({state: 'enter-info'});
    } else {
      this.setState({
        showNotification: true,
        notificationType: 'error',
        notificationMessage: 'کد احراز هویت وارد شده نادرست است.',
      });
    }
  }

  async submit() {
    // TODO check before letting user through
    let user = {
      Name: this.state.name,
      Family: this.state.family,
      Gender: this.state.sex,
      Degree: this.state.degree,
      FieldOfStudy: this.state.fieldOfStudy,
      Email: this.state.email,
    };
    let response = await signUp(this.guid, user);

    if (response) {
      this.setState({
        showNotification: true,
        notificationType: 'success',
        notificationMessage: 'ثبت‌نام موفق',
        state: 'welcome',
      });
      this.setState({});
    } else {
      this.setState({
        showNotification: true,
        notificationType: 'error',
        notificationMessage: 'خطا در ثبت‌نام',
      });
    }
  }

  enter() {
    //TODO this should be removed
    this.props.navigation.navigate('Main');
  }

  async activateLoading(func) {
    this.showLoading();
    await func();
    this.hideLoading();
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  top_text_title: {
    textAlign: 'center',
    textAlignVertical: 'bottom',
    paddingBottom: 20,
    fontSize: 20,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  request_button_container: {
    backgroundColor: primaryDark,
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  request_button_title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  input: {
    flex: 1,
    width: '40%',
    alignSelf: 'center',
  },
});
