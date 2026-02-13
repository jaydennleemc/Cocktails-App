import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PageLoader from '../components/PageLoader';
import * as apiService from '../services/APIService';

const DrinkDetailPage = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [drink, setDrink] = useState(null);

  const fetchDrink = drinkId => {
    apiService
      .getDrinkDetail(drinkId)
      .then(res => {
        const drinksData = res?.data?.drinks;
        if (drinksData && drinksData[0]) {
          setDrink(drinksData[0]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: props.drink?.strDrink || '',
    });
    if (props.drink?.idDrink) {
      fetchDrink(props.drink.idDrink);
    }
  }, [navigation, props.drink]);

  if (loading || !drink) {
    return (
      <ScrollView style={styles.container}>
        <PageLoader />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: drink.strDrinkThumb }} />
      <Text style={styles.typeText}>{drink.strCategory}</Text>
      <Text style={styles.nameText}>{drink.strDrink}</Text>
      <Text style={styles.descriptionText}>{drink.strInstructions}</Text>
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
