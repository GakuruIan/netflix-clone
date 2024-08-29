import AppwriteConfig from "../config/Appwrite";
import {
  Client,
  Account,
  ID,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

const Config = {
  endpoint: AppwriteConfig.ENDPOINT,
  platform: AppwriteConfig.PLATFORM,
  projectId: AppwriteConfig.PROJECTID,
  databaseId: AppwriteConfig.DATABASEID,
  usersCollectionId: AppwriteConfig.USERSCOLLECTIONID,
  profileCollectionId: AppwriteConfig.PROFILECOLLECTIONID,
  storageBucketId: AppwriteConfig.STORAGEBUCKETID,
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usersCollectionId,
  profileCollectionId,
  storageBucketId,
} = Config;

const client = new Client();

client.setEndpoint(endpoint).setPlatform(platform).setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const RegisterUser = async (fullname, email, password) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullname
    );

    if (!newAccount) throw Error;

    const newUser = await databases.createDocument(
      databaseId,
      usersCollectionId,
      ID.unique(),{
        accountId:newAccount.$id,
        fullname,
        email
      }
    );

    return newUser
  } catch (error) {
     throw new Error(error)
  }
};

export const Login=async(email,password)=>{
    try {
        const session = await account.createEmailPasswordSession(email,password)

        return session
    } catch (error) {
         throw new Error(error)
    }
}

export const createProfile=async(userID,name,image_ref,image)=>{
    // user has the option to upload their image other should choose one of the default images given
    try {
        const newProfile = await databases.createDocument(databaseId,profileCollectionId,ID.unique,{
            name,
            userID,
            image_ref
        })

        return newProfile
    } catch (error) {
        throw new Error(error)
    }
}

export const Getcurrentuser=async()=>{
  try {
      const currentAccount = await account.get()

      if(!currentAccount) throw new Error("No account")

      const currentUser = await databases.listDocuments(Config.databaseId,
          Config.usersCollectionId,
          [Query.equal('accountId',currentAccount.$id)])

      if(!currentUser) throw new Error("No user found")
      
      return currentUser.documents[0]
  } catch (error) {
      console.log(error);
  }
}