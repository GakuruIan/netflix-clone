import { View, Text,ScrollView,KeyboardAvoidingView,Platform } from 'react-native'
import React,{useState} from 'react'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

// icons
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import {  UserIcon,EyeIcon, LockClosedIcon, EnvelopeIcon } from 'react-native-heroicons/outline'


// components
import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Link } from 'expo-router'


const Register = () => {
    const [form,setForm] = useState({})
    const [submitting,setSubmitting]= useState(false)
  
    const handleSubmit=()=>{
        console.log('submitting');
    }
    
    return (
      <SafeAreaView className='h-full bg-primary'>
        <KeyboardAvoidingView className="flex-1"  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <Header />
            <View className="mt-2 px-4">
              <Text className='text-3xl mb-1 text-white font-title'>Register</Text>
              <Text className='text-base mb-8 text-gray-300 font-text-light'>Let's get you into your account</Text>

              <Input 
                PreIcon={UserIcon} 
                label="Fullname" 
                placeholder="John Doe"
                secure={false}
                value={form.Email}
                handleChange={(e)=>setForm({...form,Username:e})}
              />
  
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

            <View className="flex items-start my-1">
                <Link href='/login' className="text-gray-400 font-text-light">Already have an account? Login</Link>
            </View>
  
  
              <Button classes="bg-primaryBtn" isLoading={submitting} handlePress={handleSubmit}>
                     <Text className="text-white text-xl font-text-light">Register</Text> 
              </Button>
  
              <View className="">
                <Text className='text-white text-xl font-text-light text-center'>Or</Text>
              </View>
  
              <Button classes="bg-none border border-gray-400" isLoading={submitting} handlePress={handleSubmit}>
                     <Text className="text-white text-base font-text-light">Signup with Google</Text> 
              </Button>
  
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <StatusBar style='light'/>
      </SafeAreaView>
    )
}

export default Register