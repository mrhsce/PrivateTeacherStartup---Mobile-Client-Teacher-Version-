import {Animated, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import React, {PureComponent} from 'react';
import {
    AlertMessage,
    AndroidBackButton,
    IOSSwipeCard,
    LessonCard,
    LoadingPopUp,
    SnakePopup,
    ToastCard,
    Toolbar,
} from '../components';
import images from '@assets/images';
import {getAllLessonsList, getTeacherLessonsList, setTeacherLessonsList,} from '../network/Queries';

import {bgScreen, border, borderSeparate, drawerItem, primaryDark} from '../constants/colors';


const {height, width} = Dimensions.get('window');

class SnakePopupWithoutModal extends PureComponent {
    constructor() {
        super();
        this.animatedFromBottom = new Animated.Value(0);
        this.state = {};
        this.height = height - height / 2;
    }

    animateSnake(open, fn) {
        Animated.timing(this.animatedFromBottom, {
            toValue: open ? 1 : 0,
            useNativeDriver: true,
            duration: 300,
        }).start(fn);
    }

    render() {
        const {
            visible,
            toolbarTitle,
            items,
            itemComponent,
            fromTop = false,
            onClose,
            onItemSelected,
            onAllItemsSelected,
            catchTouch = true,
        } = this.props;

        const animateTranslateY = this.animatedFromBottom.interpolate({
            inputRange: [0, 1],
            outputRange: [fromTop ? this.height * -1 : this.height, 0],
        });

        if (visible) {
            this.animateSnake(true, () => {});
        }

        return (
                <View style={{position: 'absolute', top: 55, end: 25, start: 25}}>
                    <Animated.View
                        style={[
                            fromTop ? styles.fromTop : styles.fromBottom,
                            {
                                transform: [{translateY: animateTranslateY}],
                                backgroundColor: 'white',
                                minHeight: 120,
                                maxHeight: this.height,
                                // position: 'absolute',
                                // left: 0,
                                // right: 0,
                                borderBottomRightRadius: 17,
                                borderBottomLeftRadius: 17,
                                borderBottomWidth: 1,
                                borderEndWidth: 1,
                                borderStartWidth: 1,
                                elevation: 2,
                                borderColor: borderSeparate,
                                paddingTop: fromTop && Platform.OS === 'ios' ? 20 : 0,
                            },
                        ]}>
                        {items.length == 0 &&
                        <Text
                            style={styles.searchBarEmptyIndicatorTextView}>
                            هیچ درسی با کلیدواژه مورد نظر وجود ندارد!
                        </Text>
                        }
                        {items.length > 0 &&
                        <TouchableOpacity
                            onPress={() => onAllItemsSelected()}
                            disabled={!catchTouch}
                            style={{
                                elevation: 2,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 1},
                                shadowOpacity: 0.5,
                                backgroundColor: 'white',
                            }}>
                            <View
                                style={[
                                    styles.actionIcon,
                                    {
                                        height: 66,
                                        // backgroundColor: primaryColor,
                                        flexDirection: 'row',
                                        // justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 2,
                                        borderBottomColor: borderSeparate,
                                    },
                                ]}>
                                <Image
                                    source={images.tick_all_select}
                                    style={[styles.img]}
                                />

                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: 16,
                                        fontFamily:
                                            Platform.OS === 'ios'
                                                ? 'IRANYekanFaNum-Bold'
                                                : 'IRANYekanBold(FaNum)',
                                    }}>
                                    انتخاب همه
                                </Text>
                            </View>
                        </TouchableOpacity>
                        }
                        <FlatList
                            ItemSeparatorComponent={() => (
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: borderSeparate,
                                        marginHorizontal: 16,
                                    }}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            style={{flexGrow: 0}}
                            data={items}
                            renderItem={({item, index}) => (
                                <TouchableOpacity onPress={() => onItemSelected(item, index)}>
                                    {itemComponent ? (
                                        itemComponent(item)
                                    ) : (
                                        <View style={{marginHorizontal: 16, flexDirection: 'row', alignItems: 'center'}}>
                                            <Image
                                                source={item.checked ? images.checked_icon : images.unchecked_icon}
                                                style={[styles.img, {tintColor: border}]}
                                            />
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 13,
                                                }}>
                                                {item.Title}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </Animated.View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingEnd: 13,
        paddingStart: 13,
        height: 45,
    },
    rowTitle: {
        flex: 1,
    },
    button: {
        flex: 1,
        borderWidth: 0.5,
        borderRadius: 4,
        height: 33,
        marginHorizontal: 7,
    },
    fromTop: {
        top: 0,
    },
    fromBottom: {
        bottom: 0,
    },
    img: {
        tintColor: 'black',
        height: 24,
        width: 24,
        marginEnd: 10,
    },
    actionIcon: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        height: '100%',
    },
    emptyIndicatorCard: {
        backgroundColor: 'black',
        marginTop: 100,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    emptyIndicatorTextView: {
        fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    searchBarEmptyIndicatorTextView:{
        fontFamily: Platform.OS === 'ios' ? 'IRANYekanFaNum-Bold' : 'IRANYekanBold(FaNum)',
        fontSize: 16,
        paddingTop: 45,
        color: drawerItem,
        textAlign: 'center',
    }
});


class UnitItem extends PureComponent {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      delay: this.props.index * 100,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <IOSSwipeCard
        index={this.props.index}
        permission={{deleteAccess: true, writeAccess: true}}
        onDelete={() =>
          this.props.onSwipeRemove()
        }
        onMore={() =>
          this.props.onMorePressed(this.props.item)
        }
        moreIcon={images.addPersonIcon}
        moreColor="blue"
        onClose={() => this.setState({isOpen: true})}
        onOpen={id => {
          this.props.onOpenSwipe(id);
          this.setState({isOpen: false});
        }}
        idSwipeOpened={this.props.idSwipeOpened}>
        <LessonCard
        lesson={this.props.item}
        />
      </IOSSwipeCard>
    );
  }
}

const searchItems = [
  {Name: 'عنوان', codeName: 'Title'},
  {Name: 'گروه درسی', codeName: 'LessonGroup'},
  {Name: 'سطح', codeName: 'Level'},
];

export default class LessonsManagement extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortItem: null,
      searchItem: searchItems[0],
      sortIsAvailable: true,
      searchIsAvailable: true,
      sortDirectionDesc: true,
      showMorePopUp: false,
      allLessons: [],

      showSearchType: false,
      showSortType: false,
    };



  }

  componentWillMount(): void {
      this.getLessonsList();
  }

    changeSearchType(item) {
    this.setState({searchItem: item, searchText: ''});
    this.searchUnits('');
  }

  async searchUnits(text) {
      let i = text;
      if(text !== ''){
        let results = await getAllLessonsList(text);
        this.prepareData(results);
        // alert(results.length);
        this.setState({
            showSearchResultsList: true,
            searchResults: results,

        });
        }
      else {
          this.setState({
              showSearchResultsList: false,
              searchResults: [],
          });
      }
  }

  prepareData(results){
      results.map(o => {
          let exists = false;
          this.state.allLessons.map(lesson => {
              if(lesson.Id == o.Id){
                  exists = true;
              }
          });
         o.checked = exists;
      });
  }

    async getLessonsList(){
        this.showLoading();
        await getTeacherLessonsList()
            .then((results) => {
                this.setState({allLessons: results});
            })
            .catch(e => {
                // this.setState({showNotification: true, notificationType: 'error'});
            });
        this.hideLoading();
    }

  render() {
    const toolbarStyle = {
      start: {
        onPress: this.onBackPressed.bind(this),
        content: images.ic_back,
      },
      title: 'دروس تدریسی من',
      search: {
        onPressType: () => this.setState({showSearchType: true}),
        onTextChange: text => this.searchUnits(text),
          onOpen: () => this.setState({showSearchResultsList: false}),
        onClose: () => this.setState({showSearchResultsList: false}),
        typeName: this.state.searchItem.Name,
      },
      sort: {
        onPress: () => this.setState({showSortType: true}),
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

        <SnakePopup
          visible={this.state.showSearchType}
          toolbarTitle="جستجو بر اساس"
          items={searchItems}
          onItemSelected={item => {
            this.changeSearchType(item);
            this.setState({showSearchType: false});
          }}
          onClose={() => this.setState({showSearchType: false})}
          fromTop
        />

          {!(this.state.allLessons && this.state.allLessons.length > 0) &&
          <View
              style={styles.emptyIndicatorCard}>
              <Text
                  style={styles.emptyIndicatorTextView}>
                  هنوز هیچ درسی را انتخاب نکرده‌اید، لطفا با فشردن آیکن ذره‌بین، دروس تدریسی خود را جستجو و انتخاب کنید.
              </Text>
          </View>
          }

        <View style={{flex: 1, backgroundColor: '#f5f1f1', }}>
          <FlatList
              style={{marginEnd: 16}}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.allLessons}
            extraData={this.state}
            renderItem={({item, index}) => (
              <UnitItem
                index={index}
                navigation={this.props.navigation}
                item={item}
                onOpenSwipe={id => this.setState({idSwipeOpened: id})}
                onMorePressed={(item) =>
                  this.showMorePopUp(item)
                }
                idSwipeOpened={this.state.idSwipeOpened}
                onSwipeRemove={() => this.showDeletePopUp(index)}
              />
            )}
          />

            <TouchableOpacity
                onPress={this.submitLessons.bind(this)}
                disabled={!(this.state.allLessons.length > 0)}
            >
                <View style={{flexDirection: 'row'}}>
                    <View
                        style={{
                            flex: 1,
                            height: 60,
                            backgroundColor: (this.state.allLessons.length > 0) ? primaryDark : '#D5CBCB',
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

          { this.state.showDeletePopUp &&
          <AlertMessage
              visible={this.state.showDeletePopUp}
              title="حذف درس"
              message={
                  'آیا از حذف درس ' + this.state.allLessons[this.state.toDeleteLessonIndex].Title + ' مطمئن هستید؟'
              }
              onConfirm={() => {
                  this.deleteLesson();
              }}
              onDismiss={() => this.hideDeletePopUp()}
              confirmTitle="بله"
              dismissTitle="خیر"
          />
          }


        {this.state.showSearchResultsList && (
            <SnakePopupWithoutModal
                toolbarTitle="نتایج جستجو"
                visible={true}
                items={this.state.searchResults}
                onItemSelected={(item, index) => {
                    this.addLesson(item, index);
                }}
                onAllItemsSelected={() => {
                    this.addAllLessons();
                }}
                onClose={() => this.setState({showSearchResultsList: false})}
                fromTop
            />
        )}

          <LoadingPopUp
              visible={this.state.loading}
              message={this.state.loadingMessage}
          />

          <ToastCard
              visible={this.state.showNotification}
              type={this.state.notificationType}
              onClose={() => this.setState({showNotification: false})}
          />

      </View>
    );
  }

    addLesson(item, index){
        let checked = ! item.checked;

        let searchResults = this.state.searchResults;
        let allLessons = this.state.allLessons;
        searchResults[index].checked = checked;
        if(checked){
            allLessons.push(item);
        }
        else{
            let idx = 0;
            allLessons.map((o, index) => {
                if(item.Id == o.Id){
                    idx = index;
                }
            });
            allLessons.splice(idx, 1);
        }

        this.setState({searchResults: searchResults, allLessons: allLessons});
        this.forceUpdate();
    }

    deleteLesson(){
        let allLessons = this.state.allLessons;
        allLessons.splice(this.state.toDeleteLessonIndex, 1);

        this.setState({allLessons: allLessons});

        this.hideDeletePopUp();
    }

    addAllLessons(){
        let searchResults = this.state.searchResults;
        let allLessons = this.state.allLessons;
        searchResults.map(o => {
            if(!o.checked){
                o.checked = true;
                allLessons.push(o);
            }

        });

        this.setState({searchResults: searchResults, allLessons: allLessons});
        this.forceUpdate();
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

  showDeletePopUp(index) {
    this.setState({
      showDeletePopUp: true,
      toDeleteLessonIndex: index,
    });
  }

    hideDeletePopUp() {
        this.setState({
            showDeletePopUp: false,
            toDeleteLessonIndex: null,
        });
    }

  showMorePopUp(item) {
    this.setState({
      showMorePopUp: true,
      selectedUnit: item,
    });
  }

  hideMorePopUp() {
    this.setState({
        showMorePopUp: false,
        selectedUnit: null,
    });
  }

  showSortPopUp() {
    this.setState({
      showSortPopUp: true,
    });
  }

  hideSortPopUp() {
    this.setState({
      showSortPopUp: false,
    });
  }

  editUnit() {
    this.props.navigation.navigate('UnitsCreate', {
      item: this.state.selectedUnit,
    });
  }

  editResident() {
    this.props.navigation.navigate('User2UnitAssignment', {
        item: this.state.selectedUnit,
    });
  }

  changeSort(item) {
    this.setState({sortItem: item});
    this.sortProcessCalc(item);
  }

  sortProcessCalc(item) {
    let arraySortProcess = this.state.allLessons;
    arraySortProcess.sort(this.compareValues(item.codeName));
    if (item.isDescending) {
      arraySortProcess.reverse();
    }
    this.setState({allLessons: arraySortProcess});
  }

  compareValues(key) {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return comparison;
    };
  }

    async submitLessons(){
        let lessons = '';
        this.state.allLessons.map(o => {
            lessons += o.Id + ','
        });
        lessons = lessons.substr(0, lessons.length-1);

        this.showLoading();
        await setTeacherLessonsList(lessons)
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
