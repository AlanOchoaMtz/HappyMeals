import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import useFetch from '../hooks/useFetch';

export default ({ navigation }) => {
  const id = navigation.getParam('_id')
  const { loading, data } = useFetch(`https://serverless.alanochoamtz.vercel.app/api/meals/${id}`)
  return (
  <View style={styles.container}>
    {loading ? <Text>Cargando...</Text> :
    <>  
      <Text>{data._id}</Text>
      <Text>{data.name}</Text>
      <Text>{data.desc}</Text>
      <Button title="Ordenar" onPress={() => {
	AsyncStorage.getItem('token').then(x => {
	  if(x){
	fetch('https://serverless.alanochoamtz.vercel.app/api/orders', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    authorization: x,
	  },
	  body: JSON.stringify({
	    meal_id: id,
	  })
	}).then(x => {
	  console.log(x.status)
	  if(x.status != 203) {
	    return alert('Orden no pudo generarse')
	  }
	  alert('Orden generada con éxito')
	  navigation.navigate('Meals')
	})

	  }
	})
      }}/>
      <Text></Text>
      <Button title="Cancelar" onPress={() => navigation.navigate('Meals')}/>
    </>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
