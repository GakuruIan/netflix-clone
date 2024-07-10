import React,{useState} from 'react';
import { View,Text,TextInput, TouchableOpacity } from 'react-native';

import {  EyeIcon,EyeSlashIcon } from 'react-native-heroicons/outline'

const Input = ({value,handleChange,secure,PreIcon,PostIcon,placeholder,label}) => {
    const [showPassword,setShowPassword] = useState(false);

    return (
        <View className="mb-6">
            <Text className="text-[16px] font-text-light text-gray-400 mb-2">{label}</Text>
            <View className="flex-row items-center px-2 py-3 bg-[#24272D] w-full rounded-md">
                <PreIcon color="#fff" scale={20}/>
                <TextInput placeholder={placeholder}  
                  className="ml-2 flex-1 text-white"
                  placeholderTextColor='#6B7280'
                  secureTextEntry={secure && !showPassword}
                  value={value}
                  onChangeText={handleChange}
                />
                

                { PostIcon && 
                 
                 <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                     {
                        showPassword ? <EyeIcon color="#fff"/> : <EyeSlashIcon color="#fff"/>
                     }
                 </TouchableOpacity>
                }
            </View>
         </View>
    );
}



export default Input;