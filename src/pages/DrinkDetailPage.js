import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, List, Code } from 'react-content-loader/native';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import ListLoader from '../components/ListLoader';
import PageLoader from '../components/PageLoader';
import * as apiService from '../services/APIService';

const DrinkDetailPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const [drink, setDrink] = useState(null);

  const fetchDrink = (drinkId) => {
    apiService
      .getDrinkDetail(drinkId)
      .then(res => {
        let data = res.data.drinks[0];
        setDrink(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsRendered(true);
    Actions.refresh({ title: props.drink.strDrink });
    fetchDrink(props.drink.idDrink);
    return () => {
      setIsRendered(false);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? <PageLoader /> :
        <View>
          <FastImage style={styles.image} source={{ uri: drink.strDrinkThumb }} />
          <Text style={styles.typeText}>{drink.strCategory}</Text>
          <Text style={styles.nameText}>{drink.strDrink}</Text>
          <Text style={styles.descriptionText}>{drink.strInstructions}</Text>
        </View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    paddingHorizontal: 32,
    height: 400,
  },
  typeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 8,
  },
  nameText: {
    color: 'white',
    fontSize: 38,
    fontWeight: '900',
    marginTop: 8,
  },
  descriptionText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'normal',
    marginTop: 8,
  },
});

export default DrinkDetailPage;
