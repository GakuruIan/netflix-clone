import React from 'react';
import {  TouchableOpacity } from 'react-native';

const Button = ({classes,children,outline,handlePress,isLoading}) => {
    return (
        <TouchableOpacity onPress={()=>handlePress()} disabled={isLoading} className={`w-full  rounded-md  px-2 py-2 flex items-center justify-center ${classes} ${outline ? 'bg-none border border-primaryBtn':''}`}>
            {children}
        </TouchableOpacity>
    );
}

export default Button;