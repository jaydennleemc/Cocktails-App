import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as apiService from '../services/APIService';
import DrinkList from '../components/DrinkList';
import { Facebook } from 'react-content-loader/native';

const HomePage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([1, 2, 3]);

  const fetchPopularDrink = () => {
    Promise.all([
      apiService.getCocktailDrink(),
      apiService.getOrdinaryDrink(),
    ])
      .then(([cocktailRes, ordinaryRes]) => {
        const cocktailData = (cocktailRes?.data?.drinks || []).map(item => ({
          ...item,
          strType: 'Cocktail',
        }));
        const ordinaryData = (ordinaryRes?.data?.drinks || []).map(item => ({
          ...item,
          strType: 'Ordinary',
        }));
        const combined = [...cocktailData, ...ordinaryData].sort(
          () => Math.random() - 0.5,
        );
        setDrinks(combined);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPopularDrink();
    const timer = setTimeout(() => {
      navigation.openDrawer();
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  const renderItem = ({ item }) => {
    if (loading) {
      return <Facebook />;
    }
    return (
      <View style={styles.renderItem} key={item.idDrink}>
        <TouchableOpacity
          style={styles.renderItem.imageContainer}
          onPress={() => navigation.navigate('DrinkDetailPage', { drink: item })}>
          <Image
            resizeMode="stretch"
            style={styles.renderItem.image}
            source={{ uri: item.strDrinkThumb }}
          />
        </TouchableOpacity>
        <Text style={styles.renderItem.category}>{item.strType}</Text>
        <Text style={styles.renderItem.name}>{item.strDrink}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.location}>Hong Kong</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.title}> Cocktails </Text>
        </TouchableOpacity>
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
