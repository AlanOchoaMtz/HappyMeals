import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ListItem from '../components/ListItem';
const data = [
  {_id: 'lalala', name: 'Churros', desc: 'Churros riquisimos'},
]

const Meals = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
	style={styles.list}
	data={data}
	keyExtractor={x => x._id}
	renderItem={({ item }) => 
	    <ListItem
	      onPress={() => navigation.navigate('Modal', {_id: item._id})}
	      name={item.name}
	    />
	}
      />
    </View>
  )
}

Meals.navigationOption = ({
  title: 'Platillos',
})

export default Meals

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  list: {
    alignSelf: 'stretch',
  }
})
