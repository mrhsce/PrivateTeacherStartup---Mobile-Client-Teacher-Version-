/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, PureComponent} from 'react';
import {Image, Platform, StyleSheet, Text, View, TouchableOpacity, SectionList, TouchableWithoutFeedback, Animated} from 'react-native';
import Collapsible from 'react-native-collapsible';


type Props = {};
import images from '@assets/images';
import {bgScreen, primaryDark, subTextItem, textDisabled} from "../constants/colors";
import {AndroidBackButton, LoadingPopUp, Toolbar} from "../components";
import {getTeacherHours, setTeacherHours} from "../network/Queries";

// TODO danger, magic number here
const BEFORE_NOON_START = 8;
const BEFORE_NOON_END = 14;

const AFTER_NOON_START = 14;
const AFTER_NOON_END = 23;

class TitledCheckBox extends Component {
    render() {
        const {title, onTitlePress, isSelected} = this.props;
        return (
            <View
                style={{
                    flexDirection: 'column',
                    borderRadius: 3,
                    borderWidth: this.props.borderWidth ? this.props.borderWidth : .7,
                    borderStyle: this.props.borderStyle ? this.props.borderStyle : 'dashed',
                    borderColor: this.props.borderColor ? this.props.borderColor : 'black',
                    padding: 20,
                    paddingTop: 25,
                    marginTop: 20,
                    marginHorizontal: 10,
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => onTitlePress()}
                    style={{
                        flexDirection: 'row',
                        marginVertical: 17,
                        position: 'absolute',
                        backgroundColor: 'white',
                        top: -30,
                        left: 3,
                        paddingHorizontal: 5,
                    }}>
                    <Image
                        source={isSelected ? images.checked_icon : images.unchecked_icon}
                        style={{
                            marginTop: 5,
                            tintColor: primaryDark, height: 17, width: 17,
                        }}
                    />
                    <Text
                        style={{
                            alignSelf: 'flex-start',
                            paddingHorizontal: 3,
                        }}
                    >{title}</Text>

                </TouchableOpacity>

                {this.props.children}
            </View>
        );
    }
}

class TimeSlotBox extends PureComponent {
    render() {
        const {onPress, timeSlot, right = false} = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    marginEnd: right ? 8 : 0,
                    backgroundColor: timeSlot.HasIt ? '#00A28C' : '#F5F1F1',
                    borderWidth: 1,
                    borderColor: timeSlot.HasIt ? '#FFFFFF' : '#E5DEDE',
                    borderRadius: 10,
                }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => onPress(timeSlot.Id)}>
                    <Text
                        style={{
                            flex: 1,
                            marginVertical: 6,
                            fontSize: timeSlot.HasIt ? 14 : 12,
                            textAlign: 'center',
                            color: timeSlot.HasIt ? '#FFFFFF' : '#BFACAC',
                        }}>
                        {timeSlot.Id} تا {timeSlot.Id + 1}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class DayHeader extends PureComponent {
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
            outputRange: ['0deg', '90deg'],
        });
        return (
            <TouchableWithoutFeedback onPress={() => onHeaderPress()}>

                <View
                    style={{
                        marginHorizontal: 20,
                        marginVertical: 7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        overflow: 'hidden',
                    }}
                >
                    <View
                        style={{ position: 'absolute', backgroundColor: item.activeAfternoon ? '#f1c40f' : '#95a5a6', top: 0, height: '60%', width: '100%'}}
                    ></View>

                    <View
                        style={{ position: 'absolute', backgroundColor: item.activeBeforenoon ? '#3498db' : '#95a5a6', bottom: 0, height: '41%', width: '100%'}}
                    ></View>

                    <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 16,
                        paddingVertical: 25,}}>
                        <Text
                            style={{
                                flex: 1,
                                fontSize: 16,
                                fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
                                alignSelf: 'flex-start'}}
                        >
                            {item.title}
                        </Text>
                        <Text
                            style={{
                                flex: 1,
                                fontSize: 16,
                                fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
                                alignSelf: 'flex-start'}}
                        >
                            {item.sumHours && item.sumHours != 0 ? (item.sumHours).toString() + " ساعت" : "تعطیل"}
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
        );
    }

}

class DayContent extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        const {hoursList, onBeforeNoonPress, onAfterNoonPress, onHourPress} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: 'white', marginHorizontal: 20, paddingBottom: 15, paddingHorizontal: 10}}>
                <TitledCheckBox
                title={'قبل از ظهر'}
                onTitlePress={() => {onBeforeNoonPress()}}
                isSelected={hoursList[8] && hoursList[9] && hoursList[10] && hoursList[11] && hoursList[12] && hoursList[13]}
                >
                    <View
                    style={{flexDirection: 'row', marginBottom: 15,}}>
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 8,HasIt: hoursList[8]}}
                        />
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 9,HasIt: hoursList[9]}}
                        />
                        <TimeSlotBox
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 10,HasIt: hoursList[10]}}
                        />
                    </View>
                    <View
                        style={{flexDirection: 'row', marginBottom: 15,}}>
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 11,HasIt: hoursList[11]}}
                        />
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 12,HasIt: hoursList[12]}}
                        />
                        <TimeSlotBox
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 13,HasIt: hoursList[13]}}
                        />
                    </View>

                </TitledCheckBox>

                <TitledCheckBox
                    title={'بعد از ظهر'}
                    onTitlePress={() => {onAfterNoonPress()}}
                    isSelected={ hoursList[14] && hoursList[15] && hoursList[16] && hoursList[17] && hoursList[18] && hoursList[19] && hoursList[20] && hoursList[21] && hoursList[22]}
                >
                    <View
                        style={{flexDirection: 'row', marginBottom: 15,}}>
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 14,HasIt: hoursList[14]}}
                        />
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 15,HasIt: hoursList[15]}}
                        />
                        <TimeSlotBox
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 16,HasIt: hoursList[16]}}
                        />
                    </View>
                    <View
                        style={{flexDirection: 'row', marginBottom: 15,}}>
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 17,HasIt: hoursList[17]}}
                        />
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 18,HasIt: hoursList[18]}}
                        />
                        <TimeSlotBox
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 19,HasIt: hoursList[19]}}
                        />
                    </View>
                    <View
                        style={{flexDirection: 'row', marginBottom: 15,}}>
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 20,HasIt: hoursList[20]}}
                        />
                        <TimeSlotBox
                            right
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 21,HasIt: hoursList[21]}}
                        />
                        <TimeSlotBox
                            onPress={(id) => onHourPress(id)}
                            timeSlot={{Id: 22,HasIt: hoursList[22]}}
                        />
                    </View>

                </TitledCheckBox>
            </View>
        );
    }

}

class MyCollapsible extends  Collapsible{
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.collapsed && !this.props.collapsed) {
            this.setState({measured: false}, () => this._componentWillReceiveProps(nextProps));
        } else {
            this._componentWillReceiveProps(nextProps);
        }
    }

    _componentWillReceiveProps(nextProps) {
        if (nextProps.collapsed !== this.props.collapsed) {
            this._toggleCollapsed(nextProps.collapsed);
        } else if (
            nextProps.collapsed &&
            nextProps.collapsedHeight !== this.props.collapsedHeight
        ) {
            this.state.height.setValue(nextProps.collapsedHeight);
        }
    }

}

export default class TimeTableManagement extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            showLoading: false,
            days: [{title: 'شنبه', data: [{hours: []}], id: 0, isOpen: true}, {title: 'یکشنبه', data: [{hours: []}], id: 1,  isOpen: true},
                {title: 'دوشنبه', data: [{hours: []}], id: 2,  isOpen: false}, {title: 'سه‌شنبه', data: [{hours: []}], id: 3,  isOpen: false},
                {title: 'چهارشنبه', data: [{hours: []}], id: 4,  isOpen: false}, {title: 'پنج‌شنبه', data: [{hours: []}], id: 5,  isOpen: false},
                {title: 'جمعه', data: [{hours: []}], id: 6,  isOpen: false}],
            totalActiveHours: 0,
            totalActiveDays: 0
        }
    }

    componentWillMount(): void {
        this.getHoursList();
    }

    render() {
        const toolbarStyle = {
            start: {
                onPress: this.onBackPressed.bind(this),
                content: images.ic_back,
            },
            title: 'برنامه هفتگی من',
            end: {
                onPress: this.onBackPressed.bind(this),
                icon: images.helpIcon,
            },
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

                <View style={{flex: 1, backgroundColor: '#f5f1f1', }}>

                    <View
                        style={{
                            backgroundColor: 'white',
                            borderBottomWidth: 2,
                            borderBottomColor: 'rgba(182, 182, 182, 0.3)',
                        }}
                    >
                        <View
                            style={{
                                marginTop: 12,
                                marginBottom: 12,
                                height: 25,
                                flexDirection: 'row',
                                backgroundColor: 'white',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'space-between',
                                    paddingHorizontal: 16,
                                    borderEndWidth: 1,
                                    borderEndColor: '#E5DEDE',
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontFamily:
                                            Platform.OS === 'ios'
                                                ? 'IRANYekan-Light'
                                                : 'IRANYekanLight(FaNum)',
                                        color: '#8A7E7E',
                                        fontSize: 12,
                                    }}>روزهای کاری</Text>
                                <Text
                                    style={{
                                        color: '#8A7E7E',
                                        fontSize: 14,
                                    }}>{this.state.totalActiveDays}</Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'space-between',
                                    paddingHorizontal: 16,
                                }}
                            >
                                <Text
                                    style={{
                                        flex: 1,
                                        fontFamily:
                                            Platform.OS === 'ios'
                                                ? 'IRANYekan-Light'
                                                : 'IRANYekanLight(FaNum)',
                                        color: '#8A7E7E',
                                        fontSize: 12,
                                    }}>ساعت‌های در دسترس</Text>
                                <Text
                                    style={{
                                        color: '#8A7E7E',
                                        fontSize: 14,
                                    }}>{this.state.totalActiveHours}</Text>
                            </View>
                        </View>
                    </View>

                    <SectionList
                        sections={this.state.days}
                        stickySectionHeadersEnabled={false}
                        initialNumToRender={7}
                        style={{flex: 1}}
                        keyExtractor={(item, index) => index.toString()}
                        renderSectionHeader={({section}) => (
                            <DayHeader
                                item={section}
                                //TODO this should be repaired
                                onHeaderPress={() => this.onHeaderPress(section.id)}
                                // onHeaderPress={() => {}}
                                isExpand={section.isOpen}
                            />
                        )}
                        renderItem={({item, section}) => (
                            <MyCollapsible
                                key={item}
                                collapsed={!section.isOpen}
                            >
                                <DayContent
                                    hoursList={item.hours}
                                    onBeforeNoonPress={()=>{this.onBatchHourPress(section.id, false)}}
                                    onAfterNoonPress={()=>{this.onBatchHourPress(section.id, true)}}
                                    onHourPress={(order)=>{this.onHourPress(section.id, order)}}
                                />
                            </MyCollapsible>
                        )}
                    />

                    <TouchableOpacity onPress={this.submitTimeTable.bind(this)}>
                        <View style={{flexDirection: 'row'}}>
                            <View
                                style={{
                                    flex: 1,
                                    height: 60,
                                    backgroundColor: primaryDark,
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

                </View>

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

    onHeaderPress(index) {
        let days = this.state.days;
        days[index].isOpen = !days[index].isOpen;
        this.setState({days: days});
    };

    onBatchHourPress(dayId, isAfternoon){
        const start = isAfternoon ? AFTER_NOON_START : BEFORE_NOON_START;
        const end = isAfternoon ? AFTER_NOON_END : BEFORE_NOON_END;

        let days = this.state.days;

        let on = true;

        for(let i = start; i < end; i++){
            if(!days[dayId].data[0].hours[i]){
                on = false;
                break;
            }
        }

        if(on){
            for(let i = start; i < end; i++){
                days[dayId].data[0].hours[i] = 0;
            }
        }
        else{
            for(let i = start; i < end; i++){
                days[dayId].data[0].hours[i] = 1;
            }
        }

        this.setState({days: days});
        this.calculateSum();
    }

    onHourPress(dayId, hourId){
        let days = this.state.days;

        if(days[dayId].data[0].hours[hourId]){
            days[dayId].data[0].hours[hourId] = 0;
        }
        else{
            days[dayId].data[0].hours[hourId] = 1;
        }

        this.setState({days: days});
        this.calculateSum();
    }

    async getHoursList(){
        this.showLoading();
        await getTeacherHours()
            .then((results) => {
                results = JSON.parse(results);
                let correct = true;
                if(results.length == 7){
                    results.map(o => {
                        if(o.length != 24){
                            correct = false;
                        }
                    })
                }
                else {
                    correct= false;
                }

                if(!correct){
                    results = [];
                    for(let i=0; i < 7; i++){
                        results.push([]);
                        for(let j=0; j < 24; j++){
                            results[i].push(0);
                        }
                    }
                }

                let days = this.state.days;

                days.map((o, index) => {
                    o.data[0].hours = results[index];
                });

                this.setState({days: days});
                this.calculateSum();
            })
            .catch(e => {
                // this.setState({showNotification: true, notificationType: 'error'});
            });
        this.hideLoading();
    }

    calculateSum(){
        let days = this.state.days;
        let totalActiveHours = 0;
        let totalActiveDays = 0;

        days.map((o, index) =>{
            let sum = 0;
            let activeBeforenoon = true;
            let activeAfternoon = true;

            for(let i = BEFORE_NOON_START; i < BEFORE_NOON_END; i++){
               if(!o.data[0].hours[i]){
                   activeBeforenoon = false;
                   break;
               }
            }
            for(let i = AFTER_NOON_START; i < AFTER_NOON_END; i++){
                if(!o.data[0].hours[i]){
                    activeAfternoon = false;
                    break;
                }
            }
            o.data[0].hours.map(obj => {
                sum += obj;
            });
            totalActiveHours += sum;
            if(sum > 0){
                totalActiveDays += 1;
            }
            o.sumHours = sum;
            o.activeBeforenoon = activeBeforenoon;
            o.activeAfternoon = activeAfternoon;
        });
        this.setState({days: days, totalActiveHours: totalActiveHours, totalActiveDays: totalActiveDays});
    }

    async submitTimeTable(){
        this.showLoading();
        let allHours = [];
        this.state.days.map(o => {
           allHours.push(o.data[0].hours);
        });
        await setTeacherHours(JSON.stringify(allHours))
            .then(() => {
                alert('success');
                // this.onBackPressed();
                // this.setState({showNotification: true, notificationType: 'success'});
            })
            .catch(e => {
                alert('failed');
                // this.setState({showNotification: true, notificationType: 'error'});
            });
        this.hideLoading();
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
