// // import React, { Component, PropTypes } from 'react';
// // import Dimensions from 'Dimensions';
// // import {
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   View,
// //   TouchableOpacity,
// //   Image,
// //   Button,
// //   Alert,
// //   ScrollView,
// //   TouchableHighlight
// // } from 'react-native';



// // const DEVICE_WIDTH = Dimensions.get('window').width;
// // const DEVICE_HEIGHT = Dimensions.get('window').height;

// // const styles = StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       backgroundColor: '#1B1C1D'
// //     },
// //     bottmContainer: {
// //       height: 60,
// //       flexDirection: 'row',
// //       margin : 40
// //     },
// //     background: {
// //       height: 800,
// //       width: 600,
// //       position: 'absolute',
// //     },
// //     button: {
// //       flex: 1,
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       borderRadius: 30
// //     },
// //     buttonText: {
// //       fontSize: 20,
// //       color: '#fff',
// //       fontWeight: 'bold',
// //     },
// //     title: {
// //       fontSize: 30,
// //       color: '#fff',
// //       fontWeight: 'bold',
// //       backgroundColor: 'rgba(0,0,0,0)'
// //     },
// //     desc: {
// //       fontSize: 20,
// //       color: '#fff',
// //       backgroundColor: 'rgba(0,0,0,0)',
// //       textAlign: 'center'
// //     },

// //     tt : {
// //       height: 120,
// //       // flexDirection: 'row',
// //       // margin : 40
// //     },
// //     tin:{
// //       backgroundColor: 'rgba(255, 255, 255, 0.4)',
// //       height: 60,
// //       width: DEVICE_WIDTH - 80,
// //       borderColor: 'gray', 
// //       borderWidth: 1 , 
// //       borderRadius: 30,
// //       margin : 10,
// //       marginHorizontal: 20,
// //       paddingLeft: 30,
// //     },
// //     tin2:{
// //       backgroundColor: 'rgba(255, 255, 255, 0.4)',
// //       height: 60,
// //       width: DEVICE_WIDTH - 80,
// //       borderColor: 'gray', 
// //       borderWidth: 1 , 
// //       borderRadius: 30,
// //       margin : 10,
// //       marginHorizontal: 20,
// //       paddingLeft: 30,
// //     },
// //     input: {
// //       width: 200,
// //       height: 44,
// //       padding: 10,
// //       borderWidth: 1,
// //       borderColor: 'black',
// //       marginBottom: 10,
// //     },
// //   });



// // export default class Login extends Component {
// //   static propTypes = {};
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       username: '',
// //       password: '',
// //         };
// //       }


// //   onLogin() {
// //     const { username, password } = this.state;

// //     Alert.alert('Credentials', `${username} + ${password}`);
// //   }


// //   render() {


// //     return (
// //              <View style={styles.container}> 
// //               <View style={styles.container}>
// //                 <Text style={[styles.title, { fontSize: 40}]}>Logo</Text>
// //               </View>

// //               <View style={styles.container}>
// //                 <Text style={styles.title}>MAD - Save You </Text>
// //                 <Text style={styles.desc}>Say Something</Text> 
// //               </View>

// //               <View>
// //                   <TextInput
// //                       style={styles.tin}
// //                       value={this.state.username}
// //                       onChangeText={(username) => this.setState({ username })}
// //                       placeholder={'Username'}
// //                   />
// //                   <TextInput
// //                       style={styles.tin2}
// //                       value={this.state.password}
// //                       onChangeText={(password) => this.setState({ password })}
// //                       placeholder={'Password'}
// //                       secureTextEntry={true}
// //                   />
// //               </View>

// //               <View style={styles.bottmContainer}>
// //                 <TouchableOpacity onPress={this.onLogin.bind(this)}  style={[styles.button, { backgroundColor: '#53423D'}]}> 
// //                   <Text style={styles.buttonText}>LOG IN</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           );
// //         }
// //       }




import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
// import input from 'input.js';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
// import Icon from '@expo/vector-icons/Ionicons';
import QRCode from 'react-native-qrcode';


import {
  createSwitchNavigator,
  createAppContainer,
  // createDrawerNavigator,
  // createBottomTabNavigator,
  // createStackNavigator
} from 'react-navigation';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


export default class App extends Component {
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
  }
  render() {
    return (
    <AppContainer/>
    );
  }
}
//  App;

// const apiData = [];

class WelcomeScreen extends Component {

  onGetUser = () => {
    fetch('http://140.135.113.73:8899/' + this.uid, {
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
        console.log("error");
      }).done();
    this.uid = null;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput style={styles.input}
            placeholder='id'
            onChangeText={(text) => { this.uid = text }}
            value={this.uid} />
          {/* <TouchableHighlight style={styles.button} onPress={this.onGetUser}>
            <Text style={styles.buttonText}>GET a User</Text>
          </TouchableHighlight> */}
          <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard2')}>
            <Text style={styles.buttonText}>GET a User</Text>
          </TouchableHighlight>
          <showqrcode id = {this.uid} />;
          {/* <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Dashboard2')}> */}
            {/* this.props.navigation.navigate('Dashboard2')(this.goGetUser)}> */}
          {/* {this.onGetUser}> */}
            {/* <Text style={styles.buttonText}>GET a User</Text>
          </TouchableHighlight> */}

      </View>
    );
  }
}



class showqrcode extends Component {
  onGetUser = () => {
    fetch('http://140.135.113.73:8899/' + this.props.id, {
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
        console.log("error");
      }).done();
    this.uid = null;
  }
  render() {
    return (
      console.log("qrcode" + apiData)
    );

    // const data = this.state.apiData;
    // const dataDisplay = this.state.apiData.map((item) => {
    //   const       arrayku = ['Nama: ', item.id, ', password: ', item.password, 'number:', item.img].join(' ');
    //   console.log(arrayku);
    //   return (
    //     <View>
    //       <Text>
    //         {item.img}
    //       </Text>
    //       <QRCode
    //         value={item.img}
    //         size={300}
    //         bgColor='black'
    //         fgColor='white' />
    //     </View>
    //   );
    // });
  }
}


const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard2: { screen: showqrcode },
});

const AppContainer = createAppContainer(AppSwitchNavigator);


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

