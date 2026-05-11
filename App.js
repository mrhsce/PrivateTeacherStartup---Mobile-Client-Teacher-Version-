/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  AsyncStorage,
  Dimensions,
  I18nManager,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';

import * as components from './src/components';
import * as screens from './src/screens';
import {textItem} from './src/constants/colors';

import {createAppContainer} from 'react-navigation';

import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import RNRestart from 'react-native-restart';

const {width} = Dimensions.get('window');

const customTextProps = {
  style: {
    fontSize: 14,
    fontFamily:
      Platform.OS === 'ios' ? 'IRANYekanFaNum' : 'IRANYekanRegular(FaNum)',
    writingDirection: 'rtl',
    color: textItem,
    textAlign: Platform.OS === 'ios' ? 'left' : 'left',
  },
};

//-------------------------Disable Warning-----------------------------------//
console.disableYellowBox = Platform.OS === 'ios' ? true : true;

export default class AmraApp extends Component {
  componentWillMount() {
    // Orientation.lockToPortrait();
    setCustomText(customTextProps);
    setCustomTextInput(customTextProps);
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View style={{flex: 1}}>
          <App />
        </View>
      </SafeAreaView>
    );
  }
}

const MainScreen = createDrawerNavigator(
  {
    Main: {screen: screens.Main},
  },
  {
    drawerWidth: width - 56,
    drawerPosition: 'right',
    contentComponent: components.DrawerPanel,
    header: {
      visible: false,
    },
    // drawerLockMode: 'locked-closed' //'unlocked' | 'locked-open'
  },
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: screens.Splash,
    },
    SignUp: {screen: screens.SignUp},
    SignIn: {screen: screens.SignIn},
    Login: {screen: screens.Login},

    Main: {screen: MainScreen},
    Welcome: {screen: screens.Welcome},
    Profile: {screen: screens.Profile},
    LessonsManagement: {screen: screens.LessonsManagement},
      TimeTableManagement: {screen: screens.TimeTableManagement},
      DistrictsManagement: {screen: screens.DistrictsManagement},
      TeacherBrief: {screen: screens.TeacherBrief}
  },
  {
    headerMode: 'none',
  },
);

const App = createAppContainer(MainNavigator);

async function applyRTL(rtl) {
  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);

  const expected = '' + rtl;
  const RTL_KEY = '@AMRA:isRTL';
  const value = await AsyncStorage.getItem(RTL_KEY);
  if (value !== expected) {
    await AsyncStorage.setItem(RTL_KEY, expected);
    RNRestart.Restart();
  }
}

applyRTL(true);
