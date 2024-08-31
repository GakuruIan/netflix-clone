import React from 'react';
import {  TouchableOpacity,ActivityIndicator } from 'react-native';

const Button = ({classes,children,outline,handlePress,isLoading}) => {
    return (
        <TouchableOpacity onPress={()=>handlePress()} disabled={isLoading} className={`w-full flex-row   rounded-md  px-2 py-2 flex items-center justify-center ${classes} ${outline ? 'bg-none border border-primaryBtn':''}`}>
            {/* {
                isLoading && <ActivityIndicator size="small" color="#fff" className='mr-2'/>
            } */}
            {children}
        </TouchableOpacity>
    );
}

export default Button;