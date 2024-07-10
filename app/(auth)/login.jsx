import React,{useState} from 'react'

import { View, Text,ScrollView} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

// icons
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import {  EyeIcon, LockClosedIcon, EnvelopeIcon } from 'react-native-heroicons/outline'

// components
import Input from '../../components/Input'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'expo-router'

const Login = () => {
  const [form,setForm] = useState({})
  const [submitting,setSubmitting]= useState(false)

  const handleSubmit=()=>{
      console.log('submitting');
  }
  
  return (
    <SafeAreaView className='h-full bg-primary'>
        <ScrollView>
          <Header />
          <View className="mt-4 px-4">
            <Text className='text-3xl mb-1 text-white font-title'>Login</Text>
            <Text className='text-base mb-8 text-gray-300 font-text-light'>Let's get you into your account</Text>

            <Input 
                   PreIcon={EnvelopeIcon} 
                   label="Email" 
                   placeholder="John@gmail.com"
                   secure={false}
                   value={form.Email}
                   handleChange={(e)=>setForm({...form,Email:e})}
            />

            <Input 
              PreIcon={LockClosedIcon} 
              label="Password" 
              placeholder="password" 
              PostIcon={true}
              secure={true}
              value={form.password}
              handleChange={(e)=>setForm({...form,password:e})}
            />

            <View className="flex items-end my-1">
                <Text className="text-gray-400 font-text-light">Forgot Password ?</Text>
            </View>

            <Button classes="bg-primaryBtn" isLoading={submitting} handlePress={handleSubmit}>
                   <Text className="text-white text-xl font-text-light">Login</Text> 
            </Button>

            <View className="">
              <Text className='text-white text-xl font-text-light text-center'>Or</Text>
            </View>

            <Button classes="bg-none border border-gray-400" isLoading={submitting} handlePress={handleSubmit}>
                   <Text className="text-white text-base font-text-light">Login with Google</Text> 
            </Button>

          </View>
        </ScrollView>
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Login