import { useState, useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { FormControl, Stack, Input, Button, Text } from 'native-base';
import { AuthContext } from '../../Context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as yup from 'yup';
import { useFormik } from 'formik';


type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any, 'Home'>;
};
const validationSchema = yup.object().shape({
  name: yup.string().max(30, 'O Nome deve ter no máximo 30 caracteres!').min(3, "O Nome deve ter no mínimo ter 3 caracteres!").required('O Nome é obrigatório')
});

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setUser({name: formik.values.name})
        navigation.navigate('Tarefas');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/BielLogo-full2.png')} alt="Imagem de teste" />
      <FormControl mt={2}>
        <Stack my={4}>
          <FormControl.Label>Nome do usuário</FormControl.Label>
          <Input
            p={2}
            borderRadius={8}
            borderWidth={2}
            backgroundColor={'trueGray.100'}
            _focus={formik.touched.name && formik.errors.name ?  {borderColor: 'red.500'} : { borderColor: 'blue.400' }}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
  
          />
          {formik.touched.name && formik.errors.name ?  (
            <Text color="red.500">{formik.errors.name}</Text>
          ) : null}
        </Stack>
        <Button 
          borderRadius={8}
          fontWeight={700}
          bg={'blue.500'}
          _pressed={{ bg: 'blue.600' }}
          disabled={loading}
          _disabled={{
            bg: 'blue.200',
            fontWeight: 400,
          }}
          onPress={() => formik.handleSubmit()}
        >
          Entrar
        </Button>
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12
  }
});
