import React, {PureComponent} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    SectionList,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {observer} from 'mobx-react';

import {persistStore, userStore} from '../stores';
import {
    drawerHeaderSubTitle,
    drawerHeaderTitle,
    drawerItem,
    fab,
    primary,
    primaryDark,
    subTextItem,
    textDisabled
} from '../constants/colors';
import images from '@assets/images';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';

import {getFileDownloadURL} from '../utils';
import accounting from "accounting";
import {getUserBalance} from "../network/Queries";
import Collapsible from 'react-native-collapsible';
import {NavigationActions, StackActions} from "react-navigation";

const {width, height} = Dimensions.get('window');

// const ImageCacheProgress = createImageProgress(FastImage);

function Header({
                    headerInfo: {
                        name,
                        apartmentName,
                        role,
                        nationalCode,
                        numberOfFloors,
                        numberOfUnits,
                        unit,
                        userUnitNumber,
                        image,
                        imageExists,
                    },
                    onPress,
                    onImageLoad,
                    onTransactionPress
                }) {
    return (
        <View
            style={{
                backgroundColor: primary,
                paddingStart: 16,
                paddingTop: 19,
                paddingBottom: 16,
            }}>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    // left: 10,
                    // right: 0
                }}
            >
                <Image
                    source={images.nd_bg}
                    style={{width: width - 56}}
                />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <View
                    style={{borderRadius: 46, marginEnd: 8}}
                >
                    {/*<ImageCacheProgress*/}
                    {/*    style={{*/}
                    {/*        height: imageExists ? 56 : 1,*/}
                    {/*        width: imageExists ? 56 : 1,*/}
                    {/*        borderRadius: 26,*/}
                    {/*        overflow: 'hidden',*/}
                    {/*    }}*/}
                    {/*    source={{*/}
                    {/*        uri: getFileDownloadURL(image),*/}
                    {/*        headers: {Authorization: 'Bearer ' + persistStore.token},*/}
                    {/*        priority: FastImage.priority.high,*/}
                    {/*    }}*/}
                    {/*    indicator={Progress.Pie}*/}
                    {/*    indicatorProps={{*/}
                    {/*        borderWidth: 2,*/}
                    {/*        color: '#ddd',*/}
                    {/*        unfilledColor: primaryDark*/}
                    {/*    }}*/}
                    {/*    onLoad={onImageLoad}*/}
                    {/*/>*/}
                    {!imageExists && (
                        <Image
                            source={images.default_ProPic}
                            style={{
                                height: 56,
                                width: 56,
                                borderRadius: 26,
                            }}
                        />
                    )}

                </View>

                <View style={{flex: 1}}>
                    <View style={{alignSelf: 'flex-start'}}>
                        <Text style={{
                            color: drawerHeaderTitle,
                            fontFamily: Platform.OS === 'ios' ? 'IRANYekan-Black' : 'IRANYekanBlack',
                            fontSize: 17,
                            alignSelf: 'flex-start'
                        }}>{name}</Text>
                        <View>
                            <Text style={{fontSize: 12, color: drawerHeaderSubTitle}}>
                                {'محمدرضا حیدریان'}
                            </Text>
                            <Text style={{fontSize: 10, color: drawerHeaderSubTitle}}>{'ادمین'}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onPress}
                    style={{height: 60, paddingHorizontal: 16, justifyContent: 'center'}}>

                    <Image
                        source={images.ic_edit}
                        style={{height: 24, width: 24, tintColor: drawerHeaderTitle}}
                    />

                </TouchableOpacity>

            </View>
            {userStore.UnitBalance != null && (
                <TouchableOpacity
                    onPress={onTransactionPress}
                    style={{
                        margin: 7,
                        borderWidth: 1,
                        borderColor: userStore.UnitBalance < 0 ? fab : 'white',
                        borderRadius: 15,
                        backgroundColor: userStore.UnitBalance < 0 ? 'rgba(255, 193, 7, 0.5)' : 'rgba(255, 255, 255, 0.24)',
                        marginTop: 16,
                        marginEnd: 16,
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                        paddingStart: 16,
                        paddingEnd: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{flex: 1}}>
                            <Text style={{
                                paddingVertical: 10,
                                color: drawerHeaderTitle,
                                fontSize: 12,
                                alignSelf: 'flex-start'
                            }}>حسابداری</Text>
                        </View>


                        <Text style={{
                            color: drawerHeaderTitle,
                            fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
                            fontSize: 15,
                            writingDirection: 'ltr'
                        }}>
                            {userStore.UnitBalance === 0 ? 'حسابی ندارید' : accounting.formatMoney(userStore.UnitBalance, "", 0, ",")}
                        </Text>
                        {userStore.UnitBalance !== 0 && (
                            <Text style={{
                                color: drawerHeaderTitle,
                                fontSize: 12,
                            }}> {userStore.CurrencyID}</Text>
                        )}
                        <View style={{marginTop: 5}}>
                            <Image
                                source={images.ic_left}
                                style={{width: 24, height: 24, tintColor: drawerHeaderTitle}}
                            />
                        </View>

                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

class HeaderList extends PureComponent {
    constructor() {
        super();
        this.animatedExpandValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.animateExpand(false);
    }

    animateExpand(isExpand) {
        Animated.spring(
            this.animatedExpandValue, {
                toValue: isExpand ? 1 : 0,
                duration: 500,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }).start();
    }

    render() {
        const {item, onHeaderPress, isExpand} = this.props;
        this.animateExpand(isExpand);
        let animateExpandRotate = this.animatedExpandValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        });
        return (
            <TouchableWithoutFeedback onPress={() => onHeaderPress(item.title)}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingTop: 25,
                        paddingBottom: 10,
                    }}
                >
                    <View style={{flex: 1}}>
                        <Text
                            style={{fontSize: 12, color: subTextItem, alignSelf: 'flex-start'}}
                        >
                            {item.title}
                        </Text>
                    </View>


                    <Animated.Image
                        source={images.ic_expand}
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: subTextItem,
                            transform: [{rotate: animateExpandRotate}],
                        }}
                    />
                </View>

            </TouchableWithoutFeedback>
        )
    }

}

function DrawerRow({text, icon, onPress}) {
    return (
        <TouchableOpacity style={{backgroundColor: 'white', flex: 1}} onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flex: 1,
                }}
            >
                <Image
                    source={icon}
                    style={{height: 24, width: 24, tintColor: drawerItem}}
                />
                <View
                    style={{flex: 1}}
                >
                    <Text
                        style={{
                            // flex: 1,
                            fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
                            fontSize: 14,
                            color: drawerItem,
                            // marginVertical: 12,
                            marginStart: 32,
                            alignSelf: 'flex-start'
                        }}
                    >
                        {text}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

@observer
export default class DrawerPanel extends PureComponent {
    state = {
        imageExists: false,
    };

    // async componentDidMount() {
    //     await getUserBalance().then(result => userStore.setUnitBalance(result.find(obj => obj.UnitID === userStore.UnitID).UnitBalance))
    //     this.groupBy();
    // }


    render() {
        const {
            RoleName,
            BuildingName,
            NameOfUser,
            NumberOfFloors ,
            NumberOfUnits,
            UserImage,
            UnitNumber,
            NationalCode,
            Form
        } = userStore;

        return (
            <View style={{flex: 1}}>

                {this.state.imageExists ? (
                    <View>
                        <Header
                            headerInfo={{
                                name: 'محمدرضا حیدریان',
                                apartmentName: BuildingName,
                                role: 'ادمین',
                                nationalCode: NationalCode,
                                numberOfFloors: NumberOfFloors,
                                numberOfUnits: NumberOfUnits,
                                image: UserImage,
                                imageExists: this.state.imageExists,
                                userUnitNumber: UnitNumber,
                            }}
                            onPress={() => this.goToProfile()}
                            onImageLoad={() => {
                                this.setState({imageExists: true});
                            }}
                            onTransactionPress={() => this.goToTransaction()}

                        />
                    </View>
                ) : (
                    <Header
                        headerInfo={{
                            name: NameOfUser,
                            apartmentName: BuildingName,
                            role: RoleName,
                            nationalCode: NationalCode,
                            numberOfFloors: NumberOfFloors,
                            numberOfUnits: NumberOfUnits,
                            image: UserImage,
                            imageExists: this.state.imageExists,
                            userUnitNumber: UnitNumber,
                        }}
                        onPress={() => this.goToProfile()}
                        onImageLoad={() => {
                            this.setState({imageExists: true});
                        }}
                        onTransactionPress={() => this.goToTransaction()}

                    />
                )}

                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, marginTop: 24}}>
                    <DrawerRow
                        icon={images.ic_nd_logout}
                        onPress={this.logout.bind(this)}
                        text="تنظیمات"
                    />
                    <DrawerRow
                        icon={images.ic_nd_logout}
                        onPress={this.logout.bind(this)}
                        text="راهنما"
                    />
                    <DrawerRow
                        icon={images.ic_nd_logout}
                        onPress={this.logout.bind(this)}
                        text="قوانین و مقررات"
                    />
                    <DrawerRow
                        icon={images.ic_nd_logout}
                        onPress={this.logout.bind(this)}
                        text="تماس با پشتیبانی"
                    />
                    <DrawerRow
                        icon={images.ic_nd_logout}
                        onPress={this.logout.bind(this)}
                        text="انتقادات و پیشنهادات"
                    />
                    <DrawerRow
                        icon={images.ic_nd_logout}
                        onPress={this.logout.bind(this)}
                        text="خروج از حساب کاربری"
                    />
                </View>

            </View>
        );
    }

    onHeaderPress = title => {
        this.setState({
            activeSection: this.state.activeSection === title
                ? ''
                : title,
        });
    };

    drawerNavigate(destination) {
        this.onHeaderPress('');
        this.props.navigation.navigate(destination);
        this.props.navigation.closeDrawer();
    }

    async logout() {
        //TODO
        // await setPushIDQuery(persistStore.username, null);
        persistStore.clearStore();
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Welcome'})],
        });

        this.props.navigation.dispatch(resetAction);
    }

    goToProfile() {
        this.props.navigation.navigate('Profile');
        this.props.navigation.closeDrawer();
    }

    goToTransaction() {
        this.props.navigation.navigate('Transaction');
        this.props.navigation.closeDrawer();
    }

}

