import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native'
import useForm from '../hooks/useForm'

export default ({ navigation }) => {
  const initialState = {
    email: '',
    password: '',
  }
  const onSubmit = (values) => {
    fetch('https://serverless.alanochoamtz.vercel.app/api/auth/register', {
      method: 'POST',
      headers: {
	'Content-Type': 'Application/json',
      },
      body: JSON.stringify(values),
    }).then(x => x.text())
      .then(x => {
	if(x === 'Usuario creado con éxito') {
	  return Alert.alert(
	    'Éxito',
	    x,
	    [
	      { text: 'Ir al Inicio', onPress: () => navigation.navigate('Login')}
	    ]
	  )
	}
	Alert.alert(
	  'Error',
	  x,
	)
      })
  }

  const {subscribe, handleSubmit, inputs } = useForm(initialState, onSubmit)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
	value={inputs.email}
	onChangeText={subscribe('email')}
	style={styles.input}
	placeholder='Email'
	autoCapitalize='none'
      />
      <TextInput
	autoCapitalize='none'
	value={inputs.password}
	onChangeText={subscribe('password')}
	style={styles.input}
	placeholder='Password'
	secureTextEntry={true}
      />
      <Button style={styles.button} title='Enviar' onPress={handleSubmit}/>
      <Text/>
      <Button style={styles.button} title='Cancelar' onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}
const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 5,
  }
})
