import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParam} from './navigation/AppNavigation';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';

interface HomeScreenProp {
  navigation: StackNavigationProp<RootStackParam, 'Home'>;
}
const name = ['ali', 'khan', 'nouman'];
const Home: FunctionComponent<HomeScreenProp> = ({
  navigation,
}: HomeScreenProp) => {
  const [Expand, setExpand] = useState(false);

  const addProduct = async () => {
    // const data = {
    //   title: 'test product',
    //   price: 13.5,
    //   description: 'lorem ipsum set',
    //   image: 'https://i.pravatar.cc',
    //   category: 'electronic',
    // };
    // axios
    //   .post('https://fakestoreapi.com/products', data)
    //   .then(res => console.log(res.data));
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.topView}>
        <TouchableOpacity
          style={styles.mainOpacity}
          onPress={() => navigation.navigate('Shopping')}>
          <Text>Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainOpacity}
          onPress={() => navigation.navigate('Customers')}>
          <Text>Other</Text>
        </TouchableOpacity>
      </View>
      {Expand ? (
        <TouchableOpacity
          onPress={() => {
            setExpand(false);
          }}
          style={styles.mainView}>
          {name.map(item => (
            <Text style={styles.font}>{item}</Text>
          ))}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => addProduct()} style={styles.button}>
          <Text style={styles.font}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    bottom: responsiveHeight(2),
    right: responsiveHeight(2),
    position: 'absolute',
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(4),
    height: responsiveWidth(14),
    width: responsiveWidth(14),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
  },
  font: {
    color: '#fff',
    fontSize: 33,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainView: {
    bottom: responsiveHeight(2),
    // right: responsiveHeight(2),
    position: 'absolute',
    marginTop: responsiveHeight(4),
    // marginLeft: responsiveWidth(4),
    height: responsiveWidth(60),
    width: responsiveWidth(90),
    backgroundColor: 'black',
    marginHorizontal: responsiveWidth(5),
    borderRadius: responsiveHeight(6),
  },
  mainOpacity: {
    height: responsiveHeight(12),
    width: responsiveWidth(22),
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: responsiveWidth(10),
    marginTop: responsiveHeight(2),
  },
});
