import {useState, useEffect, useContext} from 'react'
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthProvider } from './Context/AuthContext';
import { HomeScreen } from './screens/Home';
import { TasksScreen } from './screens/Tasks';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignInFormData = {
  name: string;
};

const StackNavigator = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext)
  const [initialRoute, setInitialRoute] = useState('Inicio'); // Rota inicial padrão

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user@BielTask');
        if (storedUser) {
          setInitialRoute('Tarefas'); // Se houver um usuário, altera a rota inicial para Tarefas
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      }
    };

    checkUser();
  }, []); 
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <NavigationContainer>
          <StackNavigator.Navigator initialRouteName={initialRoute}>
            <StackNavigator.Screen name="Inicio" options={{title: 'Login'}}>
              {(props) => <HomeScreen key={"Inicio"} {...props} />}
            </StackNavigator.Screen>
            <StackNavigator.Screen name="Tarefas" component={TasksScreen} />
          </StackNavigator.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </AuthProvider>
    </NativeBaseProvider>
  );
}