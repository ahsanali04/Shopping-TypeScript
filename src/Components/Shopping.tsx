import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import Loader from './common/Loader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Header} from './common/Header';
import {RootStackParam} from './navigation/AppNavigation';
import {NavigationContainerProps, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {getData} from './common/axiosGenerics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {selectCart, updateCart} from './redux/slices/DataSlice';

interface ShoppingScreenProp {
  navigation: StackNavigationProp<RootStackParam, 'Shopping'>;
  route: RouteProp<RootStackParam, 'Shopping'>;
}

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
  quantity:number;
}

const Shopping: FunctionComponent<ShoppingScreenProp> = ({
  route,
  navigation,
}: ShoppingScreenProp) => {
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const cart: Product[] = useSelector(selectCart);
  const dispatch = useDispatch();
  const count = cart.length
  useEffect(() => {
    fetchCategories();
    fetchData();
  }, []);

  const fetchCategories = async (): Promise<void> => {
    setLoader(true);
    try {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const response: string[] = await res.json();
      setCategories(response);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const fetchData = async (): Promise<void> => {
    setSelectedCategory('All');
    setLoader(true);
    try {
      const response = await getData<Product[]>(
        'https://fakestoreapi.com/products',
      );
      // const res = await fetch('https://fakestoreapi.com/products');
      // const response: Product[] = await res.json();
      setData(response);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const filter = async (item: string): Promise<void> => {
    setSelectedCategory(item); // Set selected category
    setLoader(true);
    try {
      const response = await getData<Product[]>(
        `https://fakestoreapi.com/products/category/${item}`,
      );
      // const res = await fetch(
      //   `https://fakestoreapi.com/products/category/${item}`,
      // );
      // const response: Product[] = await res.json();
      setData(response);
      setLoader(false);
      console.log(response);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const searchResult = (text: string): void => {
    setSearch(text);
    console.log('text', text);
    // Extract titles
    const filteredProducts = data.filter(product =>
      product.title.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filteredProducts);
  };

  function isProductInCart(productId: number) {
    return cart.filter(product => product.id === productId).length > 0;
  }

  const addToCart = (item: Product): void => {
    console.log('item', item.id);
    const result = isProductInCart(item.id);
    console.log(' isProductInCart(item.id)', isProductInCart(item.id));
    const res = cart.filter(data => data.id !== item.id);
    console.log('!!res', res);
    if (result) {
      // If the product is already in the cart, increment the quantity
      const updatedCart = cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      dispatch(updateCart(updatedCart));
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const updatedItem = { ...item, quantity: 1 };
      dispatch(updateCart([...cart, updatedItem]));
    }
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Loader showModal={loader} LoaderColor={'black'} LoaderSize={'large'} />
      {/* <Header name="Shopping" /> */}
      <TouchableOpacity style={styles.opacity} onPress={()=> navigation.navigate('Cart')}>
        <AntDesign name="shoppingcart" style={styles.cartIcon1} />
      {count > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
      </TouchableOpacity>
      {loader ? (
        <View>
          <View
            style={{
              backgroundColor: '#fff',
              height: 55,
              borderRadius: 10,
              marginHorizontal: 16,
              marginTop: responsiveHeight(2),
            }}></View>
          <FlatList
            data={[1, 1, 1, 1]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={item => (
              <View
                style={{
                  marginVertical: responsiveHeight(2),
                  height: responsiveHeight(6),
                  width: responsiveWidth(20),
                  backgroundColor: '#fff',
                  marginHorizontal: responsiveWidth(4),
                  borderRadius: responsiveWidth(4),
                }}></View>
            )}
          />
          <FlatList
            data={[1, 1, 1, 1]}
            numColumns={2}
            renderItem={item => (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: responsiveHeight(40),
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  padding: 10,
                  width: responsiveWidth(42),
                  marginHorizontal: responsiveWidth(4),
                }}></View>
            )}
          />
        </View>
      ) : (
        <View style={styles.View}>
          <View style={styles.subView}>
            <TextInput
              placeholder="Search"
              style={styles.textInput}
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => fetchData()}
              style={styles.listView}>
              <Text style={styles.textColor}>All</Text>
            </TouchableOpacity>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => filter(item)}
                style={[
                  styles.listView,
                  item === selectedCategory && styles.selectedCategory,
                ]}>
                <Text
                  style={[
                    item === selectedCategory && styles.selectedText,
                    styles.textColor,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <View style={styles.mapView}>
              {data
                .filter(product =>
                  product.title.toLowerCase().includes(search.toLowerCase()),
                )
                .map(item => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ShoppingDetails', {item})
                    }
                    key={item?.id}
                    style={styles.mainView}>
                    <View style={styles.FlatListView}>
                      <Image
                        source={{uri: item?.image}}
                        style={styles.image}
                        resizeMode={'contain'}
                      />
                      <View style={styles.textView}>
                        <Text style={styles.text}>
                          {item.title.length > 30
                            ? item.title.substring(0, 30) + '...'
                            : item?.title}
                        </Text>
                        <Text style={[styles.text, styles.category]}>
                          {item.category.length > 30
                            ? item.category.substring(0, 30) + '...'
                            : item?.category}
                        </Text>
                      </View>
                      <View style={styles.priceView}>
                        <Text>{item?.price}</Text>
                        <TouchableOpacity onPress={() => addToCart(item)}>
                          <AntDesign
                            name="shoppingcart"
                            style={styles.cartIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Shopping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    backgroundColor: '#e6e6e6',
  },
  FlatListView: {
    marginTop: 10,
    justifyContent: 'center',
    height: responsiveHeight(40),
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 10,
    width: responsiveWidth(42),
  },
  text: {
    marginTop: 10,
  },
  image: {
    height: 120,
    width: 110,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textView: {
    marginTop: 10,
    marginHorizontal: 5,
  },
  mainView: {
    marginHorizontal: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // display: 'flex',
  },
  textInput: {
    backgroundColor: '#fff',
    height: 55,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  View: {
    marginHorizontal: responsiveWidth(4),
    flex:1
  },
  subView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
  },
  listView: {
    marginTop: 10,
    height: 40,
    backgroundColor: '#000',
    marginHorizontal: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: responsiveHeight(3),
  },
  category: {
    fontWeight: '800',
  },
  flat: {
    marginBottom: 1,
  },
  scrollView: {
    // marginBottom: responsiveHeight(33),
    // flexDirection:'row',
  },
  selectedCategory: {
    backgroundColor: 'blue',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  mapView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textColor: {
    color: '#fff',
  },
  priceView: {
    marginHorizontal: 5,
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: responsiveFontSize(3.4),
  },
  cartIcon1:{
    fontSize:responsiveFontSize(3.8),
    
  },
  count:{
    height:responsiveHeight(4),
    width:responsiveWidth(4),
    borderRadius:responsiveWidth(2),
    backgroundColor:'#000'
  },
  badgeContainer: {
    bottom: responsiveHeight(3),
    left: responsiveWidth(3.8),
    borderRadius: 50,
    position: 'absolute',
    aspectRatio: 1,
    height: responsiveHeight(3),
    backgroundColor: 'rgb(243,97,5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveWidth(3), // Adjust according to your preference
  },
  opacity:{
    marginRight:responsiveWidth(5),
    // position:'relative',
    marginTop:responsiveHeight(3),
    alignSelf:'flex-end'
  }
});
