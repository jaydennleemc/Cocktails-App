import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';
import CircleLoader from './CircleLoader';
import * as apiService from '../services/APIService';


const DrinkList = (props) => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Cocktail');
  const [drinks, setDrinks] = useState([1, 2, 3, 4, 5]);

  const setDrinkData = (data) => {
    // shuffle drinks array
    data = data.sort(() => Math.random() - 0.5);
    data = data.splice(0, 10);
    // splice drink withtin 10 drinks
    setDrinks(data);
    setLoading(false);
  }

  const fetchDrinkList = () => {
    if (props.category == 'Cocktail') {
      apiService.getCocktailDrink().then(res => {
        let data = res.data.drinks;
        setDrinkData(data);
      });
    } else {
      apiService.getOrdinaryDrink().then(res => {
        let data = res.data.drinks;
        setDrinkData(data);
      });
    }
  }



  useEffect(() => {
    fetchDrinkList();
    if (props.category == 'Cocktail') {
      setTitle('Cocktail');
    } else {
      setTitle('Ordinary');
    }
  }, []);


  const routeToDrinkDetail = (item) => {
    console.log(item);
  }

  const routeToDrinkList = () => {
    Actions.push('DrinkListPage', { category: title });
  }

  const renderItem = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.renderItem}>
          <CircleLoader />
        </View>
      )
    } else {
      return (
        <TouchableOpacity style={styles.renderItem} onPress={() => routeToDrinkDetail(item)}>
          <FastImage style={styles.renderItem.image} source={{ uri: item.strDrinkThumb }} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header.title}>{title} Drinks</Text>
        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', marginTop: 4 }}
            onPress={() => routeToDrinkList()}>
            <Text style={styles.header.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.flatlist}
        horizontal
        data={drinks}
        renderItem={renderItem}
        keyExtractor={item => item.idDrink} />
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

export default DrinkList;