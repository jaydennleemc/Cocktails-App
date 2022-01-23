import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { Actions } from 'react-native-router-flux';
import * as apiService from '../services/APIService';
import FastImage from 'react-native-fast-image';
import ListLoader from '../components/ListLoader';

const DrinkListPage = props => {
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([1, 2, 3, 4, 5]);

  const setTitle = () => {
    if (props.category === 'Cocktail') {
      Actions.refresh({ title: 'Cocktail Drinks' });
    } else {
      Actions.refresh({ title: 'Ordinary Drinks' });
    }
  };

  const fetchDrinkList = () => {
    if (props.category == 'Cocktail') {
      apiService.getCocktailDrink().then(res => {
        let data = res.data.drinks;
        setDrinks(data);
        setLoading(false);
      }, error => {
        console.log(error);
      });
    } else {
      apiService.getOrdinaryDrink().then(res => {
        let data = res.data.drinks;
        setDrinks(data);
        setLoading(false);
      }, error => {
        console.log(error);
      });
    }
  };

  useEffect(() => {
    setTitle();
    fetchDrinkList();
  }, []);

  const renderItem = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.renderItem}>
          <ListLoader />
        </View>
      );
    } else {
      return (
        <View style={styles.renderItem} key={item.idDrink}>
          <FastImage
            style={styles.renderItem.image}
            source={{ uri: item.strDrinkThumb }}
          />
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <Text style={styles.renderItem.text}>{item.strDrink}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: 20 }}
        data={drinks}
        renderItem={renderItem}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  flatList: {
    marginHorizontal: 10,
  },
  renderItem: {
    flexDirection: 'row',
    marginVertical: 4,
    image: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
    text: {
      marginHorizontal: 8,
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
});

export default DrinkListPage;
