/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import MapView, {Polygon} from 'react-native-maps';
import {districts} from '../../assets/districts'

import {
    setTeacherDistricts,
    getTeacherDistricts
} from '../network/Queries';

type Props = {};
import images from '@assets/images';
import {bgScreen, primaryDark} from "../constants/colors";
import {AndroidBackButton, LoadingPopUp, Toolbar} from "../components";
export default class Welcome extends Component<Props> {

    constructor(props) {
        super(props);

        this.state = {
            showLoading: false,
            allDistricts: [false,false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,false, false, false, false, false,false],
            districtsList: '',

        };
        this.color = ["rgba(200, 0, 0, 0.5)", "rgba(0, 200, 0, 0.5)", "rgba(0, 0, 200, 0.5)", "rgba(200, 200, 0, 0.5)", "rgba(200, 0, 200, 0.5)",
            "rgba(0, 200, 200, 0.5)", "rgba(200, 200, 200, 0.5)", "rgba(100, 0, 0, 0.5)", "rgba(0, 100, 0, 0.5)", "rgba(0, 0, 100, 0.5)",
            "rgba(100, 100, 0, 0.5)", "rgba(100, 0, 100, 0.5)", "rgba(0, 100, 100, 0.5)", "rgba(100, 100, 100, 0.5)", "rgba(50, 100, 0, 0.5)",
            "rgba(0, 50, 100, 0.5)", "rgba(100, 0, 50, 0.5)", "rgba(50, 50, 100, 0.5)", "rgba(50, 100, 50, 0.5)", "rgba(200, 50, 50, 0.5)",
            "rgba(50, 50, 50, 0.5)", "rgba(50, 200, 100, 0.5)"];
        this.extractPolygons();
    }

    extractPolygons(){
        let polygons = [{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {},{}, {}];

        districts.features.map(o => {
            let polygon = [];
            let name = o.properties.TEXTSTRING;
            o.geometry.coordinates[0].map(p => {
                polygon.push({
                    latitude: p[1],
                    longitude: p[0]
                });
            });
            polygons[Number(name) - 1] = {polygon: polygon, name: name};
        });

        this.polygons = polygons;
    }

    componentWillMount(): void {
        this.getDistrictsList();
    }

    render() {
        const toolbarStyle = {
            start: {
                onPress: this.onBackPressed.bind(this),
                content: images.ic_back,
            },
            title: 'تعیین محل تدریس',
        };

        this.polygon = [
            {
                latitude: 34,
                longitude:51,
            },
            {
                latitude: 36,
                longitude:51
            },

            {
                latitude: 36,
                longitude:53
            },
            {
                latitude: 34,
                longitude:53
            },

        ];

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

                <View style={{flex: 1, backgroundColor: '#f5f1f1'}}>

                    <View
                        style={{
                            backgroundColor: 'white',
                            borderBottomWidth: 2,
                            borderBottomColor: 'rgba(182, 182, 182, 0.3)',
                            elevation: 2
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
                                    }}>مناطق تدریس:</Text>
                                <Text
                                    style={{
                                        color: '#8A7E7E',
                                        fontSize: 13,
                                    }}>{this.state.districtsList != '' ? this.state.districtsList : "هیچ منطقه‌ای انتخاب نشده است"}</Text>
                            </View>

                        </View>
                        <TouchableOpacity onPress={() => this.selectAllDistricts(true)}>
                            <View style={{flexDirection: 'row'}}>
                                <View
                                    style={{
                                        flex: 1,
                                        height: 40,
                                        backgroundColor: 'brown',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                    }}
                                >
                                    <Text style={{fontSize: 14, color: 'white'}}>انتخاب تمام مناطق</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <MapView
                        style={{flex: 1}}
                        initialRegion={{
                            latitude: 35.7,
                            longitude: 51.35,
                            latitudeDelta: 0.6,
                            longitudeDelta: 0.6,
                        }}
                    >
                        {this.polygons.map((o, index) => {
                           return (<Polygon
                                tappable={true}
                                coordinates={o.polygon}
                                fillColor={this.state.allDistricts[index] ? this.color[index] : "rgba(0,0,0,0)"}
                                strokeColor="rgba(0,0,0,0.5)"
                                strokeWidth={2}
                                onPress={() => this.toggleDistrictStatus(o.name)}
                            />)
                        })
                        }

                    </MapView>

                    <TouchableOpacity onPress={this.submitDistricts.bind(this)}>
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

    toggleDistrictStatus(district){
        let allDistricts = this.state.allDistricts;

        allDistricts[Number(district) - 1] = !allDistricts[Number(district) - 1];

        this.setState({allDistricts: allDistricts, districtsList: this.extractDistrictsList(allDistricts)});
    }

    selectAllDistricts(select){
        let allDistricts = this.state.allDistricts;
        allDistricts.map((o, index) => {
            allDistricts[index] = select ? true: false;
        });
        this.setState({allDistricts: allDistricts, districtsList: this.extractDistrictsList(allDistricts)});
    }

    extractDistrictsList(allDistricts){
        let districts = '';
        allDistricts.map((o, index) => {
            if(o){
                districts += (index+1) + ','
            }
        });
        districts = districts.substr(0, districts.length-1);

        return districts;
    }

    async getDistrictsList(){
        this.showLoading();
        await getTeacherDistricts()
            .then((results) => {
                if(results != '')
                {
                    let list = results.split(",");
                    let allDistricts = this.state.allDistricts;

                    list.map(o => {
                        allDistricts[Number(o) - 1] = true;
                    });
                    this.setState({allDistricts: allDistricts, districtsList: results});
                }
            })
            .catch(e => {
                // this.setState({showNotification: true, notificationType: 'error'});
            });
        this.hideLoading();
    }

    async submitDistricts(){
        let districts = this.extractDistrictsList(this.state.allDistricts);

        this.showLoading();
        await setTeacherDistricts(districts)
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
