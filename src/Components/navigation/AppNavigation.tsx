import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Home';
import Shopping from '../Shopping';
import ShoppingDetails from '../ShoppingDetails';
import Customers from '../Customers';
import Create from '../Create';
import Cart from '../Cart';

export type RootStackParam = {
  Home: undefined;
  Shopping: undefined;
  ShoppingDetails: {
    item: {
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
    };
  };
  Customers: undefined;
  Create: undefined;
  Cart: undefined;
};

const stack = createStackNavigator<RootStackParam>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Shopping" component={Shopping} />
        <stack.Screen name="ShoppingDetails" component={ShoppingDetails} />
        <stack.Screen name="Customers" component={Customers} />
        <stack.Screen name="Create" component={Create} />
        <stack.Screen name="Cart" component={Cart} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
