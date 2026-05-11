import React from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import images from '@assets/images';

import {border, borderLight} from '../constants/colors';

// {
//   "Id": 1,
//     "Title": "ریاضی اول ابتدایی",
//     "Comments": "درس خوبی است",
//     Level: '4',
//     Thumbnail: 'book.png'
// },

export default function LessonCard({lesson}) {
  return (
    <View
      style={
        styles.container}>
      <Image
          source={images.book}
          style={{width: 70, height: 100}}
      />
      <View
          style={
            styles.middleContainer}
      >
        <Text>{lesson.Title}</Text>
        <Text>{lesson.Comments}</Text>
      </View>

      <View
          style={
            styles.endContainer}
      >
        <Text style={{width: 30, textAlign: 'center'}}>{lesson.Level}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginTop: 10,
    padding: 8,
    marginStart: 16,
    backgroundColor: 'white'
  },

  middleContainer: {
      flex: 1,
    marginVertical: 5,
    flexDirection: 'column',
    borderRadius: 10,
    marginTop: 10,
    padding: 8,
    marginHorizontal: 16,
  },
  endContainer: {
    borderWidth: 1,
    borderColor: 'red',
    marginVertical: 5,
    justifyContent:'center',
    alignContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    padding: 8,
  },
});
