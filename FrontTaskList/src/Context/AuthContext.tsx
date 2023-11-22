import { createContext, ReactNode, useState } from 'react';

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

let dataUserLocal = sessionStorage.getItem('user@BielTask');

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    name: dataUserLocal ? dataUserLocal : '',
  });

  const handleSetUser = (newUser: User) => {
    try {
      sessionStorage.setItem('user@BielTask', newUser.name);
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
