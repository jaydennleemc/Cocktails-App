import React, { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as apiService from '../services/APIService';
import DrinkList from '../components/DrinkList';
import { Facebook, Instagram } from 'react-content-loader/native';
import { Actions } from 'react-native-router-flux';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([1, 2, 3]);

  const fetchPopularDrink = () => {
    apiService.getCocktailDrink().then(res => {
      let data = res.data.drinks;
      setLoading(false);
      data = data.map(item => {
        return {
          ...item,
          strType: 'Cocktail'
        };
      });
      setDrinks(data);
    }, error => {
      console.log(error);
    });

    apiService.getOrdinaryDrink().then(res => {
      let data = res.data.drinks;
      data = data.map(item => {
        return {
          ...item,
          strType: 'Ordinary'
        };
      });
      let myDrinks = drinks.concat(data);
      myDrinks = myDrinks.sort(() => Math.random() - 0.5);
      setDrinks(myDrinks);
    }, error => {
      console.log(error);
    });
  };

  useEffect(() => {
    fetchPopularDrink();
  }, []);

  const renderItem = ({ item }) => {
    if (loading) {
      return <Facebook />;
    } else {
      return (
        <View style={styles.renderItem} key={item.idDrink}>
          <TouchableOpacity style={styles.renderItem.imageContainer} onPress={() => Actions.push('DrinkDetailPage', { drink: item })}>
            <FastImage
              resizeMode="stretch"
              style={styles.renderItem.image}
              source={{ uri: item.strDrinkThumb }}
            />
          </TouchableOpacity>
          <Text style={styles.renderItem.category}>{item.strType}</Text>
          <Text style={styles.renderItem.name}>{item.strDrink}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.location}>Hong Kong</Text>
      <View style={styles.header}>
        <Text style={styles.title}> Cocktails </Text>
        <TouchableOpacity style={styles.searchContainer}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <View style={styles.renderItem}>
              <DrinkList category={'Cocktail'} />
              <DrinkList category={'Ordinary'} />
            </View>
          );
        }}
        style={styles.flatList}
        data={drinks}
        renderItem={renderItem}
        keyExtractor={item => item.idDrink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  location: {
    color: '#6e6d6f',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 12,
  },
  title: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#393939',
  },
  flatList: {
    marginTop: 12,
  },
  renderItem: {
    flex: 1,
    width: '100%',
    imageContainer: {
      margin: 10,
    },
    image: {
      width: '100%',
      height: 120,
      borderRadius: 10,
    },
    category: {
      color: 'lightgrey',
      marginLeft: 12,
      fontSize: 16,
      fontWeight: 'bold',
    },
    name: {
      color: '#fff',
      marginLeft: 12,
    },
  },
});

export default HomePage;
