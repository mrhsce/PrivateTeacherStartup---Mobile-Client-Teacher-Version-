/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SwitchText, Toolbar} from '../components';

import images from '@assets/images';

import {
  background,
  gray,
  primary,
  primaryDark,
  white,
} from '../constants/colors';

import {userStore} from '../stores';

type Props = {};

class FooterMenu extends PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    const {
      selection = 'home',
      onHomeClicked,
      onNotificationClicked,
      onHistoryClicked,
    } = this.props;

    return (
      <View style={styles.footerMenu}>
        {selection == 'history' && (
          <View style={styles.footerMenuActiveItem}>
            <View style={styles.footerMenuActiveItemIconBox}>
              <Image
                source={images.ic_Kind}
                style={styles.footerMenuActiveItemIcon}
              />
            </View>
            <Text style={styles.footerMenuActiveItemText}>تاریخچه</Text>
          </View>
        )}
        {selection != 'history' && (
          <TouchableOpacity
            onPress={onHistoryClicked}
            style={styles.footerMenuInactiveItem}>
            <Image
              source={images.ic_Kind}
              style={{height: 32, width: 32, tintColor: gray}}
            />
          </TouchableOpacity>
        )}
        {selection == 'home' && (
          <View style={styles.footerMenuActiveItem}>
            <View style={styles.footerMenuActiveItemIconBox}>
              <Image
                source={images.ic_home}
                style={styles.footerMenuActiveItemIcon}
              />
            </View>
            <Text style={styles.footerMenuActiveItemText}>خانه</Text>
          </View>
        )}
        {selection != 'home' && (
          <TouchableOpacity
            onPress={onHomeClicked}
            style={styles.footerMenuInactiveItem}>
            <Image
              source={images.ic_home}
              style={{height: 32, width: 32, tintColor: gray}}
            />
          </TouchableOpacity>
        )}
        {selection == 'notification' && (
          <View style={styles.footerMenuActiveItem}>
            <View style={styles.footerMenuActiveItemIconBox}>
              <Image
                source={images.ic_notifications}
                style={styles.footerMenuActiveItemIcon}
              />
            </View>
            <Text style={styles.footerMenuActiveItemText}>اعلان‌ها</Text>
          </View>
        )}
        {selection != 'notification' && (
          <TouchableOpacity
            onPress={onNotificationClicked}
            style={styles.footerMenuInactiveItem}>
            <Image
              source={images.ic_notifications}
              style={{height: 32, width: 32, tintColor: gray}}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

class MenuCard extends PureComponent {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    const {title, description, image, onClick, disabled = false} = this.props;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          padding: 10,

          // flexDirection: 'row',
          // borderWidth: 1,
          // // alignItems: 'center',
          // justifyContent: 'center',
          // borderRadius: 10,
          // marginVertical: 7
        }}
        onPress={onClick}
        disabled={disabled}>
        <ImageBackground
          source={image}
          style={{
            padding: 5,
            borderRadius: 10,
            overflow: 'hidden',
            flex: 1,
            resizeMode: 'stretch',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
            }}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 10,
                color: 'white',
              }}>
              {description}
            </Text>
            <Image
              source={images.ic_left}
              style={{height: 32, width: 32, tintColor: 'white'}}
            />
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

class HomeTab extends PureComponent {
  constructor() {
    super();

    this.state = {
      isUserAvailable: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.switchContainer}>
          <SwitchText
            big
            value={this.state.isUserAvailable}
            onValueChange={val => {
              this.setState({isUserAvailable: val});
            }}
            activeText={'فعال'}
            inactiveText={'غیرفعال'}
            backgroundActive={primaryDark}
            backgroundInactive={'white'}
            activeTextStyle={{paddingHorizontal: 5, paddingVertical: 7}}
            inactiveTextStyle={{paddingHorizontal: 5, paddingVertical: 7}}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MenuCard
            title={'درخواست‌ها'}
            description={'تمامی درخواست‌های تدریس شما'}
            image={images.logo}
            onClick={() => this.props.navigation.navigate('LessonsManagement')}
          />
          <MenuCard
            title={'برنامه هفتگی'}
            description={'مشاهده و ویرایش برنامه هفتگی'}
            image={images.logo}
            onClick={() => this.props.navigation.navigate('TimeTableManagement')}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems: 'center',دیم
            justifyContent: 'center',
          }}>
          <MenuCard
            title={'افزایش درآمد'}
            description={'راهکارهایی برای افزایش درآمد'}
            image={images.logo}
            onClick={() => this.props.navigation.navigate('DistrictsManagement')}
          />
          <MenuCard
            title={'کلاس‌ها'}
            description={'تمامی کلاس‌های شما'}
            image={images.logo}
            onClick={() => this.props.navigation.navigate('TeacherBrief')}
          />
        </View>
      </View>
    );
  }
}

class HistoryTab extends PureComponent {
  constructor() {
    super();

    this.state = {
      isUserAvailable: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MenuCard
            title={'درخواست‌ها'}
            description={'تمامی درخواست‌های تدریس شما'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
          <MenuCard
            title={'برنامه هفتگی'}
            description={'مشاهده و ویرایش برنامه هفتگی'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MenuCard
            title={'افزایش درآمد'}
            description={'راهکارهایی برای افزایش درآمد'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
          <MenuCard
            title={'کلاس‌ها'}
            description={'تمامی کلاس‌های شما'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
        </View>
      </View>
    );
  }
}

class NotificationTab extends PureComponent {
  constructor() {
    super();

    this.state = {
      isUserAvailable: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MenuCard
            title={'درخواست‌ها'}
            description={'تمامی درخواست‌های تدریس شما'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
          <MenuCard
            title={'برنامه هفتگی'}
            description={'مشاهده و ویرایش برنامه هفتگی'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MenuCard
            title={'افزایش درآمد'}
            description={'راهکارهایی برای افزایش درآمد'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
          <MenuCard
            title={'کلاس‌ها'}
            description={'تمامی کلاس‌های شما'}
            image={images.logo}
            onClick={() => alert('clicked')}
          />
        </View>
      </View>
    );
  }
}

export default class Main extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      isUserAvailable: false,
      shownPage: 'home',
      pageTitle: 'خانه',
    };
  }

  componentDidMount() {
  }

  onPressMenu() {
    this.props.navigation.openDrawer();
  }

  render() {
    const toolbarStyle = {
      start: {
        onPress: this.onPressMenu.bind(this),
        content: images.ic_menu,
      },
      title: this.state.pageTitle,
      // main: {
      //     // onPress: accountsStore.accounts.length > 1 ? this.onPressAccount.bind(this) : null,
      //     title: 'خانه',
      //     // subTitle: userStore.BuildingName + userStore.UnitNumber
      // },
    };

    return (
      <View style={{flex: 1}}>
        <Toolbar customStyle={toolbarStyle} />

        {this.state.shownPage == 'home' && <HomeTab  navigation={this.props.navigation}/>}

        {this.state.shownPage == 'notification' && <HistoryTab />}

        {this.state.shownPage == 'history' && <NotificationTab />}

        <FooterMenu
          selection={this.state.shownPage}
          onHomeClicked={() => {
            this.setState({shownPage: 'home', pageTitle: 'خانه'});
          }}
          onNotificationClicked={() => {
            this.setState({shownPage: 'notification', pageTitle: 'اعلان‌ها'});
          }}
          onHistoryClicked={() => {
            this.setState({shownPage: 'history', pageTitle: 'تاریخچه'});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
    padding: 20,
    paddingBottom: 30,
  },
  footerMenu: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: white,
  },
  footerMenuInactiveItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerMenuActiveItem: {
    flex: 1,
    marginTop: -35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerMenuActiveItemIconBox: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: primary,
    borderRadius: 20,
  },
  footerMenuActiveItemIcon: {
    height: 32,
    width: 32,
    tintColor: white,
  },
  footerMenuActiveItemText: {
    color: primary,
    fontFamily:
      Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
  },
  switchContainer: {
    flex: 0.2,
    width: '100%',
  },
  menuCard: {},
});
