import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import * as apiService from '../services/APIService';
import FastImage from 'react-native-fast-image';

export default DrinkListPage = (props) => {

  const [drinks, setdrinks] = useState([]);

  const setTitle = () => {
    if (props.category === 'Cocktail') {
      Actions.refresh({ title: 'Cocktail Drinks' });
    } else {
      Actions.refresh({ title: 'Ordinary Drinks' });
    }
  }

  const fetchDrinkList = () => {
    if (props.category == 'Cocktail') {
      apiService.getCocktailDrink().then(res => {
        let data = res.data.drinks;
        setdrinks(data);
      });
    } else {
      apiService.getOrdinaryDrink().then(res => {
        let data = res.data.drinks;
        setdrinks(data);
      });
    }
  }

  useEffect(() => {
    setTitle();
    fetchDrinkList();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItem}>
        <FastImage style={styles.renderItem.image} source={{ uri: item.strDrinkThumb }} />
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
          <Text style={styles.renderItem.text}>{item.strDrink}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={drinks}
        renderItem={renderItem}
        style={styles.flatlist} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatlist: {
    marginHorizontal: 10,
  },
  renderItem: {
    flexDirection: 'row',
    marginVertical: 4,
    image: {
      width: 80,
      height: 80,
      borderRadius: 50
    },
    text: {
      marginHorizontal: 8,
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }
  }

});