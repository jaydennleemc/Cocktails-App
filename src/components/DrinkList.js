import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleLoader from './CircleLoader';
import * as apiService from '../services/APIService';

const DrinkList = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Cocktail');
  const [drinks, setDrinks] = useState([1, 2, 3, 4, 5]);

  const setDrinkData = data => {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    const sliced = shuffled.slice(0, 10);
    setDrinks(sliced);
    setLoading(false);
  };

  const fetchDrinkList = () => {
    const apiCall =
      props.category === 'Cocktail'
        ? apiService.getCocktailDrink()
        : apiService.getOrdinaryDrink();

    apiCall
      .then(res => {
        const data = res?.data?.drinks || [];
        setDrinkData(data);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDrinkList();
    setTitle(props.category === 'Cocktail' ? 'Cocktail' : 'Ordinary');
  }, [props.category]);

  const routeToDrinkDetail = item => {
    navigation.navigate('DrinkDetailPage', { drink: item });
  };

  const routeToDrinkList = () => {
    navigation.navigate('DrinkListPage', { category: title });
  };

  const renderItem = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.renderItem} key={item}>
          <CircleLoader />
        </View>
      );
    }
    return (
      <TouchableOpacity
        key={item.idDrink}
        style={styles.renderItem}
        onPress={() => routeToDrinkDetail(item)}>
        <Image
          style={styles.renderItem.image}
          source={{ uri: item.strDrinkThumb }}
        />
      </TouchableOpacity>
    );
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
      />
    </View>
  );
};

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
      marginLeft: 12,
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
      borderRadius: 50,
    },
  },
});

export default DrinkList;
