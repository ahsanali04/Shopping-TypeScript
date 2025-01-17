import React, {FunctionComponent, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {selectCart, updateCart} from './redux/slices/DataSlice';
import {useSelector, useDispatch} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Product {
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
  quantity: number;
}

const Cart: FunctionComponent = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const increase = (item: Product) => {
    const updatedUsers = cart.map(user => {
      if (user.id === item?.id) {
        return {
          ...user,
          quantity: user.quantity + 1,
        };
      }

      return user;
    });
    dispatch(updateCart(updatedUsers));
  };

  const decrease = (item: Product) => {
    if (item.quantity > 1) {
      const updatedUsers = cart.map(user => {
        if (user.id === item?.id) {
          return {
            ...user,
            quantity: user.quantity - 1,
          };
        }

        return user;
      });
      dispatch(updateCart(updatedUsers));
    }
  };

  const deleteRecord = (item: Product) => {
    try {
      const filterData = cart.filter(record => record.id !== item.id);
      dispatch(updateCart(filterData));
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={({item}) => (
          <View style={styles.mainView}>
            <View style={styles.item} key={item.id}>
              <Image
                source={{uri: item.image}}
                style={styles.image}
                resizeMode={'contain'}
              />
              <View style={styles.text}>
                <Text style={styles.title}>
                  {item?.title?.length > 15
                    ? item?.title?.slice(0, 15) + '...'
                    : item?.title}
                </Text>
                <Text style={styles.price}>{item?.price} $</Text>
              </View>
              <View style={styles.increase}>
                <TouchableOpacity
                  onPress={() => decrease(item)}
                  style={styles.increaseDecreaseOpacity}>
                  <AntDesign name="minus" style={styles.cartIcon} />
                </TouchableOpacity>

                <Text style={styles.quantity}>{item?.quantity}</Text>
                <TouchableOpacity
                  onPress={() => increase(item)}
                  style={styles.increaseDecreaseOpacity}>
                  <AntDesign name="plus" style={styles.cartIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteRecord(item)}
                  style={styles.delete}>
                  <AntDesign name="delete" style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        disabled={cart?.length < 1}
        style={[
          styles.checkout,
          {backgroundColor: cart?.length < 1 ? 'gray' : '#000'},
        ]}>
        <Text style={styles.button}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 14,
    marginHorizontal: responsiveWidth(2),
  },
  image: {
    width: responsiveWidth(12),
    height: responsiveHeight(12),
  },
  increase: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: responsiveFontSize(2),
  },
  quantity: {
    marginHorizontal: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  delete: {
    marginLeft: responsiveWidth(6),
  },
  deleteIcon: {
    fontSize: responsiveFontSize(2.6),
    color: 'red',
  },
  mainView: {
    backgroundColor: '#fff',
    // padding: 20,
    marginVertical: 8,
    marginHorizontal: responsiveWidth(4),
    height: responsiveHeight(14),
    justifyContent: 'center',
  },
  price: {
    // marginBottom: responsiveHeight(2),
    marginHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(1),
  },
  increaseDecreaseOpacity: {
    height: responsiveHeight(4),
    width: responsiveHeight(4),
    borderRadius: responsiveHeight(2),
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    justifyContent: 'center',
  },
  checkout: {
    marginHorizontal: responsiveWidth(4),
    height: responsiveHeight(10),
    marginVertical: responsiveHeight(1),
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: responsiveHeight(1),
  },
  button: {
    color: '#fff',
    textAlign: 'center',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
});

export default Cart;
