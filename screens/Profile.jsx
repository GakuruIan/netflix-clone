import { View,Text,ScrollView,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

// components
import Header from '../components/Header'

// icons
import { PencilSquareIcon, PlusIcon } from 'react-native-heroicons/solid'

// images
import blue from '../assets/images/Profile/blue-profile.png'
import purple from '../assets/images/Profile/purple-profile.png'
import red from '../assets/images/Profile/red-profile.png'
import green from '../assets/images/Profile/green-profile.png'


const Profile = () => {
  return (
   <SafeAreaView className='bg-primary h-full'>
     <ScrollView className='h-full'>
        <Header text="Who's watching? " showPostIcon={true} PostIcon={PencilSquareIcon}/>

         <View className="px-4 mt-8">
            <View className='flex-row gap-x-2 '>
                <View className="flex-1">
                  <Image source={green} resizeMode='cover' className="h-40 w-full object-cover"/>
                  <Text className="text-white font-text-light text-xl mt-2">Profile</Text>
                </View>
                <View className="flex-1">
                  <Image source={green} resizeMode='cover' className="h-40 w-full object-cover"/>
                  <Text className="text-white font-text-light text-xl mt-2">Profile</Text>
                </View>

            </View>
         </View>

     </ScrollView>
     <StatusBar style='light'/>
   </SafeAreaView>
  )
}

export default Profile