import { useContext, createContext, type PropsWithChildren, useState,useEffect } from 'react';
import { useStorageState } from './useStorageState';
import {router}from 'expo-router'


const AuthContext = createContext<{
  signIn: (idToken:string|null) => void;
 
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  isProfileComplete:boolean;

}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  isProfileComplete:false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [userInfo,setUserInfo]=useState(null);
  const [isProfileComplete,setIsProfileComplete]=useState(false);
//   useEffect(() => {
  
//     if (session) {
//       // user profile data available or not??!
//       // fetch('https://your-api.com/profile/status', {
//       //   headers: { Authorization: `Bearer ${session}` },
//       // })
//       // .then(res => res.json())
//       // .then(data => {
//       //   setIsProfileComplete(true); // or whatever your key is
//       // });
// setIsProfileComplete(true);

//     }
   
//   }, [session]);

useEffect(() => {
  if (session) {
    //making api endpoint here
    //for now
    setIsProfileComplete(true);

    if (isProfileComplete) {
      // Redirect to the home page if the profile is complete
      router.replace('/');
    } else {
      // Redirect to the form page if the profile is incomplete
      router.replace('/form');
    }
  } else {
    // Redirect to the sign-in page if no session exists
    router.replace('/sign-in');
  }
}, [session, isProfileComplete]);

  return (
    <AuthContext.Provider
      value={{
        // signIn: (authToken:string|null) => {
          signIn: (idToken) => {
          setSession(idToken);
        },
        signOut: () => {
          setSession(null);
          router.replace('/sign-in')
        },
        session,
        isLoading,
        isProfileComplete
      }}>
      {children}
    </AuthContext.Provider>
  );
}
