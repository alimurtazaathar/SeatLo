//ios: 840323221565-3uhjqdn83sn3k92bg8haqp833rp1vt6b.apps.googleusercontent.com
//andorid: 840323221565-s0uqb9hjqenc2uqu54uge934ublh3njl.apps.googleusercontent.com
import { useContext, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from './useStorageState';
import {router}from 'expo-router'
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
});
console.log(redirectUri);
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [userInfo,setUserInfo]=useState(null);
  const [request,response,promptAsync]=Google.useAuthRequest(
    {
      androidClientId:"840323221565-s0uqb9hjqenc2uqu54uge934ublh3njl.apps.googleusercontent.com",
      iosClientId:"840323221565-3uhjqdn83sn3k92bg8haqp833rp1vt6b.apps.googleusercontent.com"
    }
  )
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          promptAsync();
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
          router.replace('/')
        },
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
