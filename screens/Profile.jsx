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

         <View className="px-4 mt-8 items-center">
            <View className='flex flex-row  w-80  flex-wrap items-center justify-center gap-x-10 gap-y-8'>

                <View className="w-28">
                  <Image source={green} resizeMode='cover' className="h-24 w-full object-cover rounded-md"/>
                  <Text className="text-white text-base font-text-light  mt-1 text-center">Profile</Text>
                </View>

                <View className="w-28">
                  <Image source={purple} resizeMode='cover' className="h-24 w-full object-cover rounded-md"/>
                  <Text className="text-white text-base font-text-light  mt-1 text-center">Profile</Text>
                </View>

                <View className="w-28">
                  <Image source={blue} resizeMode='cover' className="h-24 w-full object-cover rounded-md"/>
                  <Text className="text-white text-base font-text-light  mt-1 text-center">Profile</Text>
                </View>

                <View className="w-28">
                  <Image source={red} resizeMode='cover' className="h-24 w-full object-cover rounded-md"/>
                  <Text className="text-white text-base font-text-light  mt-1 text-center">Profile</Text>
                </View>


                  {/* create profile */}
                 <View className="w-24">
                   <View className='h-24 rounded-md items-center justify-center border border-gray-300'>
                      <PlusIcon color="#fff" scale={20}/>
                   </View>
                   <Text className="text-white text-base font-text-light mt-1 text-center">Add profile</Text>
                </View>
                 {/* create profile */}
                
            </View>
         </View>

     </ScrollView>
     <StatusBar style='light'/>
   </SafeAreaView>
  )
}

export default Profile