import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './src/Components/navigation/AppNavigation';
import {store} from './src/Components/redux/store/Store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
