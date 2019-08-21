import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
// import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  RefreshControl
} from 'react-native';


const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',                           
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    height: 60,
    width: DEVICE_WIDTH - 80,
    borderColor: 'gray',
    borderWidth: 1 , 
    borderRadius: 30,
    margin : 10,
    marginHorizontal: 20,
    paddingLeft: 30,
  },
  button: {
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#97cbff'
    },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    },

});


export default class Login extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      apiData: [],
      naData: [],
    };
    this.uid = null;
    this.upw = null;
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  onGetUser = () => {
    fetch('http://192.168.1.104:8899/' + this.uid, {
      method: 'GET',
      cache: 'reload'
    })
      .then((response) => {
        return response.json();
      }).then((jsonData) => {
        this.setState({
        apiData: jsonData,
        })
        console.log(this.state.apiData);
      })
      .catch((error) => {
        console.log(error);
      }).done();
    this.uid = null;
  }

  render() {

    const data = this.state.apiData;

    let dataDisplay = this.state.apiData.map((item) => {
      var arrayku = ['Nama: ', item.id, ', password: ', item.password, 'number:', item.img].join(' ');
      console.log(arrayku);
      return (
        <View>
          <Text>
            {item.img}
          </Text>
          <QRCode
            value={item.img}
            size={300}
            bgColor='black'
            fgColor='white' />
        </View>
      );
    });

    return (
      
      <View style={styles.container}>
        <View style={styles.container}>
          <TextInput style={styles.input}
            placeholder='ID'
            onChangeText={(text) => { this.uid = text }}
            value={this.uid} />
          <TextInput style={styles.input}
            placeholder='Password'
            onChangeText={(text) => { this.upw = text }}
            value={this.upw} />
          <TouchableHighlight style={styles.button} onPress={this.onGetUser}>
            <Text style={styles.buttonText}>GET a User</Text>
          </TouchableHighlight>
          <View>{dataDisplay}</View>
         </View>
                 refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      </View>
    );
  }
}
