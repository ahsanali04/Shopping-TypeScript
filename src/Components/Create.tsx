import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {FunctionComponent, useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import Loader from './common/Loader';
import {useSelector, useDispatch} from 'react-redux';
import {selectData, updateData} from './redux/slices/DataSlice';
import {getData, postData} from './common/axiosGenerics';

interface data {
  name: string;
  email: string;
  username: string;
}

interface dataInterface extends data {
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  website: string;
  id: number;
  phone: string;
}

const Create: FunctionComponent = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const selectUser = useSelector(selectData);

  const createUser = async (): Promise<void> => {
    if (!name || !userName || !email) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setLoader(true);

    const data = {
      name: name,
      username: userName,
      email: email,
    };

    try {
      const res = await postData<dataInterface[], data>(
        'https://jsonplaceholder.typicode.com/users',
        data,
      );
      // const res = await axios.post(
      //   'https://jsonplaceholder.typicode.com/users',
      //   data,
      // );
      setLoader(false);
      dispatch(updateData([...selectUser, res]));
      console.log('===>', res);
      navigation.navigate('Customers');
    } catch (e) {
      setLoader(false);
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Loader showModal={loader} LoaderColor={'black'} LoaderSize={'large'} />
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainView}>
          <View style={styles.subView}>
            <Text style={styles.mainText}>Create Customer</Text>
            <Text style={styles.fieldText}>Name</Text>
            <View style={styles.inputView}>
              <TextInput
                value={name}
                onChangeText={text => setName(text)}
                style={styles.textInput}
                placeholder="Name"
              />
            </View>
            <Text style={styles.fieldText}>UserName</Text>
            <View style={styles.inputView}>
              <TextInput
                value={userName}
                onChangeText={text => setUserName(text)}
                style={styles.textInput}
                placeholder="UserName"
              />
            </View>
            <Text style={styles.fieldText}>Email</Text>
            <View style={styles.inputView}>
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
                placeholder="Email"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => createUser()}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(6), // Adjust padding to your needs
  },
  mainView: {
    marginHorizontal: responsiveWidth(7),
    borderRadius: responsiveHeight(1.5),
    backgroundColor: '#fff',
    paddingVertical: responsiveHeight(2),
  },
  subView: {
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(3),
  },
  mainText: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: 'bold',
  },
  textInput: {
    height: responsiveHeight(8),
    marginHorizontal: responsiveWidth(2),
  },
  fieldText: {
    color: 'gray',
    fontSize: responsiveFontSize(2.2),
    marginVertical: responsiveHeight(2),
  },
  inputView: {
    borderColor: 'gray',
    borderWidth: responsiveHeight(0.1),
    borderRadius: responsiveWidth(2),
  },
  button: {
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
    backgroundColor: '#006FB9',
    marginVertical: responsiveHeight(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.4),
  },
});
