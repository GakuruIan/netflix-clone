import React from 'react'

import { Tabs } from 'expo-router';

// icons 
import { HomeIcon,MagnifyingGlassIcon,ArrowDownOnSquareStackIcon,FireIcon } from "react-native-heroicons/outline";

const Layout = () => {
  return (
   <Tabs
    screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor:"#DF0912",
        tabBarInactiveTintColor:"#fff",
        tabBarStyle :{
            backgroundColor:"#010101",
            borderTopWidth:1,
            borderTopColor:"#24272D",
            height:65
        }
    }}
   >

     <Tabs.Screen 
        name='home'
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused})=> <HomeIcon name="Home" color={color} focused={focused}/>
        }}
      />

       <Tabs.Screen 
        name='new'
        options={{
            title:'Hot & New',
            headerShown:false,
            tabBarIcon:({color,focused})=> <FireIcon name="Hot" color={color} focused={focused}/>
        }}
      />

      <Tabs.Screen 
        name='search'
        options={{
            title:'Search',
            headerShown:false,
            tabBarIcon:({color,focused})=> <MagnifyingGlassIcon name="Search" color={color} focused={focused}/>
        }}
      />

      <Tabs.Screen 
        name='downloads'
        options={{
            title:'Downloads',
            headerShown:false,
            tabBarIcon:({color,focused})=> <ArrowDownOnSquareStackIcon name="Downloads" color={color} focused={focused}/>
        }}
      />
   </Tabs>
  )
}

export default Layout