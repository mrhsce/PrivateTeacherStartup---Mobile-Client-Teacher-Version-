/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {MKTextField} from 'react-native-material-kit';
import {mapNumbersToEnglish, fetchStore} from '../utils';
import images from '@assets/images';
import {getOTPforSignIn, checkOTPforSignIn, signUp} from '../network/Queries';
import Toast from 'react-native-simple-toast';

import {Toolbar, LoadingPopUp, ToastCard} from '../components';
import persistStore from '../stores/PersistStore';
import {primaryDark} from '../constants/colors';

type Props = {};
export default class SignIn extends Component<Props> {
  constructor() {
    super();
    this.state = {
      state: 'enter-number',
      // state: "enter-info",
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
      title: 'ورود به حساب کاربری',
    };
    return (
      <View style={{flex: 1}}>
        <Toolbar customStyle={toolbarStyle} />
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
    let response = await getOTPforSignIn(number);

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
    let response = await checkOTPforSignIn(otp, number);

    if (response) {
      this.props.navigation.navigate('Main');
    } else {
      this.setState({
        showNotification: true,
        notificationType: 'error',
        notificationMessage: 'کد احراز هویت وارد شده نادرست است.',
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
