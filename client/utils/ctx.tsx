import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';

interface UserData {
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

const AuthContext = createContext<{
  signIn: (userData: UserData) => void;
  signOut: () => void;
  session?: UserData | null;
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

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        signIn: (userData: UserData) => {
          setSession(JSON.stringify(userData));
        },
        signOut: () => {
          setSession(null);
          router.replace('/');
        },
        session: session ? JSON.parse(session) : null,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
