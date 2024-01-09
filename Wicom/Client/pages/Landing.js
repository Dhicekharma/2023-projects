import React, { Component } from 'react'
import { Text, View ,Button,TouchableOpacity} from 'react-native'

const Landing=function ({navigation}){

    return (
      <View>
      <View>
          <Text>Wi-Com </Text> 
      </View>
     <View>
      <Text>Seamless</Text>
      <Text> communication </Text>
      <Text>endless possibilities</Text>
      <TouchableOpacity>
      <Text>Home Screen</Text>
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Registration')}
    />
      </TouchableOpacity>

     </View>
    </View> 
    )
  }
export default Landing;
