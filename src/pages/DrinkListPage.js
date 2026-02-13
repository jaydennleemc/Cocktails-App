import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as apiService from '../services/APIService';
import ListLoader from '../components/ListLoader';

const DrinkListPage = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([1, 2, 3, 4, 5]);

  const fetchDrinkList = () => {
    const apiCall =
      props.category === 'Cocktail'
        ? apiService.getCocktailDrink()
        : apiService.getOrdinaryDrink();

    apiCall
      .then(res => {
        const data = res?.data?.drinks || [];
        setDrinks(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      title: props.category === 'Cocktail' ? 'Cocktail Drinks' : 'Ordinary Drinks',
    });
    fetchDrinkList();
  }, [navigation, props.category]);

  const renderItem = ({ item }) => {
    if (loading) {
      return (
        <View style={styles.renderItem}>
          <ListLoader />
        </View>
      );
    }
    return (
      <View style={styles.renderItem} key={item.idDrink}>
        <Image
          style={styles.renderItem.image}
          source={{ uri: item.strDrinkThumb }}
        />
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
          <Text style={styles.renderItem.text}>{item.strDrink}</Text>
        </View>
      </View>
    );
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
