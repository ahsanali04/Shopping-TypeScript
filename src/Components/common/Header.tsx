import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {FunctionComponent} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface HeaderProp {
  name: string;
}

export const Header: FunctionComponent<HeaderProp> = ({name}: HeaderProp) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{name}</Text>
      <TouchableOpacity onPress={() => {}} style={styles.Opacity}>
        {/* <AntDesign
            name={'arrowleft'}
            color={blue}
            size={responsiveFontSize(3.2)}
          /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: responsiveWidth(100),
    height: Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(10),
    borderBottomColor: 'rgb(217,217,217)',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: responsiveFontSize(2.3),
    // fontFamily: BoldFont,
  },
  Opacity: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    position: 'absolute',
    left: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
