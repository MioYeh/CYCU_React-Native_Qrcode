import React from 'react'
import {View, Text, Button} from 'react-native'

export default class Home extends React.Component{
    render(){
        return (
            <View>
                <Text>Home</Text>
                <Text>此时按下返回键，退出应用</Text>
            </View>
        )
    }
}