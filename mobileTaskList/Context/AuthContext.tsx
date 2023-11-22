import { createContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  name: string;
};

type AuthContextData = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({ name: '' });

  useEffect(() => {
    // Carregar dados do usuário da AsyncStorage ao iniciar o componente
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user@BielTask');
        if (storedUser) {
          setUser({ name: storedUser });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSetUser = async (newUser: User) => {
    try {
      // Armazenar dados do usuário na AsyncStorage
      await AsyncStorage.setItem('user@BielTask', newUser.name);
      setUser(newUser);
    } catch (error) {
      console.error('Erro ao armazenar dados do usuário:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
}
