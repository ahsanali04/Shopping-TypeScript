import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Loader from './common/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EditModal from './common/EditModal';
// import Modal from 'react-native-modal';
import axios from 'axios';
import {updateData} from './redux/slices/DataSlice';
import {selectData} from './redux/slices/DataSlice';
import {useSelector, useDispatch} from 'react-redux';
import {getData} from './common/axiosGenerics';

interface data {
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
}

interface dataInterface extends data {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
}

const Customers: FunctionComponent = ({navigation}) => {
  const [Data, setData] = useState<dataInterface[]>([]);
  const [loader, setloader] = useState<boolean>(false);
  const [search, setsearch] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const [visible, setVisiable] = useState<boolean>(false);
  // const selectData = state => state.data.value;
  const selectRecord: dataInterface[] = useSelector(selectData);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    setloader(true);
    try {
      const data = await getData<dataInterface[]>(
        'https://jsonplaceholder.typicode.com/users',
      );
      // const res = await fetch('https://jsonplaceholder.typicode.com/users');
      // const data: dataInterface[] = await res.json();
      setData(data);
      dispatch(updateData(data));
      setloader(false);
    } catch (err) {
      setloader(false);
      console.log(err);
    }
  };

  const edit = (item: dataInterface) => {
    setVisiable(true);
    setName(item.name);
    setUserName(item.username);
    setEmail(item.email);
    setId(item.id);
  };

  const deleteUser = async (item: dataInterface) => {
    setloader(true);
    try {
      const filterData = selectRecord.filter(record => record.id !== item.id);
      console.log('filterData', filterData);
      dispatch(updateData(filterData));
      setloader(false);
    } catch (e) {
      setloader(false);
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Loader showModal={loader} LoaderColor={'black'} LoaderSize={'large'} />
      <EditModal
        name={name}
        setName={setName}
        userName={userName}
        setUserName={setUserName}
        email={email}
        setEmail={setEmail}
        id={id}
        visible={visible}
        setVisiable={setVisiable}
        selectRecord={selectRecord}
      />
      <View style={styles.subView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Create')}
          style={styles.opacity}>
          <AntDesign name="plus" style={styles.iconColor} />
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Search"
            value={search}
            onChangeText={text => setsearch(text)}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.dataView}>
          {selectRecord
            ?.filter(product =>
              product?.name?.toLowerCase()?.includes(search.toLowerCase()),
            )
            .map(item => (
              <View style={styles.subView1} key={item?.id}>
                <View style={styles.subView2}>
                  <View style={styles.nameView}>
                    <Text style={styles.dataText}>{item?.name}</Text>
                    <View style={styles.nameView}>
                      <TouchableOpacity onPress={() => edit(item)}>
                        <AntDesign name="edit" style={styles.editDeleteIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <AntDesign
                          name="delete"
                          onPress={() => deleteUser(item)}
                          style={styles.editDeleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.dataText1}>ID</Text>
                  <Text style={styles.dataText2}>{item?.id}</Text>
                  <Text style={styles.dataText1}>Username</Text>
                  <Text style={styles.dataText2}>{item?.username}</Text>
                  <Text style={styles.dataText1}>Email</Text>
                  <Text style={styles.dataText2}>{item?.email}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subView: {
    marginTop: responsiveHeight(2),
    height: responsiveHeight(22),
    // width: responsiveWidth(85),
    marginHorizontal: responsiveWidth(7.5),
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  opacity: {
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveWidth(4),
    // width:responsiveWidth(85),
    backgroundColor: '#006FB9',
    height: responsiveHeight(8),
    borderRadius: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
  },
  inputView: {
    marginHorizontal: responsiveWidth(4),
    // width:responsiveWidth(85),
    backgroundColor: '#e6e6e6',
    height: responsiveHeight(8),
    borderRadius: responsiveHeight(1.5),
  },
  inputText: {
    height: responsiveHeight(8),
    marginLeft: responsiveWidth(4),
  },
  dataView: {
    marginTop: responsiveHeight(2),
    // height: responsiveHeight(50),
    // width: responsiveWidth(85),
    marginHorizontal: responsiveWidth(7.5),
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  subView1: {
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  subView2: {
    marginHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(2),
  },
  dataText: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(1),
  },
  line: {
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 1,
  },
  dataText1: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(1),
  },
  dataText2: {
    fontSize: responsiveFontSize(1.8),
    marginVertical: responsiveHeight(1),
  },
  iconColor: {
    color: '#fff',
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
  },
  nameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editDeleteIcon: {
    fontSize: responsiveFontSize(3.5),
    color: '#006FB9',
    marginLeft: responsiveWidth(3),
  },
});
