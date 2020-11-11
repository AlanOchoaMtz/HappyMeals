import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Alert, AsyncStorage} from 'react-native'
import useForm from '../hooks/useForm'

export default ({ navigation }) => {
  const initialState = {
    email: '',
    password: '',
  }
  const onSubmit = values => {
    fetch('https://serverless.alanochoamtz.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
	'Content-Type': 'Application/json',
      },
      body: JSON.stringify(values),
    }).then(x => x.text())
      .then(x => {
	try {
	  return JSON.parse(x)
	} catch {
	  throw x
	}
      })
      .then(x => {
	AsyncStorage.setItem('token', x.token)
	navigation.navigate('Meals')
      })
      .catch(e => Alert.alert('Error', e))
  }

  const {subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
	autoCapitalize='none'
	value={inputs.email}
	onChangeText={subscribe('email')}
	style={styles.input}
	placeholder='Email' 
      />
      <TextInput
	autoCapitalize='none'
	value={inputs.password} 
	onChangeText={subscribe('password')} 
	style={styles.input}
	placeholder='Password'
	secureTextEntry={true}
      />
      <Button style={styles.button} title='Iniciar Sesión' onPress={handleSubmit}/>
      <Text/>
      <Button style={styles.button} title='Registrarse' onPress={() => navigation.navigate('Register')}/>
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
