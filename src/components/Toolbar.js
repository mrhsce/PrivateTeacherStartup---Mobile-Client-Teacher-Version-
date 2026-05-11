import React, {PureComponent} from 'react';
import {
    Animated,
    Dimensions,
    Image,
    LayoutAnimation,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';
import {bgItemRed, primary, primaryDark, textItemRed, toolbarItem} from '../constants/colors';
import images from '@assets/images';

const {height, width} = Dimensions.get('window');

export default class Toolbar extends PureComponent {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this.animatedExpandValue = new Animated.Value(0);
        this.animatedSearchIconValue = new Animated.Value(0);
        this.animatedCloseSearchIconValue = new Animated.Value(0);
        this.state = {
            showStart: !!props.customStyle.start,
            showSearch: false,
            titleWidth: 0,
        };
    }

    componentDidMount() {
        if (this.props.customStyle.main)
            this.animateExpand(false);
        if (this.props.customStyle.search)
            this.animatedSearchIcon(false);
    }

    animateExpand(isExpand) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        this.setState({showStart: !isExpand});

        Animated.spring(
            this.animatedExpandValue, {
                toValue: isExpand ? 1 : 0,
                duration: 500,
                // friction: 3,
                // tension: 40,
                useNativeDriver: true,
            }).start(/*() => isExpand ? this.props.customStyle.main.onPress() : null*/);
    }

    animatedSearchIcon(isOpen) {
        Animated.parallel([
            Animated.timing(
                this.animatedSearchIconValue, {
                    toValue: isOpen ? 1 : 0,
                    duration: 400,
                    // friction: 3,
                    // tension: 40,
                    // useNativeDriver: true,
                }),
            Animated.timing(
                this.animatedCloseSearchIconValue, {
                    toValue: isOpen ? 0 : 1,
                    duration: 400,
                    // delay: 200
                    // friction: 3,
                    // tension: 40,
                    // useNativeDriver: true,
                })
        ]).start(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            this.setState({showSearch: isOpen});
        });


    }

    render() {
        const {start, title, main, end, search, sort} = this.props.customStyle;
        const titleAllowWidth = width - (start ? 56 : 0) - (end ? 56 : 0) - (search ? 56 : 0);
        const titleAllowLength = Math.floor(titleAllowWidth / (search ? 14 : 11));
        let animateExpandRotate, animateSearchIcon, animateCloseSearchIcon;
        if (main) {
            const {isExpand} = this.props;
            if (!isExpand) this.animateExpand(false);

            animateExpandRotate = this.animatedExpandValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg']
            });
        }

        if (search) {
            animateSearchIcon = this.animatedSearchIconValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '90deg']
            });
            animateCloseSearchIcon = this.animatedCloseSearchIconValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '90deg']
            });
        }

        return (
            <View
                style={{
                    backgroundColor: primary,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    height: 65,
                    elevation: 4,
                    // shadowColor: '#000',
                    // shadowOffset: {width: 0, height: 1},
                    // shadowOpacity: 0.5,
                }}
            >
                <StatusBar backgroundColor={primaryDark} barStyle="light-content"/>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        // justifyContent: 'flex-end',
                    }}
                >
                    {this.state.showStart ? (
                        <TouchableOpacity
                            onPress={start.onPress}
                            style={[styles.actionIcon]}>
                            <Image
                                source={start.content}
                                style={[styles.img]}
                            />
                        </TouchableOpacity>
                    ) : (<View style={{marginStart: 72}}/>)}
                    {title && (
                        <View style={{paddingTop: 3, flex: 1}}>
                            <Text style={[styles.title]}>
                                {title.length < titleAllowLength ? title : title.substring(0, titleAllowLength) + '...'}
                            </Text>
                            {/*<Text> w:{titleAllowWidth} | l:{titleAllowLength} | tl:{title.length}</Text>*/}
                        </View>
                    )}
                    {main && (
                        <View
                            style={{
                                flexDirection: 'row',
                                flex: 1,
                                // alignItems: 'center',
                                // justifyContent: 'center'
                            }}
                        >
                            <View style={{flex: .5}}/>
                            <TouchableOpacity
                                onPress={() => {
                                    main.onPress();
                                    this.animateExpand(true);
                                }}
                                disabled={!main.onPress}
                                style={{
                                    flexDirection: 'row',
                                    flex: 2,
                                    alignItems: 'center'
                                }}
                            >
                                <View style={{flex: 1}}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 20,
                                            alignSelf: 'flex-end',
                                            fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
                                        }}>
                                        {main.title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'white',
                                            fontSize: 14,
                                            alignSelf: 'flex-end',
                                            marginBottom: 9
                                        }}>
                                        {main.subTitle}
                                    </Text>
                                </View>

                                {main.onPress && (
                                    <Animated.Image
                                        source={images.ic_expand}
                                        style={[styles.img, {
                                            transform: [{rotate: animateExpandRotate}],
                                            marginHorizontal: 16
                                        }]}
                                    />
                                )}

                            </TouchableOpacity>
                        </View>

                    )}
                    {end && (
                        <View>
                            {end.icon ? (
                                <TouchableOpacity
                                    onPress={end.onPress}
                                    style={[styles.actionIcon]}
                                >
                                    <Image
                                        source={end.icon}
                                        style={[styles.img]}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <View style={{flexDirection: 'row', alignItems: 'center', marginEnd: 16}}>
                                    <Text style={{
                                        color: toolbarItem,
                                        fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
                                        alignSelf: 'flex-start',
                                    }}>{end.content1}</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: toolbarItem,
                                    }}>  {end.content2}</Text>
                                </View>
                            )}
                        </View>
                    )}
                    {sort && (
                        <TouchableOpacity
                            onPress={sort.onPress}
                            style={[styles.actionIcon]}
                        >
                            <Image
                                source={images.ic_filter}
                                style={[styles.img]}
                            />
                        </TouchableOpacity>
                    )}
                    {search && (
                        <TouchableOpacity
                            onPress={() => {
                                search.onClose();
                                this.setState({searchText: ''});
                                this.animatedSearchIcon(!this.state.showSearch);
                            }}
                            style={[styles.actionIcon]}
                        >
                            {this.state.showSearch ? (
                                <Animated.Image
                                    source={images.ic_close}
                                    style={[styles.img,
                                        /*{
                                            transform: [
                                                {rotateY: animateCloseSearchIcon},
                                                {rotateZ: animateCloseSearchIcon},
                                            ],
                                        }*/
                                    ]}
                                />
                            ) : (
                                <Animated.Image
                                    source={images.ic_search}
                                    style={[styles.img,
                                        {
                                            transform: [
                                                {rotateY: animateSearchIcon},
                                                {rotateZ: animateSearchIcon},
                                            ],
                                        }
                                    ]}
                                />
                            )}

                        </TouchableOpacity>
                    )}


                </View>
                {this.state.showSearch && (
                    <View
                        style={[styles.searchContainer]}>
                        {search.typeName && (
                            <TouchableOpacity
                                style={[styles.searchTypeBtn]}
                                onPress={search.onPressType}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    color: textItemRed,
                                }}>
                                    {search.typeName.length > 13 ? search.typeName.substring(0, 10) + "..." : search.typeName}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TextInput
                            style={[styles.textSearch]}
                            placeholder="جستجو کنید"
                            onChangeText={(searchText) => {
                                search.onTextChange(searchText);
                                this.setState({searchText: searchText})
                            }}
                            maxLength={100}
                            multiline={false}
                            numberOfLines={1}
                            value={this.state.searchText}
                        />
                    </View>
                )}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        tintColor: toolbarItem,
        height: 24,
        width: 24,
    },
    title: {
        color: toolbarItem,
        fontSize: 20,
        fontFamily: Platform.OS === 'ios' ? 'IRANYekan-Medium' : 'IRANYekanMedium',
        alignSelf: 'flex-start',
    },
    actionIcon: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        height: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        height: 40,
        position: 'absolute',
        bottom: 10,
        start: 8,
        end: 48,
        // width: 350,
        backgroundColor: 'white',
        borderRadius: 10,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    textSearch: {
        height: 40,
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'right',
        fontSize: 14,
        fontFamily: Platform.OS === 'ios' ? 'IRANYekan-Medium' : 'IRANYekanMedium',
        paddingTop: 8,
        paddingBottom: 5,
        paddingStart: 8
    },
    searchTypeBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minWidth: 80,
        maxWidth: 100,
        backgroundColor: bgItemRed,
        paddingHorizontal: 8,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10
    }

});
