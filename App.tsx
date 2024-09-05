import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './src/Components/navigation/AppNavigation';
import {store} from './src/Components/redux/store/Store';
import {Provider} from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';

const App = () => {
  const key = "pk_test_51PvNHiKSwJZ5SgtQRe5kEH7kclHuwhlB1alZXqaB8EBrvtZpP6Hs5cuBhj7yPLIRJWrIBWwXL6xYrGOuZmesmmNT00wPos6xX9"
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={key}>
      <AppNavigation />
      </StripeProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
