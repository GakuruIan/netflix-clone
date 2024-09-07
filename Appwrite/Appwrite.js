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
  defaultImagesCollectionId: AppwriteConfig.DEFAULFIMAGESCOLLECTIONID,
  storageBucketId: AppwriteConfig.STORAGEBUCKETID,
  profileBucketId:AppwriteConfig.PROFILEBUCKETID
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usersCollectionId,
  profileCollectionId,
  defaultImagesCollectionId,
  storageBucketId,
  profileBucketId
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
      ID.unique(),
      {
        accountId: newAccount.$id,
        fullname,
        email,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const Login = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const Logout = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const createProfile = async (userId, name, image_ref) => {
  // user has the option to upload their image other should choose one of the default images given
  try {
    const newProfile = await databases.createDocument(
      databaseId,
      profileCollectionId,
      ID.unique(),
      {
        name,
        user: userId,
        defaultImages: image_ref,
      }
    );

    return newProfile;
  } catch (error) {
    throw new Error(error);
  }
};


const UploadFile = async (file) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      profileBucketId,
      ID.unique(),
      asset
    );

   const fileUrl = storage.getFileView(profileBucketId,uploadedFile.$id)

   return  fileUrl

  } catch (error) {
    throw new Error(error)
  }
};

export const EditProfile = async (id, name, image) => {
  let fileUrl
  try {
    if(image){
      fileUrl = await UploadFile(image)
    }
    
    const newProfile = await databases.updateDocument(
      databaseId,
      profileCollectionId,
      id,
      {
        name,
        image:fileUrl
      }
    );
    return newProfile;

  } catch (error) {
    throw new Error(error);
  }
};

const deleteFile=async(fileId)=>{
    try {
      const result = await storage.deleteFile(profileBucketId,fileId)

      return result
    } catch (error) {
      throw new Error(error);
    }
}

export const DeleteProfile=async(id)=>{
   try {
    const result = await databases.deleteDocument(databaseId,profileCollectionId,id)

    return result
    
   } catch (error) {
     throw new Error(error);
   }
}

export const DeleteAccount=async()=>{
   try {
     const id = (await account.get()).$id

    //  await account.deleteIdentity(id)

   } catch (error) {
     throw new Error(error);
   }
}

export const Getcurrentuser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No account");

    const currentUser = await databases.listDocuments(
      databaseId,
      Config.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error("No user found");

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const GetuserProfile = async (userID) => {
  try {
    const profiles = await databases.listDocuments(
      databaseId,
      profileCollectionId,
      [Query.equal("user", userID)]
    );

    return profiles.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const GetDefaultImages = async () => {
  try {
    const Images = await databases.listDocuments(
      databaseId,
      defaultImagesCollectionId
    );

    return Images;
  } catch (error) {
    throw new Error(error);
  }
};
