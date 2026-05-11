import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image, Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {MKTextField} from 'react-native-material-kit';

import Color, {primaryDark} from '../constants/colors';
import {AndroidBackButton, Card, Overlay, Toolbar} from '../components';
import images from '@assets/images';
import {persistStore, userStore} from '../stores';
import {getFileDownloadURL, uploadFile} from '../utils';
import {changeUserPassword, changeUserPhotoQuery} from '../network/Queries';

import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import {createImageProgress} from 'react-native-image-progress';
import Permissions from 'react-native-permissions';

// const ImageCacheProgress = createImageProgress(FastImage);

function SectionRow({title, data, editable = false}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
                style={{
                    color: Color.primaryDark,
                    flex: 1.5,
                }}
            >
                {title}
            </Text>
            <Text style={{flex: 1, textAlign: 'left'}}>{data}</Text>
        </View>
    );
}

function Section({header, data = []}) {
    return (
        <Card style={{
            elevation: 2, shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
        }}>
            <Text style={sectionStyle.headerText}>{header}</Text>
            <View style={{paddingHorizontal: 8}}>
                {data.map(item => <SectionRow {...item} />)}
            </View>
        </Card>
    );
}

const sectionStyle = StyleSheet.create({
    headerText: {
        color: Color.textColor,
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'center',
    },
});

class ListSelect extends Component {
    render() {
        const {items} = this.props;
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.5,
                    borderRadius: 2,
                    width: 250,
                    padding: 8,
                }}
            >
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={items}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingVertical: 8,
                                borderBottomWidth: 0.5
                            }}
                            onPress={this.onItemSelect.bind(this, item.onPress, item.type)}
                        >
                            <Text style={{flex: 1, color: 'black', alignSelf: 'flex-start'}}>{item.title}</Text>
                            <Image
                                source={item.icon}
                                style={{tintColor: primaryDark, height: 24, width: 24, marginHorizontal: 7}}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    onItemSelect(value, type) {
        this.props.onItemSelected(value, type);
    }
}

function UserImageSection({image, onPress, onImageLoad, imageExists}) {
    return (
        <View style={userImageSectionStyle.container}>
            <TouchableOpacity
                onPress={onPress}
                style={userImageSectionStyle.imageContainer}
            >

                    {/*<ImageCacheProgress*/}
                    {/*    style={{*/}
                    {/*        height: imageExists ? 160 : 1,*/}
                    {/*        width: imageExists ? 160 : 1,*/}
                    {/*        borderRadius: 80,*/}
                    {/*        overflow: `hidden`,*/}
                    {/*        resizeMode: 'cover',*/}
                    {/*    }}*/}
                    {/*    source={{*/}
                    {/*        uri: image,*/}
                    {/*        headers: {Authorization: 'Bearer ' + persistStore.token},*/}
                    {/*        priority: FastImage.priority.high,*/}
                    {/*    }}*/}
                    {/*    indicator={Progress.Pie}*/}
                    {/*    indicatorProps={{*/}
                    {/*        borderWidth: 0,*/}
                    {/*        color: Color.primaryDark,*/}
                    {/*        unfilledColor: Color.primary*/}
                    {/*    }}*/}
                    {/*    onLoad={onImageLoad}*/}
                    {/*/>*/}
                {/*{!imageExists &&*/}
                    <Image source={images.default_ProPic} />
                {/*}*/}

            </TouchableOpacity>
        </View>
    );
}

const userImageSectionStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 8,
        justifyContent: 'center',
        marginBottom: 32,
    },
    imageContainer: {
        backgroundColor: Color.white,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        borderRadius: 80,
    },
    image: {
        height: 160,
        width: 160,
        borderRadius: 80,
        resizeMode: 'cover',
    },
});

function SectionEditableRow({
                                title,
                                value,
                                onChange,
                                returnKeyType = 'next',
                                isEmpty = false,
                                essentail = true,
                                password = true,
                                placeholder,
                            }) {
    return (
        <View style={editableRowStyle.container}>
            <Text style={editableRowStyle.title}>{title}</Text>
            <MKTextField
                multiline={false}
                keyboardType={'numeric'}
                returnKeyType={returnKeyType}
                floatingLabelEnable={false}
                tintColor={
                    isEmpty && essentail && value === ''
                        ? 'red'
                        : Color.placeholderTextColor
                }
                textInputStyle={editableRowStyle.input}
                underlineSize={1}
                placeholder={placeholder}
                style={{flex: 1}}
                onChangeText={text => onChange(text)}
                highlightColor={Color.primary}
                value={value}
                password={password}
            />
        </View>
    );
}

const editableRowStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
    },
    title: {
        color: Color.primaryDark,
        fontSize: 14,
        flex: 1,
    },
    input: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
});

class UserInfoSection extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        isAlreadyAttemtedToSave: false,
        isSaving: false,
        message: {text: null, color: Color.primary, enable: false},
    };

    render() {
        const {header, username, onSave} = this.props;
        return (
            <Card style={userInfoSectionStyle.cardWrapper}>
                <Text style={userInfoSectionStyle.header}>{header}</Text>
                <View style={{paddingHorizontal: 24}}>
                    <SectionRow title="شناسه کاربری" data={username}/>
                    <SectionRow title="نام کاربر" data={userStore.NameOfUser}/>
                    <SectionRow title="شماره واحد" data={userStore.UnitNumber || 'ندارد'}/>
                    <SectionRow title="دسترسی کاربر" data={userStore.RoleName}/>
                    <SectionEditableRow
                        title="رمز قبلی"
                        value={this.state.oldPassword}
                        onChange={oldPassword => this.setState({oldPassword})}
                        isEmpty={
                            this.state.isAlreadyAttemtedToSave && this.state.oldPassword === ''
                        }
                        placeholder={'******'}
                    />
                    <SectionEditableRow
                        title="رمز جدید"
                        value={this.state.newPassword}
                        onChange={newPassword => this.setState({newPassword})}
                        isEmpty={
                            this.state.isAlreadyAttemtedToSave && this.state.newPassword === ''
                        }
                        placeholder={'******'}
                    />
                    <SectionEditableRow
                        title="تایید رمز جدید"
                        value={this.state.confirmNewPassword}
                        onChange={confirmNewPassword =>
                            this.setState({confirmNewPassword})
                        }
                        isEmpty={
                            this.state.isAlreadyAttemtedToSave &&
                            this.state.confirmNewPassword === ''
                        }
                        placeholder={'******'}
                        returnKeyType="done"
                    />
                </View>
                {this.state.message.enable && (
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 32,
                            color: this.state.message.color,
                        }}
                    >
                        {this.state.message.text}
                    </Text>
                )}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: this.state.message.enable ? 8 : 32,
                    }}
                >
                    <TouchableOpacity
                        style={userInfoSectionStyle.button}
                        onPress={() => this.saveNewPassword()}
                        disabled={this.state.isSaving}
                    >
                        {this.state.isSaving ? (
                            <ActivityIndicator color={Color.white} size={'large'}/>
                        ) : (
                            <Text style={userInfoSectionStyle.buttonText}>تغییر رمز</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </Card>
        );
    }

    async saveNewPassword() {
        const validateRes = this.validatePasswordInputs();
        this.setState({
            message: validateRes.message,
            isAlreadyAttemtedToSave: true,
        });

        if (!validateRes.status) return;

        this.setState({isSaving: true});
        const changePassRes = await changeUserPassword(
            this.state.oldPassword,
            this.state.newPassword,
        );
        this.setState({isSaving: false});
        if (changePassRes) {
            this.setState({
                oldPassword: null, newPassword: null, confirmNewPassword: null,
                message: {
                    text: 'رمز شما با موفقیت عوض شد',
                    color: Color.primary,
                    enable: true,
                },
            });
        } else {
            this.setState({
                message: {
                    text: 'خطا در ثبت رمز جدید',
                    color: Color.errorColor,
                    enable: true,
                },
            });
        }

    }

    validatePasswordInputs() {
        if (this.state.oldPassword === '') {
            return {
                status: false,
                message: {
                    text: 'رمز قبلی خود را وارد کنید',
                    color: Color.errorColor,
                    enable: true,
                },
            };
        } else if (this.state.newPassword !== this.state.confirmNewPassword) {
            return {
                status: false,
                message: {
                    text: 'تایید رمز جدید اشتباه وارد شده‌ است',
                    color: Color.errorColor,
                    enable: true,
                },
            };
        } else if (
            this.state.newPassword === '' ||
            this.state.confirmNewPassword === ''
        ) {
            return {
                status: false,
                message: {
                    text: 'پر کردن همه فیلد‌ها اجباری است',
                    color: Color.errorColor,
                    enable: true,
                },
            };
        } else {
            return {status: true, message: {enable: false}};
        }
    }
}

const userInfoSectionStyle = StyleSheet.create({
    cardWrapper: {
        elevation: 2, shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5, padding: 0, paddingTop: 16
    },
    header: {
        color: Color.textColor,
        fontSize: 16,
        marginVertical: 8,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 16,
        backgroundColor: Color.primaryDark,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Color.white,
        fontSize: 16,
    },
});

export default class Profile extends Component {
    state = {
        image: userStore.UserImage ? getFileDownloadURL(userStore.UserImage) : null,
        imageExists: false,
    };

    checkPermissions = () => {
        Permissions.checkMultiple(['camera', 'photo']).then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({
                cameraPermission: response.camera,
                photoPermission: response.photo,
            })
        });
    };

    componentDidMount() {
        this.checkPermissions();
    }

    render() {

        const toolbarStyle = {
            start: {
                onPress: this.onBackPress.bind(this),
                content: images.ic_back,
            },
            title:  'صفحه کاربر',
        };
        return (
            <View style={styles.container}>
                <Toolbar customStyle={toolbarStyle}/>
                <ScrollView>
                    <AndroidBackButton
                        onPress={() => {
                            this.onBackPress();
                            return true;
                        }}
                    />
                    <View style={styles.subcontainer}>
                        {this.state.imageExists ? (
                            <View>
                                <UserImageSection
                                    image={this.state.image}
                                    imageExists = {true}
                                    onPress={() => this.showSelectPicker()}
                                    onImageLoad={() => {this.setState({imageExists: true});}}
                                />
                            </View>
                        ) : (
                            <UserImageSection
                                image={this.state.image}
                                imageExists = {this.state.imageExists}
                                onPress={() => this.showSelectPicker()}
                                onImageLoad={() => {this.setState({imageExists: true});}}
                            />
                        )
                        }
                        <UserInfoSection
                            username={persistStore.username}
                            header="مشخصات کاربر"
                        />
                    </View>
                </ScrollView>

                {this.state.showSelectPicker && (
                    <Overlay
                        catchTouch={true}
                        onPress={() => this.hideSelectPicker()}
                    >
                        <ListSelect
                            items={[
                                {title: "دوربین", onPress: true, icon: images.cameraIcon, type: "camera"},
                                {title: "گالری", onPress: false, icon: images.galleryIcon, type: "gallery"},
                            ]}
                            onItemSelected={(isCamera, type) => this.onUserImagePress(isCamera)}
                        />
                    </Overlay>
                )}
            </View>
        );
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    showSelectPicker() {
        this.setState({
            showSelectPicker: true,
        });
    }
    hideSelectPicker() {
        this.setState({
            showSelectPicker: false,
        });
    }

    onUserImagePress(isCamera) {
        this.hideSelectPicker();
        if (isCamera) {
            if (this.state.cameraPermission === 'authorized') {
                ImagePicker.openCamera({
                    width: 600,
                    height: 600,
                    cropping: true,
                }).then(async image => {
                    const {mime, path} = image;
                    const res = await uploadFile(path);
                    const fileName = res.fileName;
                    userStore.UserImage = fileName;

                    this.setState({
                        image: getFileDownloadURL(fileName),
                    });
                    const changePhotoRes = await changeUserPhotoQuery(fileName);
                });
            } else if (this.state.cameraPermission !== 'restricted') {
                if (Platform.OS === 'ios' && this.state.cameraPermission === 'denied') {
                    this.alertForIosPermission('دوربین')
                } else {
                    this._requestPermission('camera')
                }
            }
        } else {
            if (this.state.photoPermission === 'authorized') {
                ImagePicker.openPicker({
                    width: 600,
                    height: 600,
                    cropping: true,
                }).then(async image => {
                    const {mime, path} = image;
                    const res = await uploadFile(path);
                    const fileName = res.fileName;
                    userStore.UserImage = fileName;

                    this.setState({
                        image: getFileDownloadURL(fileName),
                    });
                    const changePhotoRes = await changeUserPhotoQuery(fileName);
                });
            } else if (this.state.photoPermission !== 'restricted') {
                if (Platform.OS === 'ios' && this.state.photoPermission === 'denied') {
                    this.alertForIosPermission('گالری تصاویر')
                } else {
                    this._requestPermission('photo')
                }
            }
        }
    }

    _requestPermission(type) {
        Permissions.request(type).then(response => {
            if (type === 'camera') this.setState({cameraPermission: response});
            else this.setState({photoPermission: response});
            if (response === 'authorized') this.onUserImagePress(type === 'camera')
        })
    }

    alertForIosPermission(title) {
        Alert.alert(
            'اجازه دسترسی به ' + title,
            'شما مجوز لازم را صادر نکرده اید از طریق تنظیمات اقدام نمایید!',
            [
                {
                    text: 'لغو',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                { text: 'باز کردن تنظیمات', onPress: Permissions.openSettings },
            ],
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    subcontainer: {
        flex: 1,
        padding: 8,
    },
});
