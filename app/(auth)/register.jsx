import { View, Text,ScrollView,KeyboardAvoidingView,Platform } from 'react-native'
import React,{useState,useEffect} from 'react'

import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

// icons
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import {  UserIcon,EyeIcon, LockClosedIcon, EnvelopeIcon } from 'react-native-heroicons/outline'


// components
import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Link ,router} from 'expo-router'

// appwrite 
import { RegisterUser } from '../../Appwrite/Appwrite'

// Toast
import Toast from "react-native-root-toast";
import {ToastOptions} from '../../config/toast'

// context
import { useGlobalContext } from '../../context/Context'

// components
import Modal from '../../components/Loader/Modal'

const Register = () => {
    const [form,setForm] = useState({})
    const [submitting,setSubmitting]= useState(false)
   
    const {setUser,setIsLoggedIn,isLoggedIn} = useGlobalContext()
 
    if(isLoggedIn){
      router.replace('/')
    }


    const handleSubmit=async()=>{
       setSubmitting(true)
       const {Fullname,Email,password} = form 
       
       try {
         if(!Fullname || !Email || !password){
          throw Error("Please Fill in all the Fields")
         }
         
         if(password.length < 8){
          throw Error("Password must be more than 8 characters")
         }
         

        const newUser = await RegisterUser(Fullname,Email.toLowerCase(),password)
        
        if(newUser){
          router.replace('/login')
          Toast.show(`Account create successfully`,ToastOptions)
        }
         
       } catch (error) {
         Toast.show(`${error.message}`,ToastOptions)
       }
       finally{
         setSubmitting(false)
       }
    }
    
    return (
      <SafeAreaView className='h-full bg-primary pb-4'>
        <KeyboardAvoidingView className="flex-1"  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView>
             <Header />

              <Modal isOpen={submitting} text="Signing up"/>
            <View className="mt-2 px-4">
              <Text className='text-3xl mb-1 text-white font-title'>Register</Text>
              <Text className='text-base mb-8 text-gray-300 font-text-light'>Let's get you into your account</Text>

              <Input 
                PreIcon={UserIcon} 
                label="Fullname" 
                placeholder="John Doe"
                secure={false}
                value={form.Fullname}
                handleChange={(e)=>setForm({...form,Fullname:e})}
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
  
  
              <Button classes="bg-primaryBtn mt-2" isLoading={submitting} handlePress={handleSubmit}>
                     <Text className="text-white text-xl font-text-light">Register</Text> 
              </Button>
  
              <View className="my-3">
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