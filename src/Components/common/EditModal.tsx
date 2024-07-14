import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import Loader from './Loader';
import {selectData, updateData} from '../redux/slices/DataSlice';
import {putData} from './axiosGenerics';

interface data {
  email: string;
  name: string;
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

interface EditmodalProp {
  name: string;
  setName: (name: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
  email: string;
  setEmail: (email: string) => void;
  id: number;
  visible: boolean;
  setVisiable: (visible: boolean) => void;
  selectRecord: dataInterface[];
}

const EditModal: FunctionComponent<EditmodalProp> = ({
  name,
  setName,
  userName,
  setUserName,
  email,
  setEmail,
  id,
  visible,
  setVisiable,
  selectRecord,
}: EditmodalProp) => {
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useDispatch();
  // const selectUser:dataInterface[] = useSelector(selectData);

  const editData = async (): Promise<void> => {
    setLoader(true);
    const user = {
      name: name,
      username: userName,
      email: email,
    };
    try {
      const res = await putData<dataInterface[], data>(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        user,
      );
      // const res = await axios.put(
      //   `https://jsonplaceholder.typicode.com/users/${id}`,
      //   user,
      // );
      // setData(data);
      const updatedUsers = selectRecord.map(user => {
        if (user.id === id) {
          console.log('user.username', user.username);
          return {
            ...user,
            name: name,
            email: email,
            username: userName,
          };
        }

        return user;
      });
      console.log('data', updatedUsers);
      dispatch(updateData(updatedUsers));
      setVisiable(false);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setVisiable(false);
      console.log(err);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={styles.modal}>
      <View style={styles.modalTopView}>
        <Loader showModal={loader} LoaderColor={'black'} LoaderSize={'large'} />
        <View style={styles.margin}>
          <Text style={styles.mainText}>Edit Customer</Text>
          <TouchableOpacity onPress={() => setVisiable(false)}>
            <MaterialIcons name="cancel" style={styles.editDeleteIcon} />
          </TouchableOpacity>
        </View>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              {/* <Text style={styles.mainText}>Edit Customer</Text> */}
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
                onPress={() => editData()}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  margin: {
    marginTop: responsiveHeight(0),
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    marginTop: responsiveHeight(4),
    backgroundColor: '#e6e6e6',
  },
  modalTopView: {
    backgroundColor: '#e6e6e6',
    flex: 1,
    paddingTop: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(6),
  },
  editDeleteIcon: {
    fontSize: responsiveFontSize(3.5),
    color: '#006FB9',
    marginLeft: responsiveWidth(3),
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(6), // Adjust padding to your needs
  },
  mainView: {
    // marginHorizontal: responsiveWidth(4),
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
