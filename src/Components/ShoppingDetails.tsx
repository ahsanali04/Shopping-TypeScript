import {StyleSheet, Text, View, Image} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParam} from './navigation/AppNavigation';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

interface ShoppingDetailsProp {
  route: RouteProp<RootStackParam, 'ShoppingDetails'>;
}

interface data {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
const ShoppingDetails: FunctionComponent<ShoppingDetailsProp> = ({
  route,
}: ShoppingDetailsProp) => {
  const [Data] = useState<data>(route?.params?.item);
  return (
    <View style={{flex: 1}}>
      <View style={styles.mainView}>
        <Image
          source={{uri: Data?.image}}
          style={styles.image}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.subView}>
        <Text style={styles.category}>{Data?.category}</Text>
        <View style={styles.price}>
          <Text>Price: {Data?.price}</Text>
          <Text>Rating: {Data?.rating?.rate}</Text>
        </View>
        <Text style={styles.title}>{Data?.title}</Text>
        <Text style={styles.desc}>{Data?.description}</Text>
      </View>
    </View>
  );
};

export default ShoppingDetails;

const styles = StyleSheet.create({
  image: {
    height: responsiveHeight(32),
    width: responsiveWidth(40),
    marginVertical: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subView: {
    marginHorizontal: responsiveWidth(4),
  },
  category: {
    textAlign: 'center',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    fontWeight: '800',
  },
  title: {
    marginTop: responsiveHeight(2),
    fontWeight: '900',
    fontSize: responsiveFontSize(2),
  },
  desc: {
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
  },
});
