import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import PageLoader from '../components/PageLoader';
import * as apiService from '../services/APIService';

const DrinkCategoryPage = (props) => {

  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);

  const fetchDrinks = () => {
    apiService.getDrinksByCategory(props.category).then(res => {
      setLoading(false);
      setDrinks(res.data.drinks);
    }, error => {
      console.log(error);
    });
  };

  useEffect(() => {
    Actions.refresh({ title: props.category });
    fetchDrinks();
  }, []);


  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItem} key={item.idDrink}>
        <TouchableOpacity style={styles.renderItem.imageContainer} onPress={() => Actions.push('DrinkDetailPage', { drink: item })}>
          <FastImage
            resizeMode="stretch"
            style={styles.renderItem.image}
            source={{ uri: item.strDrinkThumb }}
          />
        </TouchableOpacity>
        <Text style={styles.renderItem.name}>{item.strDrink}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? <PageLoader /> :
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={drinks}
          renderItem={renderItem}
          numColumns={2} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
      marginLeft: 16,
      fontWeight: 'bold',
    },
  }
});

export default DrinkCategoryPage;
