import React from 'react'
import {View, Text, Button} from 'react-native'

export default class Login extends React.Component{
    render(){
        return(
            <View>
                <Text>Login</Text>
                <Button title={'登录'} onPress={()=>{
                    this.props.navigation.navigate("Home")
                }}/>
            </View>
        )
    }
}

