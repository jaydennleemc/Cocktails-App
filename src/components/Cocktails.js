import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';

import * as apiService from '../services/APIService';

const Category = 'Cocktail'

const routeToDrinkDetail = (item) => {
  console.log(item);
}

const routeToDrinkList = (category) => {
  Actions.push('DrinkListPage', { category });
}

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.renderItem} onPress={() => routeToDrinkDetail(item)}>
      <FastImage style={styles.renderItem.image} source={{ uri: item.strDrinkThumb }} />
    </TouchableOpacity>
  );
};

const Cocktails = () => {
  const [cocktailDrinks, setcocktailDrinks] = useState([]);
  useEffect(() => {
    apiService.getCocktailDrink().then(res => {
      let data = res.data.drinks;
      // shuffle drinks array
      data = data.sort(() => Math.random() - 0.5);
      data = data.splice(0, 10);
      // splice drink withtin 10 drinks
      setcocktailDrinks(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header.title}>Cocktail Drinks</Text>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', marginTop: 4 }}
            onPress={() => routeToDrinkList(Category)}>
            <Text style={styles.header.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.flatlist}
        horizontal
        data={cocktailDrinks} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    alignContent: 'center',
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 12
    },
    seeAll: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  flatlist: {
    marginTop: 12,
  },
  renderItem: {
    width: 100,
    height: 100,
    alignItems: 'center',
    image: {
      width: 80,
      height: 80,
      borderRadius: 50
    }
  }
});

export default Cocktails;