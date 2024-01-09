import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeHeader from '../components/HomeHeader'
import Contacts from '../components/Contacts'
import { useAtom } from 'jotai'
import { userDetailAtom } from '../assets/lib/userDetailsAtom'

function HomeScreen ({navigation}) 
{ 
const [user]=useAtom(userDetailAtom) 
  
  
    return (
      <View>
       <HomeHeader/>
        <Text> new HomeScreen </Text>
      <Contacts navigation={navigation}/>
      </View>
    )
  }
export default HomeScreen;
